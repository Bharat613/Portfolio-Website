import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import Loader from './components/Loader'
import Background3D from './components/Background3D'
import Navbar from './components/Navbar'
import Intro from './components/Intro'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import CodingPlatforms from './components/CodingPlatforms'
import ProfessionalProfiles from './components/ProfessionalProfiles'
import ProjectDetails from './components/ProjectDetails'
import YouTube from './components/YouTube'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [pathname, setPathname] = useState(() => window.location.pathname)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const projectMatch = pathname.match(/^\/projects\/([^/]+)\/?$/)
  if (projectMatch) {
    return (
      <ProjectDetails
        projectId={projectMatch[1]}
        onBack={() => {
          window.history.pushState({}, '', '/#projects')
          setLoading(false)
          setPathname('/')
          window.setTimeout(() => document.getElementById('projects')?.scrollIntoView(), 0)
        }}
      />
    )
  }

  return (
    <>
      {loading && <Loader onFinished={() => setLoading(false)} />}

      <Background3D />

      <motion.div
        className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-signal via-cyanPulse to-violetEdge"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        <Navbar />
        <main className="relative">
          <Intro />
          <Skills />
          <Experience />
          <Projects />
          <Certificates />
          <CodingPlatforms />
          <ProfessionalProfiles />
          <YouTube />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  )
}
