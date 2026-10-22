import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/profile'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________'

// Scrambles into the target word, then holds before the loader exits.
function ScrambleWord({ word, delay = 0 }) {
  const [display, setDisplay] = useState(word.replace(/./g, ' '))

  useEffect(() => {
    let frame = 0
    const totalFrames = 18
    let interval
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        frame++
        const progress = frame / totalFrames
        const revealCount = Math.floor(progress * word.length)
        const next = word
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' '
            if (i < revealCount) return ch
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join('')
        setDisplay(next)
        if (frame >= totalFrames) {
          setDisplay(word)
          clearInterval(interval)
        }
      }, 35)
    }, delay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [word, delay])

  return <span>{display}</span>
}

export default function Loader({ onFinished }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const exitTimer = setTimeout(() => setVisible(false), 2400)
    return () => clearTimeout(exitTimer)
  }, [])

  return (
    <AnimatePresence onExitComplete={onFinished}>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          <motion.div
            className="absolute inset-0 grid-overlay opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1 }}
          />

          <div className="relative font-display text-3xl sm:text-5xl tracking-tight text-ink">
            <ScrambleWord word={profile.name.toUpperCase()} delay={100} />
          </div>

          <motion.div
            className="relative mt-4 font-mono text-xs sm:text-sm text-mist tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <ScrambleWord word={profile.role} delay={700} />
          </motion.div>

          <motion.div
            className="relative mt-10 h-[2px] w-40 overflow-hidden rounded-full bg-navyLine"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.4 }}
          >
            <motion.div
              className="h-full w-1/3 bg-gradient-to-r from-signal via-cyanPulse to-violetEdge"
              initial={{ x: '-120%' }}
              animate={{ x: '360%' }}
              transition={{ duration: 1.3, delay: 1, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
