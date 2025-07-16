import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple"> Diya Gupta </span>
            from <span className="purple"> Kolkata, India.</span>
            <br />
            <h5>I am a 3rd-year B.Tech Computer Science (Data Science) undergraduate with a strong interest in data analysis and a passion for solving problems through data structures and algorithms. I enjoy turning raw data into meaningful insights and optimizing solutions through efficient code. Whether it's building dashboards, exploring datasets, or tackling complex DSA problems, I love the process of learning, improving, and building impactful tech.</h5>
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
            <li className="about-activity">
              <ImPointRight /> Graphic designing
            </li>
            <li className="about-activity">
              <ImPointRight /> Competitive programming on platforms like LeetCode 
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "From data to decisions, I script stories of change."{" "}
          </p>
          <footer className="blockquote-footer">Diya</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
