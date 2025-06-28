import React, { useEffect, useRef } from 'react'

const ParallaxBackground = () => {
  const containerRef = useRef(null)
  const layersRef = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallax = scrolled * 0.5
      const parallax2 = scrolled * 0.3
      const parallax3 = scrolled * 0.1

      if (layersRef.current[0]) {
        layersRef.current[0].style.transform = `translateY(${parallax}px)`
      }
      if (layersRef.current[1]) {
        layersRef.current[1].style.transform = `translateY(${parallax2}px)`
      }
      if (layersRef.current[2]) {
        layersRef.current[2].style.transform = `translateY(${parallax3}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="parallax-container" ref={containerRef}>
      {/* Layer 1 - Deepest */}
      <div 
        className="parallax-layer layer-1"
        ref={el => layersRef.current[0] = el}
      >
        <div className="geometric-shape shape-1"></div>
        <div className="geometric-shape shape-2"></div>
        <div className="geometric-shape shape-3"></div>
      </div>

      {/* Layer 2 - Middle */}
      <div 
        className="parallax-layer layer-2"
        ref={el => layersRef.current[1] = el}
      >
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="floating-element element-4"></div>
      </div>

      {/* Layer 3 - Closest */}
      <div 
        className="parallax-layer layer-3"
        ref={el => layersRef.current[2] = el}
      >
        <div className="light-ray ray-1"></div>
        <div className="light-ray ray-2"></div>
        <div className="light-ray ray-3"></div>
      </div>
    </div>
  )
}

export default ParallaxBackground