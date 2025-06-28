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

    // Create balls with slower base velocities
    for (let i = 0; i < numBalls; i++) {
      const ball = {
        id: i,
        x: Math.random() * (window.innerWidth - 30),
        y: Math.random() * (window.innerHeight - 30),
        vx: (Math.random() - 0.5) * 0.8, // Reduced base velocity
        vy: (Math.random() - 0.5) * 0.8,
        baseVx: (Math.random() - 0.5) * 0.8,
        baseVy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 10 + 8,
        opacity: Math.random() * 0.5 + 0.4,
        bounceIntensity: Math.random() * 0.2 + 0.5 // Reduced bounce intensity
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
      const maxScrollSpeed = 20
      const speedMultiplier = Math.min(scrollVelocity.current / maxScrollSpeed, 1)
      scrollSpeedRef.current = 0.5 + speedMultiplier * 2 // Speed from 0.5x to 2.5x (reduced)
      
      lastScrollY.current = currentScrollY
    }

    // Enhanced decay for slower return to normal speed
    const decayScrollVelocity = () => {
      scrollVelocity.current *= 0.92 // Slower decay
      if (scrollVelocity.current < 0.05) {
        scrollVelocity.current = 0
        scrollSpeedRef.current = 0.3 // Very slow when not scrolling
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

          // Enhanced bouncing with reduced energy retention
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

          // Add slight randomness less frequently
          if (Math.random() < 0.0005) {
            newVx += (Math.random() - 0.5) * 0.05
            newVy += (Math.random() - 0.5) * 0.05
          }

          // Limit velocity to prevent balls from moving too fast
          const maxVelocity = 1.5 // Reduced max velocity
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
        scrollVelocity.current *= 0.3
      }, 150)
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
            boxShadow: `0 0 ${ball.size * 1.2}px rgba(80, 159, 244, 0.4)`,
            opacity: ball.opacity,
            transition: 'opacity 0.3s ease',
            filter: 'blur(0.2px)' // Reduced blur from 0.5px to 0.2px
          }}
        />
      ))}
    </div>
  )
}

export default FloatingBalls