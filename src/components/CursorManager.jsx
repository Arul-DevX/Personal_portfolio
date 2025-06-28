import React, { useEffect, useRef, useState } from 'react'

const CursorManager = () => {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const trail = trailRef.current
    
    if (!cursor || !trail) return

    let mouseX = 0
    let mouseY = 0
    let trailX = 0
    let trailY = 0

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      
      if (cursor) {
        cursor.style.left = `${mouseX - 10}px`
        cursor.style.top = `${mouseY - 10}px`
      }
      
      setIsVisible(true)
    }

    // Smooth trail animation
    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.1
      trailY += (mouseY - trailY) * 0.1
      
      if (trail) {
        trail.style.left = `${trailX - 4}px`
        trail.style.top = `${trailY - 4}px`
      }
      
      requestAnimationFrame(animateTrail)
    }

    // Mouse enter/leave handlers
    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Hover detection for interactive elements
    const handleElementHover = (isHover) => {
      setIsHovering(isHover)
    }

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .click, .project-link, .menuicon, input, textarea')
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => handleElementHover(true))
      element.addEventListener('mouseleave', () => handleElementHover(false))
    })

    // Loading state detection
    const handleLoadingStart = () => setIsLoading(true)
    const handleLoadingEnd = () => setIsLoading(false)

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('beforeunload', handleLoadingStart)
    window.addEventListener('load', handleLoadingEnd)

    // Start trail animation
    animateTrail()

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('beforeunload', handleLoadingStart)
      window.removeEventListener('load', handleLoadingEnd)
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', () => handleElementHover(true))
        element.removeEventListener('mouseleave', () => handleElementHover(false))
      })
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null
  }

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hover' : ''} ${isLoading ? 'loading-cursor' : ''}`}
        style={{
          opacity: isVisible ? 0.8 : 0,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
        }}
      />
      <div
        ref={trailRef}
        className="cursor-trail"
        style={{
          opacity: isVisible ? 0.6 : 0,
        }}
      />
    </>
  )
}

export default CursorManager