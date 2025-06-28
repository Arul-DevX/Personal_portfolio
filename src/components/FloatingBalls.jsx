import React, { useEffect, useRef, useState } from 'react'

const FloatingBalls = () => {
  const [balls, setBalls] = useState([])
  const animationRef = useRef()
  const scrollSpeedRef = useRef(1)
  const lastScrollY = useRef(0)
  const scrollVelocity = useRef(0)

  useEffect(() => {
    const numBalls = 8 // Reduced from 12
    const initialBalls = []

    // Create balls with random properties
    for (let i = 0; i < numBalls; i++) {
      initialBalls.push({
        id: i,
        x: Math.random() * (window.innerWidth - 30),
        y: Math.random() * (window.innerHeight - 30),
        vx: (Math.random() - 0.5) * 1.2, // Increased speed from 0.6 to 1.2
        vy: (Math.random() - 0.5) * 1.2,
        baseVx: (Math.random() - 0.5) * 1.2,
        baseVy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 6 + 4, // Smaller size
        opacity: Math.random() * 0.3 + 0.2, // Reduced opacity
        bounceIntensity: Math.random() * 0.15 + 0.4
      })
    }

    setBalls(initialBalls)

    // Handle scroll detection
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const deltaY = currentScrollY - lastScrollY.current
      
      // Calculate scroll velocity
      scrollVelocity.current = scrollVelocity.current * 0.8 + Math.abs(deltaY) * 0.15
      
      // Adjust speed multiplier based on scroll velocity
      const maxScrollSpeed = 15
      const speedMultiplier = Math.min(scrollVelocity.current / maxScrollSpeed, 1)
      scrollSpeedRef.current = 1 + speedMultiplier * 2 // Increased base speed from 0.4 to 1
      
      lastScrollY.current = currentScrollY
    }

    // Decay scroll velocity when not scrolling
    const decayScrollVelocity = () => {
      scrollVelocity.current *= 0.94
      if (scrollVelocity.current < 0.08) {
        scrollVelocity.current = 0
        scrollSpeedRef.current = 1 // Increased from 0.25 to 1
      }
    }

    // Animation loop
    const animate = () => {
      decayScrollVelocity()
      
      setBalls(prevBalls => 
        prevBalls.map(ball => {
          const speedMultiplier = scrollSpeedRef.current
          
          let newX = ball.x + ball.vx * speedMultiplier
          let newY = ball.y + ball.vy * speedMultiplier
          let newVx = ball.vx
          let newVy = ball.vy

          // Bounce off walls
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

          // Add some randomness
          if (Math.random() < 0.0003) {
            newVx += (Math.random() - 0.5) * 0.03
            newVy += (Math.random() - 0.5) * 0.03
          }

          // Limit velocity - increased max velocity
          const maxVelocity = 2.0 // Increased from 1.2 to 2.0
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

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

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
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
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
            boxShadow: `0 0 ${ball.size * 0.8}px rgba(80, 159, 244, 0.2)`, // Reduced glow
            opacity: ball.opacity,
            transition: 'opacity 0.3s ease',
            filter: 'blur(0.1px)'
          }}
        />
      ))}
    </div>
  )
}

export default FloatingBalls