import React from 'react'
import ThreeDCard from './ThreeDCard'
import { Mail, Phone, Linkedin, Github, MessageCircle, Send } from 'lucide-react'

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="row">
          <div className="col1 animate-on-scroll fade-in-left">
            <ThreeDCard>
              <div className="icon-container contact-icon">
                <MessageCircle size={100} className="main-icon" />
                <Send size={50} className="accent-icon" />
              </div>
            </ThreeDCard>
          </div>
          <div className="col1 animate-on-scroll fade-in-right">
            <h2>Get In <span className="highlight">Touch</span></h2>
            <p className="contact-description">
              Let's discuss how data-driven insights can transform your business decisions.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <Mail className="contact-icon" size={20} />
                <span>Email: </span>
                <a href="mailto:arulraman77@gmail.com" className="btn">
                  arulraman77@gmail.com
                </a>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" size={20} />
                <span>Phone: +91 9444732994</span>
              </div>
              <div className="contact-item">
                <Linkedin className="contact-icon" size={20} />
                <span>LinkedIn: </span>
                <a 
                  href="https://www.linkedin.com/in/arul-r-581ba02b5/" 
                  className="btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Arul R
                </a>
              </div>
              <div className="contact-item">
                <Github className="contact-icon" size={20} />
                <span>Portfolio: </span>
                <a 
                  href="https://github.com/Arul-DevX" 
                  className="btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Analytics Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact