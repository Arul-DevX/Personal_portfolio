import React, { useState, useEffect, useRef } from 'react'

const GhostGuide = () => {
  const [currentSection, setCurrentSection] = useState(null)
  const [message, setMessage] = useState('')
  const [showBubble, setShowBubble] = useState(false)
  const [ghostPosition, setGhostPosition] = useState({ x: 0, y: 0 })
  const [ghostImage, setGhostImage] = useState('/Images/ghost-normal.png')

  const sectionMessages = {
    home: "Welcome to Arul's portfolio! This is where his journey begins.",
    about: "Here's where you can learn about Arul's background and passion.",
    skills: "Discover Arul's technical expertise in web development!",
    projects: "Check out Arul's impressive portfolio of projects!",
    contact: "Ready to connect? This is where you can reach out to Arul!"
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Update ghost position
      setGhostPosition({ x: e.clientX + 20, y: e.clientY - 20 })
      
      // Get element under mouse
      const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY)
      
      if (!elementUnderMouse) {
        setCurrentSection(null)
        setShowBubble(false)
        setMessage('')
        setGhostImage('/Images/ghost-normal.png')
        return
      }
      
      // Check which section we're in
      let detectedSection = null
      
      // Check if element has section id
      if (elementUnderMouse.id && sectionMessages[elementUnderMouse.id]) {
        detectedSection = elementUnderMouse.id
      } else {
        // Check parent elements
        let parent = elementUnderMouse.parentElement
        while (parent && parent !== document.body) {
          if (parent.id && sectionMessages[parent.id]) {
            detectedSection = parent.id
            break
          }
          parent = parent.parentElement
        }
      }
      
      console.log('Detected section:', detectedSection) // Debug log
      
      // Update section if changed
      if (detectedSection !== currentSection) {
        setCurrentSection(detectedSection)
        
        if (detectedSection && sectionMessages[detectedSection]) {
          console.log('Setting message for:', detectedSection) // Debug log
          setMessage(sectionMessages[detectedSection])
          setShowBubble(true)
          setGhostImage('/Images/ghost-smile.png')
        } else {
          console.log('No section, hiding bubble') // Debug log
          setMessage('')
          setShowBubble(false)
          setGhostImage('/Images/ghost-normal.png')
        }
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [currentSection])

  console.log('Current state:', { currentSection, message, showBubble }) // Debug log

  return (
    <div 
      className="ghost-container" 
      style={{ 
        left: `${ghostPosition.x}px`, 
        top: `${ghostPosition.y}px` 
      }}
    >
      {showBubble && (
        <div className="message-bubble show">
          {message || 'Loading...'}
        </div>
      )}
      <img 
        src={ghostImage} 
        alt="Ghost Guide" 
        id="ghost-image"
      />
    </div>
  )
}

export default GhostGuide