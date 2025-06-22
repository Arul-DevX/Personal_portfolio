import React, { useState, useEffect, useRef } from 'react'

const GhostGuide = () => {
  const [currentSection, setCurrentSection] = useState(null)
  const [message, setMessage] = useState('')
  const [showBubble, setShowBubble] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [ghostPosition, setGhostPosition] = useState({ x: 0, y: 0 })
  const [ghostImage, setGhostImage] = useState('/Images/ghost-normal.png')
  const typingIntervalRef = useRef(null)
  const currentMessageRef = useRef('')

  const sectionMessages = {
    home: "Welcome to Arul's portfolio! This is where his journey begins. Explore his skills, projects, and achievements as a frontend developer and tech enthusiast. Ready to dive in?",
    about: "Here's where you can learn about Arul's background, passion for web development, and his journey as a frontend developer. Get to know the person behind the code!",
    skills: "Discover Arul's technical expertise! He's skilled in Python, Web Development (HTML, CSS, JavaScript), SQL, and Git/GitHub. His programming skills help him solve complex problems with ease!",
    projects: "Check out Arul's impressive portfolio of projects! From sign language recognition systems to AI assistants and weather apps - see his creativity and technical skills in action!",
    contact: "Ready to connect? This is where you can reach out to Arul! Find his email, phone number, and LinkedIn profile. He's always excited to discuss new opportunities and collaborations!"
  }

  const typeMessage = (newMessage) => {
    console.log('Starting to type message:', newMessage)
    
    // Clear any existing interval
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current)
    }
    
    // Store the message we're trying to type
    currentMessageRef.current = newMessage
    
    // Show bubble and reset message
    setShowBubble(true)
    setMessage('')
    setIsTyping(true)
    
    let currentIndex = 0
    
    // Use setInterval for typing effect
    typingIntervalRef.current = setInterval(() => {
      // Check if we're still typing the same message
      if (currentMessageRef.current !== newMessage) {
        clearInterval(typingIntervalRef.current)
        return
      }
      
      if (currentIndex < newMessage.length) {
        const newText = newMessage.slice(0, currentIndex + 1)
        setMessage(newText)
        currentIndex++
      } else {
        // Finished typing
        setIsTyping(false)
        clearInterval(typingIntervalRef.current)
      }
    }, 30) // Faster typing speed - 30ms between characters
  }

  const clearMessage = () => {
    console.log('Clearing message')
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current)
    }
    currentMessageRef.current = ''
    setMessage('')
    setIsTyping(false)
    setShowBubble(false)
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Update ghost position
      setGhostPosition({ x: e.clientX + 20, y: e.clientY - 20 })
      
      // Get element under mouse
      const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY)
      
      if (!elementUnderMouse) {
        if (currentSection !== null) {
          setCurrentSection(null)
          setGhostImage('/Images/ghost-normal.png')
          clearMessage()
        }
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
      
      // Update section if changed
      if (detectedSection !== currentSection) {
        setCurrentSection(detectedSection)
        
        if (detectedSection && sectionMessages[detectedSection]) {
          console.log('Setting message for:', detectedSection)
          setGhostImage('/Images/ghost-smile.png')
          typeMessage(sectionMessages[detectedSection])
        } else {
          console.log('No section, hiding bubble')
          setGhostImage('/Images/ghost-normal.png')
          clearMessage()
        }
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
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
      {showBubble && (
        <div className="message-bubble show">
          <span>{message}</span>
          {isTyping && <span className="typing-cursor">|</span>}
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