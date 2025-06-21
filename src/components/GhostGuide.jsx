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
    console.log('Starting to type message:', newMessage) // Debug log
    
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
    
    // Use setInterval for more reliable typing
    typingIntervalRef.current = setInterval(() => {
      // Check if we're still typing the same message
      if (currentMessageRef.current !== newMessage) {
        clearInterval(typingIntervalRef.current)
        return
      }
      
      if (currentIndex < newMessage.length) {
        const newText = newMessage.slice(0, currentIndex + 1)
        console.log('Typing:', newText) // Debug log
        setMessage(newText)
        currentIndex++
      } else {
        // Finished typing
        console.log('Finished typing message') // Debug log
        setIsTyping(false)
        clearInterval(typingIntervalRef.current)
      }
    }, 50) // 50ms delay between each character
  }

  const clearMessage = () => {
    console.log('Clearing message') // Debug log
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
      
      // Get the element directly under the mouse cursor
      const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY)
      
      if (!elementUnderMouse) return
      
      // Find which section this element belongs to
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      let newSection = null
      
      // Check if the element or any of its parents is a section
      let currentElement = elementUnderMouse
      while (currentElement && currentElement !== document.body) {
        // Check if this element has an id that matches our sections
        if (currentElement.id && sections.includes(currentElement.id)) {
          newSection = currentElement.id
          break
        }
        
        // Check if this element is inside a section
        for (const sectionId of sections) {
          const section = document.getElementById(sectionId)
          if (section && section.contains(currentElement)) {
            newSection = sectionId
            break
          }
        }
        
        if (newSection) break
        currentElement = currentElement.parentElement
      }
      
      console.log('Current section:', newSection) // Debug log
      
      // Update section and message if changed
      if (newSection !== currentSection) {
        setCurrentSection(newSection)
        
        if (newSection && sectionMessages[newSection]) {
          console.log('Switching to section:', newSection) // Debug log
          setGhostImage('/Images/ghost-smile.png')
          typeMessage(sectionMessages[newSection])
        } else {
          console.log('No section detected, clearing message') // Debug log
          setGhostImage('/Images/ghost-normal.png')
          clearMessage()
        }
      }
    }

    // Add event listener
    document.addEventListener('mousemove', handleMouseMove)
    
    // Cleanup function
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
      <div className={`message-bubble ${showBubble ? 'show' : ''}`}>
        {message && <span>{message}</span>}
        {isTyping && <span className="typing-cursor">|</span>}
        {!message && !isTyping && showBubble && <span>Loading...</span>}
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