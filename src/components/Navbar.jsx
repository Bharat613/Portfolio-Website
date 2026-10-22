import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINKS = [
  { id: 'intro', label: 'Intro' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'platforms', label: 'Platforms' },
  { id: 'profiles', label: 'Profiles' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('intro')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-void/80 backdrop-blur-md border-b border-navyLine' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="#intro" className="font-display text-lg font-semibold tracking-tight text-ink">
          PORTFOLIO<span className="text-signal">.</span>
        </a>
        <ul className="hidden gap-8 sm:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`relative font-mono text-xs uppercase tracking-widest transition-colors ${
                  active === link.id ? 'text-ink' : 'text-mist hover:text-ink'
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-gradient-to-r from-signal to-cyanPulse"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden rounded-full border border-signal/50 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-signal transition-colors hover:bg-signal/10 sm:inline-block"
        >
          Say hi
        </a>
      </nav>
    </motion.header>
  )
}
