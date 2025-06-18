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
      
      sections.forEach(id => {
        const section = document.getElementById(id)
        if (section) {
          const inView = window.scrollY >= section.offsetTop - 100 && 
                        window.scrollY < section.offsetTop + section.offsetHeight
          if (inView) {
            setActiveSection(id)
          }
        }
      })

      // Animate elements on scroll
      const animateElements = document.querySelectorAll('.animate-on-scroll')
      animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animate')
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