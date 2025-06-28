import React, { useEffect, useRef, useState } from 'react'

const FloatingBalls = () => {
  const [balls, setBalls] = useState([])
  const animationRef = useRef()
  const scrollSpeedRef = useRef(1)

  useEffect(() => {
    const numBalls = 8
    const initialBalls = []

    // Create balls data
    for (let i = 0; i < numBalls; i++) {
      const ball = {
        id: i,
        x: Math.random() * (window.innerWidth - 20),
        y: Math.random() * (window.innerHeight - 20),
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        size: Math.random() * 8 + 6,
        opacity: Math.random() * 0.4 + 0.3
      }
      initialBalls.push(ball)
    }

    setBalls(initialBalls)

    // Handle scroll speed
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = Math.min(scrollY / (maxScroll || 1), 1)
      scrollSpeedRef.current = 1 + scrollProgress * 4 // Speed multiplier from 1x to 5x
    }

    // Animation loop
    const animate = () => {
      setBalls(prevBalls => 
        prevBalls.map(ball => {
          let newX = ball.x + ball.vx * scrollSpeedRef.current
          let newY = ball.y + ball.vy * scrollSpeedRef.current
          let newVx = ball.vx
          let newVy = ball.vy

          // Bounce off edges
          if (newX <= 0 || newX >= window.innerWidth - ball.size) {
            newVx *= -1
            newX = Math.max(0, Math.min(window.innerWidth - ball.size, newX))
          }
          if (newY <= 0 || newY >= window.innerHeight - ball.size) {
            newVy *= -1
            newY = Math.max(0, Math.min(window.innerHeight - ball.size, newY))
          }

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
    window.addEventListener('scroll', handleScroll)

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
            boxShadow: `0 0 ${ball.size * 2}px rgba(80, 159, 244, 0.4)`,
            opacity: ball.opacity,
            transition: 'opacity 0.3s ease'
          }}
        />
      ))}
    </div>
  )
}

export default FloatingBalls