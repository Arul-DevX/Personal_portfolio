import React from 'react'
import Navigation from './components/Navigation'
import FloatingBalls from './components/FloatingBalls'
import ParallaxBackground from './components/ParallaxBackground'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './components/ParallaxBackground.css'

function App() {
  return (
    <div className="App">
      <ParallaxBackground />
      <FloatingBalls />
      <Navigation />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App