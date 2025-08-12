import React from 'react'
import ThreeDCard from './ThreeDCard'
import code from '/src/images/code.png';

const Skills = () => {
  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <div className="row">
          <div className="col1 animate-on-scroll fade-in-left">
            <ThreeDCard>
              <img 
                src={code} 
                className="all_img skills-image" 
                alt="Technical Skills - Data Analysis" 
                width="350px"
              />
            </ThreeDCard>
          </div>
          <div className="col1 animate-on-scroll fade-in-right">
            <h2>My <span className="highlight">Skills</span></h2>
            <div className="skills-content">
              <div className="skill-category">
                <h3>Programming & Analytics</h3>
                <p>Python (Pandas, NumPy) • R • SQL • Excel</p>
              </div>
              <div className="skill-category">
                <h3>Data Visualization</h3>
                <p>Tableau • Power BI • Matplotlib • Seaborn • Plotly</p>
              </div>
              <div className="skill-category">
                <h3>Databases & Tools</h3>
                <p>MySQL • PostgreSQL • MongoDB • Apache Spark</p>
              </div>
              <div className="skill-category">
                <h3>Statistical Methods</h3>
                <p>Regression Analysis • A/B Testing • Time Series • Machine Learning • Predictive Modeling</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills