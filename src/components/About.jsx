import React from 'react'
import ThreeDCard from './ThreeDCard'
import profileImage from '/src/images/profile.png'; // ✅ Import here

const About = () => {
  return (
    <div className="container about-section" id="about">
      <div className="row">
        <div className="col1 animate-on-scroll fade-in-left">
          <ThreeDCard>
            <img 
              src={profileImage} // ✅ Use here 
              className="all_img"  
              alt="profile image" 
              width="500px"
            />
          </ThreeDCard>
        </div>
        <div className="col1 animate-on-scroll fade-in-right">
          <h2>About <label>Me</label></h2>
          <p>
            I am a passionate Data Analyst with expertise in Python, SQL, R, and advanced analytics tools. 
            I specialize in transforming raw data into actionable insights that drive business decisions. 
            My experience spans statistical analysis, data visualization, machine learning, and business intelligence.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About