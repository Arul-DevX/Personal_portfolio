import React, { useEffect, useRef } from 'react'

const FloatingBalls = () => {
  const ballsRef = useRef([])
  const scrollSpeedRef = useRef(1)

  useEffect(() => {
    const numBalls = 8
    const balls = []

    // Create balls
    for (let i = 0; i < numBalls; i++) {
      const ball = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 8 + 4,
        opacity: Math.random() * 0.6 + 0.2,
        element: null
      }
      balls.push(ball)
    }

    ballsRef.current = balls

    // Create DOM elements
    balls.forEach((ball, index) => {
      const ballElement = document.createElement('div')
      ballElement.className = 'floating-ball'
      ballElement.style.cssText = `
        position: fixed;
        width: ${ball.size}px;
        height: ${ball.size}px;
        background: radial-gradient(circle at 30% 30%, #86bcf2, #509ff4);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        box-shadow: 0 0 ${ball.size * 2}px rgba(80, 159, 244, 0.3);
        opacity: ${ball.opacity};
        transition: opacity 0.3s ease;
      `
      ball.element = ballElement
      document.body.appendChild(ballElement)
    })

    // Handle scroll speed
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = Math.min(scrollY / maxScroll, 1)
      scrollSpeedRef.current = 1 + scrollProgress * 4 // Speed multiplier from 1x to 5x
    }

    // Animation loop
    const animate = () => {
      balls.forEach(ball => {
        // Update position with scroll-based speed
        ball.x += ball.vx * scrollSpeedRef.current
        ball.y += ball.vy * scrollSpeedRef.current

        // Bounce off edges
        if (ball.x <= 0 || ball.x >= window.innerWidth - ball.size) {
          ball.vx *= -1
          ball.x = Math.max(0, Math.min(window.innerWidth - ball.size, ball.x))
        }
        if (ball.y <= 0 || ball.y >= window.innerHeight - ball.size) {
          ball.vy *= -1
          ball.y = Math.max(0, Math.min(window.innerHeight - ball.size, ball.y))
        }

        // Update DOM element position
        if (ball.element) {
          ball.element.style.transform = `translate(${ball.x}px, ${ball.y}px)`
        }
      })

      requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll)

    // Handle window resize
    const handleResize = () => {
      balls.forEach(ball => {
        ball.x = Math.min(ball.x, window.innerWidth - ball.size)
        ball.y = Math.min(ball.y, window.innerHeight - ball.size)
      })
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      balls.forEach(ball => {
        if (ball.element && ball.element.parentNode) {
          ball.element.parentNode.removeChild(ball.element)
        }
      })
    }
  }, [])

  return null // This component doesn't render anything directly
}

export default FloatingBalls