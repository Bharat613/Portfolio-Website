import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi'
import { projects } from '../data/projects'

export default function ProjectDetails({ projectId, onBack }) {
  const project = projects.find((item) => item.id === projectId)
  const [isLoading, setIsLoading] = useState(true)

  function handleBack(event) {
    event.preventDefault()
    onBack()
  }

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1000)
    return () => window.clearTimeout(timer)
  }, [projectId])

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-void px-6 text-center text-ink">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-signal">Project not found</p>
          <a href="/#projects" onClick={handleBack} className="mt-4 inline-flex items-center gap-2 text-sm text-mist hover:text-ink">
            <FiArrowLeft /> Back to projects
          </a>
        </div>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-void px-6 text-center text-ink">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex justify-center gap-[0.08em] font-display text-4xl font-medium sm:text-6xl">
            {project.title.split('').map((character, index) => (
              <motion.span
                key={`${character}-${index}`}
                initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: index * 0.06, duration: 0.35, ease: 'easeOut' }}
              >
                {character === ' ' ? '\u00a0' : character}
              </motion.span>
            ))}
          </div>
          <motion.div
            className="mx-auto mt-8 h-px w-48 origin-left bg-gradient-to-r from-signal via-cyanPulse to-violetEdge"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.25, duration: 0.7, ease: 'easeInOut' }}
          />
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.35em] text-mist">Loading project</p>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-void px-6 py-24 text-ink sm:px-10">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <a href="/#projects" onClick={handleBack} className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-mist transition-colors hover:text-signal">
          <FiArrowLeft /> Back to projects
        </a>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="overflow-hidden rounded-lg border border-navyLine bg-abyss/70"
          >
            {project.image ? (
              <img src={project.image} alt={project.title} className="aspect-video w-full object-cover" />
            ) : (
              <div className="flex aspect-video items-center justify-center bg-grid-fade px-6 text-center font-mono text-xs uppercase tracking-widest text-faint">
                Add a project image in data/projects.js
              </div>
            )}
          </motion.div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-signal">Project details</p>
            <h1 className="mt-3 font-display text-4xl font-medium text-ink sm:text-5xl">{project.title}</h1>
            <p className="mt-6 text-base leading-relaxed text-mist">{project.description}</p>
            <p className="mt-5 text-sm leading-7 text-mist">{project.details || project.description}</p>

            <div className="mt-7 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="rounded-md bg-navyDeep px-3 py-1.5 font-mono text-xs text-cyanPulse">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-5">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink hover:text-signal">
                  <FiExternalLink /> Live project
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink hover:text-signal">
                  <FiGithub /> Source code
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
