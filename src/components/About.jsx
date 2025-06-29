import React from 'react'
import ThreeDCard from './ThreeDCard'

const About = () => {
  return (
    <div className="container about-section" id="about">
      <div className="row">
        <div className="col1 animate-on-scroll fade-in-left">
          <ThreeDCard>
            <img 
              src="/images/profile.png" 
              className="all_img"  
              alt="profile image" 
              width="500px"
            />
          </ThreeDCard>
        </div>
        <div className="col1 animate-on-scroll fade-in-right">
          <h2>About <label>Me</label></h2>
          <p>
            I am a passionate Frontend Developer with skills in HTML, CSS, JavaScript, and Python. 
            I have built several projects ranging from websites to games and more.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About