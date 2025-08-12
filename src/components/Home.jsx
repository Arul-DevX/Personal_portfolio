import React, { useState, useEffect } from 'react'
import ThreeDCard from './ThreeDCard'
import { Download, FileText, X } from 'lucide-react'
import arulrAvatar from '/src/images/Arul.png';

const Home = () => {
  const [typedText, setTypedText] = useState('')
  const [isErasing, setIsErasing] = useState(false)
  const [index, setIndex] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [showResume, setShowResume] = useState(false) // NEW

  const texts = ["I'm Arul", "I'm a Data Analyst", "I transform data into insights"]
  const typingSpeed = 150
  const erasingSpeed = 100
  const delay = 3000

  useEffect(() => {
    const currentText = texts[currentTextIndex]
    const timeout = setTimeout(() => {
      if (!isErasing && index < currentText.length) {
        setTypedText(prev => prev + currentText.charAt(index))
        setIndex(prev => prev + 1)
      } else if (isErasing && index > 0) {
        setTypedText(currentText.substring(0, index - 1))
        setIndex(prev => prev - 1)
      } else if (!isErasing && index === currentText.length) {
        setTimeout(() => setIsErasing(true), delay)
      } else if (isErasing && index === 0) {
        setIsErasing(false)
        setCurrentTextIndex(prev => (prev + 1) % texts.length)
      }
    }, isErasing ? erasingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [index, isErasing, currentTextIndex, texts])

  const handleViewWork = () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })
  }

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = "/Arul-Resume.pdf"
    link.download = 'Arul-Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleViewResume = () => {
    setShowResume(true) // instead of opening new tab
  }

  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="row">
          <div className="col1 animate-on-scroll fade-in-left">
            <h1><span className="greeting">Hello, </span></h1>
            <h1 className="main-title">{typedText} <span className="cursor">|</span></h1>
            <p className="subtitle">Data Analyst | Python & SQL Expert | Business Intelligence Specialist</p>
          
            <div className="home-buttons">
              <button className="click primary-cta" onClick={handleViewWork}>
                View My Analytics Projects &darr;
              </button>
            
              <div className="resume-buttons">
                
                <button className="resume-btn view-btn" onClick={handleViewResume}>
                  <FileText size={18} />
                  View Resume
                </button>
              </div>
            </div>
          </div>

          <div className="col1 animate-on-scroll fade-in-right">
            <ThreeDCard>
              <img 
                className="all_img hero-image" 
                src={arulrAvatar} 
                alt="Arul - Data Analyst" 
                width="300px"
              />
            </ThreeDCard>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {showResume && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%',
          height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 9999
        }}>
          <div style={{ position: 'relative', width: '80%', height: '80%' }}>
            <button
              onClick={() => setShowResume(false)}
              style={{
                position: 'absolute', top: '10px', right: '10px',
                background: 'transparent', border: 'none', color: '#fff',
                cursor: 'pointer', fontSize: '1.5rem'
              }}
            >
              <X />
            </button>
            <iframe
              src="/Arul-Resume.pdf"
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Resume PDF"
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Home
