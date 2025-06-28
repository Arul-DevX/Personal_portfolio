import React from 'react'

const ThreeDCard = ({ children, className = '' }) => {
  return (
    <div className={`three-d-card ${className}`}>
      {children}
    </div>
  )
}