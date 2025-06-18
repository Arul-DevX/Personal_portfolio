import React from 'react'

const Contact = () => {
  return (
    <div className="container" id="contact">
      <div className="row">
        <div className="col1 animate-on-scroll fade-in-left">
          <img 
            src="/Images/contact_us.png" 
            className="all_img" 
            alt="contact image" 
            width="500px"
          />
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