import React, { useState, useEffect } from 'react'
import ThreeDCard from './ThreeDCard'
import arulrAvatar from '/src/images/Arul.png';

const Home = () => {
  const [typedText, setTypedText] = useState('')
  const [isErasing, setIsErasing] = useState(false)
  const [index, setIndex] = useState(0)

  const text = "I'm a Data Analyst"
  const typingSpeed = 150
  const erasingSpeed = 100
  const delay = 2000

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isErasing && index < text.length) {
        // Typing phase
        setTypedText(prev => prev + text.charAt(index))
        setIndex(prev => prev + 1)
      } else if (isErasing && index > 0) {
        // Erasing phase
        setTypedText(text.substring(0, index - 1))
        setIndex(prev => prev - 1)
      } else if (!isErasing && index === text.length) {
        // After typing is complete, start erasing after a delay
        setTimeout(() => {
          setIsErasing(true)
        }, delay)
      } else if (isErasing && index === 0) {
        // After erasing is complete, start typing again after a delay
        setIsErasing(false)
      }
    }, isErasing ? erasingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [index, isErasing, text])

  const handleViewWork = () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="container" id="home">
      <div className="row">
        <div className="col1 animate-on-scroll fade-in-left">
          <h2><label>Hello, </label></h2>
          <h2>{typedText} <span className="cursor">|</span></h2>
          <p>Data Analyst | Python & SQL Expert | Business Intelligence Specialist</p>
          <button className="click" onClick={handleViewWork}>
            View My Analytics Projects &darr;
          </button>
        </div>
        <div className="col1 animate-on-scroll fade-in-right">
          <ThreeDCard>
            <img 
              className="all_img" 
              src={arulrAvatar} 
              alt="profile picture" 
              width="400px"
            />
          </ThreeDCard>
        </div>
      </div>
    </div>
  )
}

export default Home