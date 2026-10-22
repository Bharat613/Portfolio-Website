import { useRef } from 'react'
import { motion } from 'framer-motion'

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// Reusable card shell. Copy any section's card markup + wrap it in this
// component to add a new card — see the data/*.js files for the content
// side of that (each has a "COPY-PASTE TEMPLATE" comment at the bottom).
export default function Card({ children, className = '', accent = 'signal', onClick, onKeyDown, role, tabIndex }) {
  const ref = useRef(null)

  const accentMap = {
    signal: 'group-hover:border-signal/60 group-hover:shadow-glow',
    cyan: 'group-hover:border-cyanPulse/60 group-hover:shadow-glowCyan',
    violet: 'group-hover:border-violetEdge/60',
  }

  function handleMouseMove(e) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateX = ((y - rect.height / 2) / rect.height) * -6
    const rotateY = ((x - rect.width / 2) / rect.width) * 6
    el.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`
  }

  function handleMouseLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <motion.div
      variants={cardVariant}
      className={`group ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      tabIndex={tabIndex}
    >
      <div
        ref={ref}
        className={`h-full rounded-lg border border-navyLine bg-abyss/70 p-6 backdrop-blur-sm transition-all duration-300 ease-out ${accentMap[accent]}`}
        style={{ transitionProperty: 'transform, border-color, box-shadow' }}
      >
        {children}
      </div>
    </motion.div>
  )
}
