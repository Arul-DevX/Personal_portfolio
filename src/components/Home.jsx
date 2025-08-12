import React, { useState, useEffect } from 'react'
import ThreeDCard from './ThreeDCard'
import { Download, FileText } from 'lucide-react'
import arulrAvatar from '/src/images/Arul.png';

const Home = () => {
  const [typedText, setTypedText] = useState('')
  const [isErasing, setIsErasing] = useState(false)
  const [index, setIndex] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  const texts = ["I'm Arul", "I'm a Data Analyst", "I transform data into insights"]
  const typingSpeed = 150
  const erasingSpeed = 100
  const delay = 3000

  useEffect(() => {
    const currentText = texts[currentTextIndex]
    const timeout = setTimeout(() => {
      if (!isErasing && index < currentText.length) {
        // Typing phase
        setTypedText(prev => prev + currentText.charAt(index))
        setIndex(prev => prev + 1)
      } else if (isErasing && index > 0) {
        // Erasing phase
        setTypedText(currentText.substring(0, index - 1))
        setIndex(prev => prev - 1)
      } else if (!isErasing && index === currentText.length) {
        // After typing is complete, start erasing after a delay
        setTimeout(() => {
          setIsErasing(true)
        }, delay)
      } else if (isErasing && index === 0) {
        // After erasing is complete, start typing again after a delay
        setIsErasing(false)
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
      }
    }, isErasing ? erasingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [index, isErasing, currentTextIndex, texts])

  const handleViewWork = () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })
  }

  const handleDownloadResume = () => {
    // Create a link element and trigger download
    const link = document.createElement('a')
    link.href = '/Arul\'s Resume.pdf'
    link.download = 'Arul_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleViewResume = () => {
    // Open resume in new tab
    window.open('/Arul\'s Resume.pdf', '_blank')
  }
  return (
    <div className="container" id="home">
      <div className="row">
        <div className="col1 animate-on-scroll fade-in-left">
          <h2><label>Hello, </label></h2>
          <h2>{typedText} <span className="cursor">|</span></h2>
          <p>Data Analyst | Python & SQL Expert | Business Intelligence Specialist</p>
          
          <div className="home-buttons">
            <button className="click" onClick={handleViewWork}>
              View My Analytics Projects &darr;
            </button>
            
            <div className="resume-buttons">
              <button className="resume-btn download-btn" onClick={handleDownloadResume}>
                <Download size={18} />
                Download Resume
              </button>
            </div>
          </div>
        </div>
        <div className="col1 animate-on-scroll fade-in-right">
          <ThreeDCard>
            <img 
              className="all_img" 
              src={arulrAvatar} 
              alt="profile picture" 
              width="300px"
            />
          </ThreeDCard>
        </div>
      </div>
    </div>
  )
}

export default Home