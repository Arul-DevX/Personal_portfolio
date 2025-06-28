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

    // Create balls with random properties
    for (let i = 0; i < numBalls; i++) {
      initialBalls.push({
        id: i,
        x: Math.random() * (window.innerWidth - 30),
        y: Math.random() * (window.innerHeight - 30),
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        baseVx: (Math.random() - 0.5) * 0.8,
        baseVy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 8 + 6,
        opacity: Math.random() * 0.4 + 0.3,
        bounceIntensity: Math.random() * 0.2 + 0.5
      })
    }

    setBalls(initialBalls)

    // Handle scroll detection
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const deltaY = currentScrollY - lastScrollY.current
      
      // Calculate scroll velocity
      scrollVelocity.current = scrollVelocity.current * 0.8 + Math.abs(deltaY) * 0.2
      
      // Adjust speed multiplier based on scroll velocity
      const maxScrollSpeed = 20
      const speedMultiplier = Math.min(scrollVelocity.current / maxScrollSpeed, 1)
      scrollSpeedRef.current = 0.5 + speedMultiplier * 2 // Speed from 0.5x to 2.5x
      
      lastScrollY.current = currentScrollY
    }

    // Decay scroll velocity when not scrolling
    const decayScrollVelocity = () => {
      scrollVelocity.current *= 0.92
      if (scrollVelocity.current < 0.1) {
        scrollVelocity.current = 0
        scrollSpeedRef.current = 0.3
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
          if (Math.random() < 0.0005) {
            newVx += (Math.random() - 0.5) * 0.05
            newVy += (Math.random() - 0.5) * 0.05
          }

          // Limit velocity
          const maxVelocity = 1.5
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
            boxShadow: `0 0 ${ball.size * 1.2}px rgba(80, 159, 244, 0.4)`,
            opacity: ball.opacity,
            transition: 'opacity 0.3s ease',
            filter: 'blur(0.2px)'
          }}
        />
      ))}
    </div>
  )
}

export default FloatingBalls