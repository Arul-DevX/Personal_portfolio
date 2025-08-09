import React from 'react'
import ThreeDCard from './ThreeDCard'

const Skills = () => {
  return (
    <div className="container" id="skills">
      <div className="row">
        <div className="col1 animate-on-scroll fade-in-left">
          <ThreeDCard>
            <img 
              src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800" 
              className="all_img" 
              alt="Data visualization charts and programming code on multiple screens" 
              width="500px"
            />
          </ThreeDCard>
        </div>
        <div className="col1 animate-on-scroll fade-in-right">
          <h2>Skills</h2>
          <div style={{ textAlign: 'left', maxWidth: '500px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#509ff4', fontSize: '18px', marginBottom: '10px' }}>Programming & Analytics</h3>
              <p>Python (Pandas, NumPy, Scikit-learn) • R • SQL • Excel/Google Sheets</p>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#509ff4', fontSize: '18px', marginBottom: '10px' }}>Data Visualization</h3>
              <p>Tableau • Power BI • Matplotlib • Seaborn • Plotly • D3.js</p>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#509ff4', fontSize: '18px', marginBottom: '10px' }}>Databases & Tools</h3>
              <p>MySQL • PostgreSQL • MongoDB • Apache Spark • Jupyter • Git</p>
            </div>
            <div>
              <h3 style={{ color: '#509ff4', fontSize: '18px', marginBottom: '10px' }}>Statistical Methods</h3>
              <p>Regression Analysis • A/B Testing • Time Series • Machine Learning • Predictive Modeling</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills