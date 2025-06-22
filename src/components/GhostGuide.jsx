import React, { useState, useEffect, useRef } from 'react'

const GhostGuide = () => {
  const [currentSection, setCurrentSection] = useState(null)
  const [displayedText, setDisplayedText] = useState('')
  const [showBubble, setShowBubble] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [ghostPosition, setGhostPosition] = useState({ x: 0, y: 0 })
  const [ghostImage, setGhostImage] = useState('/Images/ghost-normal.png')
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [targetMessage, setTargetMessage] = useState('')
  const typingTimeoutRef = useRef(null)

  const sectionMessages = {
    home: "🚀 Explore Arul's portfolio to discover his journey, skills, and projects as a frontend developer and tech enthusiast! 💻✨",
    about: "👨‍💻 Discover Arul's background, passion for web development, and journey as a frontend developer — get to know the person behind the code! 💡💻",
    skills: "🛠️ Discover Arul's technical expertise in Python, Web Development (HTML, CSS, JavaScript), SQL, and Git/GitHub — solving complex problems with ease! 💡👨‍💻",
    projects: "🚀 Check out Arul's impressive projects — from sign language recognition systems to AI assistants and weather apps, showcasing his creativity and technical skills! 💡🧠💻",
    contact: "📬 Ready to connect? Reach out to Arul via email, phone, or LinkedIn — he's excited to explore new opportunities and collaborations! 🤝💼"
  }

  // Typing effect - exactly like the Home section
  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    if (isTyping && currentMessageIndex < targetMessage.length) {
      typingTimeoutRef.current = setTimeout(() => {
        setDisplayedText(prev => prev + targetMessage.charAt(currentMessageIndex))
        setCurrentMessageIndex(prev => prev + 1)
      }, 50) // Same speed as Home section typing
    } else if (isTyping && currentMessageIndex >= targetMessage.length) {
      // Finished typing
      setIsTyping(false)
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [currentMessageIndex, isTyping, targetMessage])

  const startTyping = (message) => {
    console.log('Starting typing animation for:', message)
    
    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    // Reset everything and start fresh
    setTargetMessage(message)
    setDisplayedText('')
    setCurrentMessageIndex(0)
    setIsTyping(true)
    setShowBubble(true)
  }

  const stopTyping = () => {
    console.log('Stopping typing animation')
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    setIsTyping(false)
    setDisplayedText('')
    setCurrentMessageIndex(0)
    setTargetMessage('')
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
          stopTyping()
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
          console.log('Detected section:', detectedSection)
          setGhostImage('/Images/ghost-smile.png')
          startTyping(sectionMessages[detectedSection])
        } else {
          console.log('No section detected')
          setGhostImage('/Images/ghost-normal.png')
          stopTyping()
        }
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    
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
      {showBubble && (
        <div className="message-bubble show">
          <span>{displayedText}</span>
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