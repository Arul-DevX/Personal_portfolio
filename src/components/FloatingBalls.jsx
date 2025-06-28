import React, { useEffect, useRef, useState } from 'react'

const FloatingBalls = () => {
  const [balls, setBalls] = useState([])
  const animationRef = useRef()
  const scrollSpeedRef = useRef(1)
  const lastScrollY = useRef(0)
  const scrollVelocity = useRef(0)

  useEffect(() => {
    const numBalls = 12
    const initialBalls = []

    // Create balls with more dynamic properties
    for (let i = 0; i < numBalls; i++) {
      const ball = {
        id: i,
        x: Math.random() * (window.innerWidth - 30),
        y: Math.random() * (window.innerHeight - 30),
        vx: (Math.random() - 0.5) * 2, // Base velocity
        vy: (Math.random() - 0.5) * 2,
        baseVx: (Math.random() - 0.5) * 2, // Store original velocity
        baseVy: (Math.random() - 0.5) * 2,
        size: Math.random() * 10 + 8,
        opacity: Math.random() * 0.5 + 0.4,
        bounceIntensity: Math.random() * 0.3 + 0.7 // How much energy is retained after bounce
      }
      initialBalls.push(ball)
    }

    setBalls(initialBalls)

    // Handle scroll detection and speed calculation
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const deltaY = currentScrollY - lastScrollY.current
      
      // Calculate scroll velocity (smoothed)
      scrollVelocity.current = scrollVelocity.current * 0.8 + Math.abs(deltaY) * 0.2
      
      // Update speed multiplier based on scroll velocity
      const maxScrollSpeed = 20 // Maximum scroll speed to consider
      const speedMultiplier = Math.min(scrollVelocity.current / maxScrollSpeed, 1)
      scrollSpeedRef.current = 1 + speedMultiplier * 4 // Speed from 1x to 5x
      
      lastScrollY.current = currentScrollY
    }

    // Decay scroll velocity when not scrolling
    const decayScrollVelocity = () => {
      scrollVelocity.current *= 0.95 // Gradual decay
      if (scrollVelocity.current < 0.1) {
        scrollVelocity.current = 0
        scrollSpeedRef.current = 1 // Return to normal speed
      }
    }

    // Animation loop with enhanced bouncing physics
    const animate = () => {
      decayScrollVelocity()
      
      setBalls(prevBalls => 
        prevBalls.map(ball => {
          const speedMultiplier = scrollSpeedRef.current
          
          // Apply speed multiplier to movement
          let newX = ball.x + ball.vx * speedMultiplier
          let newY = ball.y + ball.vy * speedMultiplier
          let newVx = ball.vx
          let newVy = ball.vy

          // Enhanced bouncing with energy retention
          if (newX <= 0) {
            newX = 0
            newVx = Math.abs(ball.vx) * ball.bounceIntensity
          } else if (newX >= window.innerWidth - ball.size) {
            newX = window.innerWidth - ball.size
            newVx = -Math.abs(ball.vx) * ball.bounceIntensity
          }

          if (newY <= 0) {
            newY = 0
            newVy = Math.abs(ball.vy) * ball.bounceIntensity
          } else if (newY >= window.innerHeight - ball.size) {
            newY = window.innerHeight - ball.size
            newVy = -Math.abs(ball.vy) * ball.bounceIntensity
          }

          // Add slight randomness to prevent balls from getting stuck in patterns
          if (Math.random() < 0.001) {
            newVx += (Math.random() - 0.5) * 0.1
            newVy += (Math.random() - 0.5) * 0.1
          }

          // Limit velocity to prevent balls from moving too fast
          const maxVelocity = 3
          newVx = Math.max(-maxVelocity, Math.min(maxVelocity, newVx))
          newVy = Math.max(-maxVelocity, Math.min(maxVelocity, newVy))

          return {
            ...ball,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy
          }
        })
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    // Add scroll listener with throttling
    let scrollTimeout
    const throttledScroll = () => {
      handleScroll()
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        // Additional decay when scroll stops
        scrollVelocity.current *= 0.5
      }, 100)
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })

    // Handle window resize
    const handleResize = () => {
      setBalls(prevBalls => 
        prevBalls.map(ball => ({
          ...ball,
          x: Math.min(ball.x, window.innerWidth - ball.size),
          y: Math.min(ball.y, window.innerHeight - ball.size)
        }))
      )
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      window.removeEventListener('resize', handleResize)
      clearTimeout(scrollTimeout)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="floating-balls-container">
      {balls.map(ball => (
        <div
          key={ball.id}
          className="floating-ball"
          style={{
            position: 'fixed',
            left: `${ball.x}px`,
            top: `${ball.y}px`,
            width: `${ball.size}px`,
            height: `${ball.size}px`,
            background: `radial-gradient(circle at 30% 30%, #86bcf2, #509ff4)`,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 1,
            boxShadow: `0 0 ${ball.size * 1.5}px rgba(80, 159, 244, 0.6)`,
            opacity: ball.opacity,
            transition: 'opacity 0.3s ease',
            filter: 'blur(0.5px)' // Slight blur for smoother appearance
          }}
        />
      ))}
    </div>
  )
}

export default FloatingBalls