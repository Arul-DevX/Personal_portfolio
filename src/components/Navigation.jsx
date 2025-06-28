import React, { useState, useEffect } from 'react'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSections, setActiveSections] = useState(['home'])
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
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight
      const viewportTop = scrollPosition
      const viewportBottom = scrollPosition + viewportHeight
      
      // Find all sections that are currently visible
      const visibleSections = []
      
      sections.forEach(id => {
        const section = document.getElementById(id)
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight
          
          // Check if section is at least 30% visible in viewport
          const visibleTop = Math.max(viewportTop, sectionTop)
          const visibleBottom = Math.min(viewportBottom, sectionBottom)
          const visibleHeight = Math.max(0, visibleBottom - visibleTop)
          const sectionHeight = sectionBottom - sectionTop
          const visibilityPercentage = visibleHeight / sectionHeight
          
          // If section is at least 30% visible, consider it active
          if (visibilityPercentage >= 0.3) {
            visibleSections.push(id)
          }
        }
      })
      
      // If no sections are sufficiently visible, default to the most visible one
      if (visibleSections.length === 0) {
        let mostVisibleSection = 'home'
        let maxVisibility = 0
        
        sections.forEach(id => {
          const section = document.getElementById(id)
          if (section) {
            const sectionTop = section.offsetTop
            const sectionBottom = sectionTop + section.offsetHeight
            
            const visibleTop = Math.max(viewportTop, sectionTop)
            const visibleBottom = Math.min(viewportBottom, sectionBottom)
            const visibleHeight = Math.max(0, visibleBottom - visibleTop)
            
            if (visibleHeight > maxVisibility) {
              maxVisibility = visibleHeight
              mostVisibleSection = id
            }
          }
        })
        
        visibleSections.push(mostVisibleSection)
      }
      
      setActiveSections(visibleSections)

      // Enhanced scroll animations with smooth hide/show
      const animateElements = document.querySelectorAll('.animate-on-scroll')
      animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top
        const elementBottom = element.getBoundingClientRect().bottom
        const elementVisible = 100
        
        // Check if element is in viewport with more generous bounds
        const isInViewport = elementTop < window.innerHeight - elementVisible && elementBottom > elementVisible
        
        if (isInViewport) {
          // Add animation class and remove hide class
          element.classList.add('animate')
          element.classList.remove('hide')
        } else {
          // Add hide class and remove animate class when out of view
          element.classList.remove('animate')
          element.classList.add('hide')
          
          // Reset to initial state after hide animation
          setTimeout(() => {
            if (!element.classList.contains('animate')) {
              element.classList.remove('hide')
            }
          }, 800) // Match hide animation duration
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    // Initial check
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Helper function to check if a section is active
  const isSectionActive = (sectionId) => {
    return activeSections.includes(sectionId)
  }

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
              className={`btn ${isSectionActive('home') ? 'active' : ''}`}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className={`btn ${isSectionActive('about') ? 'active' : ''}`}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#skills" 
              className={`btn ${isSectionActive('skills') ? 'active' : ''}`}
            >
              Skills
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              className={`btn ${isSectionActive('projects') ? 'active' : ''}`}
            >
              Projects
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className={`btn ${isSectionActive('contact') ? 'active' : ''}`}
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