import React, { useState, useEffect, useRef } from 'react'

const GhostGuide = () => {
  const [currentSection, setCurrentSection] = useState(null)
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [ghostPosition, setGhostPosition] = useState({ x: 0, y: 0 })
  const [ghostImage, setGhostImage] = useState('/Images/ghost-normal.png')
  const typingTimeoutRef = useRef(null)
  const currentMessageRef = useRef('')

  const sectionMessages = {
    home: "Welcome to Arul's portfolio! This is where his journey begins. Explore his skills, projects, and achievements as a frontend developer and tech enthusiast. Ready to dive in?",
    about: "Here's where you can learn about Arul's background, passion for web development, and his journey as a frontend developer. Get to know the person behind the code!",
    skills: "Discover Arul's technical expertise! He's skilled in Python, Web Development (HTML, CSS, JavaScript), SQL, and Git/GitHub. His programming skills help him solve complex problems with ease!",
    projects: "Check out Arul's impressive portfolio of projects! From sign language recognition systems to AI assistants and weather apps - see his creativity and technical skills in action!",
    contact: "Ready to connect? This is where you can reach out to Arul! Find his email, phone number, and LinkedIn profile. He's always excited to discuss new opportunities and collaborations!"
  }

  const typeMessage = (newMessage) => {
    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    // Store the message we're trying to type
    currentMessageRef.current = newMessage
    
    setMessage('')
    setIsTyping(true)
    let i = 0

    const typeChar = () => {
      // Check if we're still typing the same message
      if (currentMessageRef.current !== newMessage) {
        return // Stop typing if message changed
      }
      
      if (i < newMessage.length) {
        setMessage(newMessage.substring(0, i + 1))
        i++
        typingTimeoutRef.current = setTimeout(typeChar, 40)
      } else {
        setIsTyping(false)
      }
    }

    typeChar()
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      setGhostPosition({ x: e.clientX + 20, y: e.clientY - 20 })
      
      // Get all section elements
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      let newSection = null
      
      // Check which section the mouse is currently over
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (section) {
          const rect = section.getBoundingClientRect()
          // Check if mouse is within the section bounds
          if (e.clientX >= rect.left && 
              e.clientX <= rect.right && 
              e.clientY >= rect.top && 
              e.clientY <= rect.bottom) {
            newSection = sectionId
            break
          }
        }
      }
      
      // Update section and message if changed
      if (newSection !== currentSection) {
        setCurrentSection(newSection)
        if (newSection && sectionMessages[newSection]) {
          setGhostImage('/Images/ghost-smile.png')
          typeMessage(sectionMessages[newSection])
        } else {
          setGhostImage('/Images/ghost-normal.png')
          currentMessageRef.current = ''
          setMessage('')
          setIsTyping(false)
          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
          }
        }
      }
    }

    // Add event listener
    document.addEventListener('mousemove', handleMouseMove)
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [currentSection])

  return (
    <div 
      className="ghost-container" 
      style={{ 
        left: `${ghostPosition.x}px`, 
        top: `${ghostPosition.y}px` 
      }}
    >
      <div className={`message-bubble ${message ? 'show' : ''}`}>
        {message}
        {isTyping && <span className="typing-cursor">|</span>}
      </div>
      <img 
        src={ghostImage} 
        alt="Ghost Guide" 
        id="ghost-image"
      />
    </div>
  )
}

export default GhostGuide