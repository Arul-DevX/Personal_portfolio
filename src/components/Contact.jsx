import React from 'react'
import ThreeDCard from './ThreeDCard'
import contactImage from '/src/images/contact_us.png';

const Contact = () => {
  return (
    <div className="container" id="contact">
      <div className="row">
        <div className="col1 animate-on-scroll fade-in-left">
          <ThreeDCard>
            <img 
              src= {contactImage}
              className="all_img" 
              alt="contact image" 
              width="500px"
            />
          </ThreeDCard>
        </div>
        <div className="col1 animate-on-scroll fade-in-right">
          <h2>Contact <label>Me</label></h2>
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
        </div>
      </div>
    </div>
  )
}

export default Contact