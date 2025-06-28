import React, { useRef, useEffect } from 'react'

const ThreeDCard = ({ children, className = '', intensity = 1 }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = ((y - centerY) / centerY) * -10 * intensity
      const rotateY = ((x - centerX) / centerX) * 10 * intensity
      
      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateZ(20px)
        scale3d(1.02, 1.02, 1.02)
      `
    }

    const handleMouseLeave = () => {
      card.style.transform = `
        perspective(1000px) 
        rotateX(0deg) 
        rotateY(0deg) 
        translateZ(0px)
        scale3d(1, 1, 1)
      `
    }

    const handleMouseEnter = () => {
      card.style.transition = 'none'
    }

    const handleTransitionEnd = () => {
      card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)
    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('transitionend', handleTransitionEnd)

    // Set initial transition
    card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    card.style.transformStyle = 'preserve-3d'

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('transitionend', handleTransitionEnd)
    }
  }, [intensity])

  return (
    <div 
      ref={cardRef}
      className={`three-d-card ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      {children}
    </div>
  )
}

export default ThreeDCard