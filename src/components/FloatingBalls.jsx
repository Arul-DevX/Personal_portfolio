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

    // Create balls with very smooth base velocities
    for (let i = 0; i < numBalls; i++) {
      const ball = {
        id: i,
        x: Math.random() * (window.innerWidth - 30),
        y: Math.random() * (window.innerHeight - 30),
        vx: (Math.random() - 0.5) * 0.3, // Much slower base velocity
        vy: (Math.random() - 0.5) * 0.3,
        baseVx: (Math.random() - 0.5) * 0.3,
        baseVy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 8 + 6,
        opacity: Math.random() * 0.4 + 0.3,
        bounceIntensity: Math.random() * 0.15 + 0.3, // Much gentler bouncing
        targetX: 0,
        targetY: 0,
        smoothX: 0,
        smoothY: 0
      }
      // Initialize smooth positions
      ball.smoothX = ball.x
      ball.smoothY = ball.y
      ball.targetX = ball.x
      ball.targetY = ball.y
      initialBalls.push(ball)
    }

    setBalls(initialBalls)

    // Handle scroll detection with smoother calculations
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const deltaY = currentScrollY - lastScrollY.current
      
      // Much smoother scroll velocity calculation
      scrollVelocity.current = scrollVelocity.current * 0.9 + Math.abs(deltaY) * 0.1
      
      // Gentler speed multiplier
      const maxScrollSpeed = 15
      const speedMultiplier = Math.min(scrollVelocity.current / maxScrollSpeed, 0.8)
      scrollSpeedRef.current = 0.3 + speedMultiplier * 1.2 // Speed from 0.3x to 1.5x
      
      lastScrollY.current = currentScrollY
    }

    // Much smoother decay
    const decayScrollVelocity = () => {
      scrollVelocity.current *= 0.95 // Very gradual decay
      if (scrollVelocity.current < 0.02) {
        scrollVelocity.current = 0
        scrollSpeedRef.current = 0.2 // Very gentle when not scrolling
      }
    }

    // Smooth interpolation function
    const lerp = (start, end, factor) => {
      return start + (end - start) * factor
    }

    // Animation loop with smooth interpolation
    const animate = () => {
      decayScrollVelocity()
      
      setBalls(prevBalls => 
        prevBalls.map(ball => {
          const speedMultiplier = scrollSpeedRef.current
          const smoothingFactor = 0.08 // Lower = smoother but slower response
          
          // Calculate target position
          let targetX = ball.targetX + ball.vx * speedMultiplier
          let targetY = ball.targetY + ball.vy * speedMultiplier
          let newVx = ball.vx
          let newVy = ball.vy

          // Smooth bouncing with much gentler physics
          if (targetX <= 0) {
            targetX = 0
            newVx = Math.abs(ball.vx) * ball.bounceIntensity
          } else if (targetX >= window.innerWidth - ball.size) {
            targetX = window.innerWidth - ball.size
            newVx = -Math.abs(ball.vx) * ball.bounceIntensity
          }

          if (targetY <= 0) {
            targetY = 0
            newVy = Math.abs(ball.vy) * ball.bounceIntensity
          } else if (targetY >= window.innerHeight - ball.size) {
            targetY = window.innerHeight - ball.size
            newVy = -Math.abs(ball.vy) * ball.bounceIntensity
          }

          // Add very subtle randomness much less frequently
          if (Math.random() < 0.0001) {
            newVx += (Math.random() - 0.5) * 0.02
            newVy += (Math.random() - 0.5) * 0.02
          }

          // Much stricter velocity limits
          const maxVelocity = 0.8
          newVx = Math.max(-maxVelocity, Math.min(maxVelocity, newVx))
          newVy = Math.max(-maxVelocity, Math.min(maxVelocity, newVy))

          // Apply velocity damping for smoother movement
          newVx *= 0.999
          newVy *= 0.999

          // Smooth interpolation to target position
          const smoothX = lerp(ball.smoothX, targetX, smoothingFactor)
          const smoothY = lerp(ball.smoothY, targetY, smoothingFactor)

          return {
            ...ball,
            x: smoothX, // Use smooth position for rendering
            y: smoothY,
            targetX: targetX, // Keep track of target
            targetY: targetY,
            smoothX: smoothX, // Store smooth position
            smoothY: smoothY,
            vx: newVx,
            vy: newVy
          }
        })
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    // Add scroll listener with better throttling
    let scrollTimeout
    const throttledScroll = () => {
      handleScroll()
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        // Gradual decay when scroll stops
        scrollVelocity.current *= 0.5
      }, 200)
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })

    // Handle window resize smoothly
    const handleResize = () => {
      setBalls(prevBalls => 
        prevBalls.map(ball => ({
          ...ball,
          x: Math.min(ball.x, window.innerWidth - ball.size),
          y: Math.min(ball.y, window.innerHeight - ball.size),
          targetX: Math.min(ball.targetX, window.innerWidth - ball.size),
          targetY: Math.min(ball.targetY, window.innerHeight - ball.size),
          smoothX: Math.min(ball.smoothX, window.innerWidth - ball.size),
          smoothY: Math.min(ball.smoothY, window.innerHeight - ball.size)
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
            filter: 'blur(0.2px)',
            transform: 'translateZ(0)', // Enable hardware acceleration
            willChange: 'transform' // Optimize for animations
          }}
        />
      ))}
    </div>
  )
}

export default FloatingBalls