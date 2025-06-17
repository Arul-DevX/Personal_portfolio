import React from 'react'

const About = () => {
  return (
    <div className="container" id="about">
      <div className="row">
        <div className="col1">
          <img 
            src="/Images/profile.png" 
            className="all_img"  
            alt="profile image" 
            width="500px"
          />
        </div>
        <div className="col1">
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