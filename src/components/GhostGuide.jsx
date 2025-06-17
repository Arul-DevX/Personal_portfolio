import React, { useState, useEffect, useRef } from 'react'

const GhostGuide = () => {
  const [currentSection, setCurrentSection] = useState(null)
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [ghostPosition, setGhostPosition] = useState({ x: 0, y: 0 })
  const [ghostImage, setGhostImage] = useState('/Images/ghost-normal.png')
  const typingTimeoutRef = useRef(null)

  const sectionMessages = {
    about: "Here's where you can learn about Arul's skills and passion for web development.",
    projects: "Check out Arul's impressive portfolio of web development projects.",
    home: "Welcome to Arul's portfolio! Explore his skills, projects, and achievements as a frontend developer and tech enthusiast. Let's dive in!",
    skills: "Arul is skilled in Python, Web Development (HTML, CSS, JavaScript), SQL, and Git/GitHub. He's adept at solving problems with his programming expertise and has a solid understanding of Cloud Computing!",
    contact: "Want to get in touch? You can reach Arul via email at arulraman77@gmail.com or connect on LinkedIn. Looking forward to hearing from you!"
  }

  const typeMessage = (newMessage) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    setMessage('')
    setIsTyping(true)
    let i = 0

    const typeChar = () => {
      if (i < newMessage.length) {
        setMessage(prev => prev + newMessage.charAt(i))
        i++
        typingTimeoutRef.current = setTimeout(typeChar, 30)
      } else {
        setIsTyping(false)
      }
    }

    typeChar()
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      setGhostPosition({ x: e.clientX + 20, y: e.clientY - 20 })
      
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY)
      let newSection = null
      
      // Check which section the mouse is over
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (section && section.contains(hoveredElement)) {
          newSection = sectionId
          break
        }
      }
      
      if (newSection !== currentSection) {
        setCurrentSection(newSection)
        if (newSection) {
          setGhostImage('/Images/ghost-smile.png')
          typeMessage(sectionMessages[newSection])
        } else {
          setGhostImage('/Images/ghost-normal.png')
          setMessage('')
          setIsTyping(false)
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
      <div className={`message-bubble ${message ? 'show' : ''}`}>
        {message}
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