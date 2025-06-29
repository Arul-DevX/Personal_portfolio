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
    let animationId = null

    // Mouse move handler - direct positioning for main cursor
    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      
      // Direct positioning for main cursor (no delay)
      if (cursor) {
        cursor.style.left = `${mouseX - 10}px`
        cursor.style.top = `${mouseY - 10}px`
      }
      
      setIsVisible(true)
    }

    // Optimized trail animation with reduced delay
    const animateTrail = () => {
      // Increased smoothing factor from 0.1 to 0.25 for faster response
      trailX += (mouseX - trailX) * 0.25
      trailY += (mouseY - trailY) * 0.25
      
      if (trail) {
        trail.style.left = `${trailX - 4}px`
        trail.style.top = `${trailY - 4}px`
      }
      
      animationId = requestAnimationFrame(animateTrail)
    }

    // Mouse enter/leave handlers
    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Optimized hover detection
    const handleElementHover = (isHover) => {
      setIsHovering(isHover)
    }

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .click, .project-link, .menuicon, input, textarea')
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => handleElementHover(true), { passive: true })
      element.addEventListener('mouseleave', () => handleElementHover(false), { passive: true })
    })

    // Loading state detection
    const handleLoadingStart = () => setIsLoading(true)
    const handleLoadingEnd = () => setIsLoading(false)

    // Add event listeners with passive option for better performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
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
      
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      
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
          opacity: isVisible ? 0.9 : 0,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
        }}
      />
      <div
        ref={trailRef}
        className="cursor-trail"
        style={{
          opacity: isVisible ? 0.7 : 0,
        }}
      />
    </>
  )
}

export default CursorManager