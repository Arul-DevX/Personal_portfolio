import React, { useState, useEffect } from 'react'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleDownload = () => {
    alert("Your download is starting!")
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      
      // Check if page is scrolled for navbar background
      setIsScrolled(window.scrollY > 50)
      
      // Get current scroll position
      const scrollPosition = window.scrollY + 150 // Offset for navbar height
      
      // Find which section we're currently in
      let currentSection = 'home' // Default to home
      
      sections.forEach(id => {
        const section = document.getElementById(id)
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight
          
          // Check if scroll position is within this section
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = id
          }
        }
      })
      
      // Special handling for the last section (contact)
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        const contactTop = contactSection.offsetTop
        if (scrollPosition >= contactTop) {
          currentSection = 'contact'
        }
      }
      
      setActiveSection(currentSection)

      // Enhanced scroll animations - trigger every time elements come into view
      const animateElements = document.querySelectorAll('.animate-on-scroll')
      animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top
        const elementBottom = element.getBoundingClientRect().bottom
        const elementVisible = 150
        
        // Check if element is in viewport
        const isInViewport = elementTop < window.innerHeight - elementVisible && elementBottom > elementVisible
        
        if (isInViewport) {
          // Add animation class
          element.classList.add('animate')
        } else {
          // Remove animation class when out of view so it can animate again
          element.classList.remove('animate')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    // Initial check
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`navibar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <img src="/Images/logo.png" width="150px" alt="Logo" /> 
      </div>
      <nav>
        <ul 
          id="menuitems" 
          style={{ maxHeight: isMenuOpen ? '400px' : '0px' }}
        >
          <li>
            <a 
              href="#home" 
              className={`btn ${activeSection === 'home' ? 'active' : ''}`}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className={`btn ${activeSection === 'about' ? 'active' : ''}`}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#skills" 
              className={`btn ${activeSection === 'skills' ? 'active' : ''}`}
            >
              Skills
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              className={`btn ${activeSection === 'projects' ? 'active' : ''}`}
            >
              Projects
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className={`btn ${activeSection === 'contact' ? 'active' : ''}`}
            >
              Contact
            </a>
          </li>
          <li>
            <a 
              href="/Arul's Resume.pdf" 
              download 
              id="dbtn"
              onClick={handleDownload}
            >
              Download CV
            </a>
          </li>
        </ul>
      </nav>
      <div>
        <img 
          src="/Images/main-menu.png" 
          alt="menu icon" 
          className="menuicon" 
          onClick={toggleMenu}
        /> 
      </div>
    </div>
  )
}

export default Navigation