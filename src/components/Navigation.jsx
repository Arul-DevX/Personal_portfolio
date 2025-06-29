import React, { useState, useEffect } from 'react'
import mainMenu from '/src/images/main-menu.png';
import logo from '/src/images/logo.png';

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
          
          // Check if section is at least 40% visible in viewport (increased threshold)
          const visibleTop = Math.max(viewportTop, sectionTop)
          const visibleBottom = Math.min(viewportBottom, sectionBottom)
          const visibleHeight = Math.max(0, visibleBottom - visibleTop)
          const sectionHeight = sectionBottom - sectionTop
          const visibilityPercentage = visibleHeight / sectionHeight
          
          // If section is at least 40% visible, consider it active
          if (visibilityPercentage >= 0.4) {
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

      // Optimized scroll animations with better performance
      const animateElements = document.querySelectorAll('.animate-on-scroll')
      animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top
        const elementBottom = element.getBoundingClientRect().bottom
        const elementVisible = 120 // Increased threshold for better visibility
        
        // More generous viewport bounds to reduce flickering
        const isInViewport = elementTop < window.innerHeight - elementVisible && elementBottom > elementVisible
        
        if (isInViewport) {
          // Add animation class and remove hide class
          if (!element.classList.contains('animate')) {
            element.classList.add('animate')
            element.classList.remove('hide')
          }
        } else {
          // Only hide if element is significantly out of view to prevent flickering
          const isSignificantlyOutOfView = elementTop > window.innerHeight + 100 || elementBottom < -100
          
          if (isSignificantlyOutOfView && element.classList.contains('animate')) {
            element.classList.remove('animate')
            element.classList.add('hide')
            
            // Reset to initial state after hide animation
            setTimeout(() => {
              if (!element.classList.contains('animate')) {
                element.classList.remove('hide')
              }
            }, 500) // Reduced timeout to match shorter hide animation
          }
        }
      })
    }

    // Throttle scroll events for better performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    // Initial check
    handleScroll()
    
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [])

  // Helper function to check if a section is active
  const isSectionActive = (sectionId) => {
    return activeSections.includes(sectionId)
  }

  return (
    <div className={`navibar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <img src={logo} width="150px" alt="Logo" /> 
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
          src={mainMenu} 
          alt="menu icon" 
          className={`menuicon ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        /> 
      </div>
    </div>
  )
}

export default Navigation