import React from 'react'
import ThreeDCard from './ThreeDCard'

const Contact = () => {
  return (
    <div className="container" id="contact">
      <div className="row">
        <div className="col1 animate-on-scroll fade-in-left">
          <ThreeDCard>
            <img 
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
              className="all_img" 
              alt="Professional business meeting with data presentations and analytics" 
              width="500px"
            />
          </ThreeDCard>
        </div>
        <div className="col1 animate-on-scroll fade-in-right">
          <h2>Contact <label>Me</label></h2>
          <p style={{ marginBottom: '20px', color: '#ccc' }}>
            Let's discuss how data-driven insights can transform your business decisions.
          </p>
          <p>
            Email: <a href="mailto:arulraman77@gmail.com" className="btn">
              arulraman77@gmail.com
            </a>
          </p>
          <p>Phone: +91 9444732994</p>
          <p>
            Linkedin: <a 
              href="https://www.linkedin.com/in/arul-r-581ba02b5/" 
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Arul R
            </a>
          </p>
          <p>
            Portfolio: <a 
              href="https://github.com/Arul-DevX" 
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Analytics Projects
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact