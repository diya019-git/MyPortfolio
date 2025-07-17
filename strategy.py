import pandas as pd
import numpy as np

def generate_signals(anchor_df: pd.DataFrame, target_df: pd.DataFrame) -> pd.DataFrame:
    # Preprocessing: align all timestamps to 1H frequency
    anchor_df["timestamp"] = pd.to_datetime(anchor_df["timestamp"])
    target_df["timestamp"] = pd.to_datetime(target_df["timestamp"])

    anchor_df = anchor_df.set_index("timestamp").resample("1H").ffill().reset_index()
    target_df = target_df.set_index("timestamp").resample("1H").ffill().reset_index()

    target_symbols = sorted(set(col.split('_')[1] for col in target_df.columns if col.startswith("close_")))

    signals = []

    for target in target_symbols:
        close_col = f"close_{target}"
        if close_col not in target_df.columns:
            continue

        # Basic target coin DataFrame
        df = pd.DataFrame()
        df["timestamp"] = target_df["timestamp"]
        df["target_close"] = target_df[close_col]

        best_corr = 0
        best_lag = None
        best_anchor = None

        for anchor_col in anchor_df.columns:
            if not anchor_col.startswith("close_"):
                continue
            for lag in range(2, 13):  # test 2h to 12h lags
                shifted = anchor_df[anchor_col].shift(lag)
                combined = pd.DataFrame({
                    "a": shifted.values,
                    "b": df["target_close"].values
                }).dropna()
                if len(combined) < 100:
                    continue
                corr = np.corrcoef(combined["a"], combined["b"])[0, 1]
                if abs(corr) > abs(best_corr):
                    best_corr = corr
                    best_lag = lag
                    best_anchor = anchor_col

        if best_anchor is None:
            continue  # skip target coin if no valid anchor-lag found

        # Generate signals based on best lagged anchor
        df["anchor_lagged"] = anchor_df[best_anchor].shift(best_lag)
        df["anchor_return"] = df["anchor_lagged"].pct_change()

        buy_threshold = 0.015  # slightly reduced for more signal frequency
        sell_threshold = -0.015

        df["signal"] = "HOLD"
        df.loc[df["anchor_return"] > buy_threshold, "signal"] = "BUY"
        df.loc[df["anchor_return"] < sell_threshold, "signal"] = "SELL"

        # Ensure at least 2 buy-sell pairs
        buy_count = (df["signal"] == "BUY").sum()
        sell_count = (df["signal"] == "SELL").sum()
        if buy_count < 2 or sell_count < 2:
            continue  # skip if not enough trades for backtest

        df["symbol"] = target
        df["position_size"] = df["signal"].map({"BUY": 1.0, "SELL": 1.0, "HOLD": 0.0})

        signals.append(df[["timestamp", "symbol", "signal", "position_size"]])

    if len(signals) == 0:
        return pd.DataFrame(columns=["timestamp", "symbol", "signal", "position_size"])

    result = pd.concat(signals).sort_values("timestamp").reset_index(drop=True)
    return result
