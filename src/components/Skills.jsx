import React from 'react'

const Skills = () => {
  return (
    <div className="container" id="skills">
      <div className="row">
        <div className="col1 animate-on-scroll fade-in-left">
          <img 
            src="/Images/code.png" 
            className="all_img" 
            alt="skill image" 
            width="500px"
          />
        </div>
        <div className="col1 animate-on-scroll fade-in-right">
          <h2>Skills</h2>
          <p>HTML,CSS,JavaScript,Python Basics,SQL Basics</p>
        </div>
      </div>
    </div>
  )
}

export default Skills