import React from 'react'
import ThreeDCard from './ThreeDCard'
import { Code2, Database, BarChart } from 'lucide-react'

const Skills = () => {
  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <div className="row">
          <div className="col1 animate-on-scroll fade-in-left">
            <ThreeDCard>
              <div className="icon-container skills-icon">
                <Code2 size={100} className="main-icon" />
                <Database size={50} className="accent-icon accent-1" />
                <BarChart size={50} className="accent-icon accent-2" />
              </div>
            </ThreeDCard>
          </div>
          <div className="col1 animate-on-scroll fade-in-right">
            <h2>My <span className="highlight">Skills</span></h2>
            <div className="skills-content">
              <div className="skill-category">
                <h3>Programming & Analytics</h3>
                <p>Python (Pandas, NumPy) • SQL • Excel</p>
              </div>
              <div className="skill-category">
                <h3>Data Visualization</h3>
                <p> Power BI • Matplotlib • Seaborn • Plotly</p>
              </div>
              <div className="skill-category">
                <h3>Databases & Tools</h3>
                <p>MySQL</p>
              </div>
              <div className="skill-category">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills