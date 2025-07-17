import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import pizza from "../../Assets/Projects/pizzadashboard.png";
import ipldashboard from "../../Assets/Projects/ipldashboard.png";
import bitsOfCode from "../../Assets/Projects/blinkitdashboard.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={ipldashboard}
              isBlog={false}
              title="IPL Analysis (2008–2024)"
              description="Performed in-depth analysis on 16 seasons of IPL data using Python, Pandas, and Matplotlib to uncover trends in team performance, player stats, and match outcomes.
              Built an interactive Power BI dashboard for dynamic visual insights and deployed a Streamlit web app to make the analysis accessible and engaging for users."
              ghLink="https://github.com/diya019-git/IPL_Analysis-2008-2024-"
              demoLink="https://ipl-analysis-diya019.streamlit.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Blinkit Analysis"
              description="In this project, I analyzed Blinkit sales data using SQL for data extraction and Python for data cleaning and exploratory analysis. Key insights were visualized through an interactive Power BI dashboard, showcasing metrics like top-selling products, revenue trends, customer behavior, and sales performance across regions."
              ghLink="https://github.com/diya019-git/Blinkit-Groceries-Analysis"
              demoLink=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={pizza}
              isBlog={false}
              title="Pizza Sales Analysis"
              description="In this project, I analyzed pizza sales data using SQL and MS Excel. SQL was used to extract and filter data efficiently, while Excel was used for cleaning, analysis, and visualization. I created an interactive dashboard highlighting key insights such as top-selling pizzas, revenue trends, peak sales hours, and customer preferences.
"
              ghLink="https://github.com/diya019-git/PizzaSalesAnalysis"
              demoLink=""              
            />
          </Col>

          
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
