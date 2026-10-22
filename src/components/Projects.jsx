import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import Section from './Section'
import Card from './Card'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <Section id="projects" index="03" title="Projects" subtitle="A few things I've built.">
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {projects.map((proj) => (
          <Card
            key={proj.id}
            accent="cyan"
            role="link"
            tabIndex={0}
            onClick={() => {
              window.location.href = `/projects/${proj.id}`
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                window.location.href = `/projects/${proj.id}`
              }
            }}
          >
            {proj.image && (
              <div className="mb-4 -mt-2 -mx-2 overflow-hidden rounded-md border border-navyLine">
                <img src={proj.image} alt={proj.title} className="h-40 w-full object-cover" />
              </div>
            )}
            <h3 className="font-display text-xl text-ink">{proj.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">{proj.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {proj.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-navyDeep px-2.5 py-1 font-mono text-[11px] text-cyanPulse"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-5 flex gap-4">
              {proj.liveUrl && (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink hover:text-signal"
                >
                  <FiExternalLink /> Live
                </a>
              )}
              {proj.repoUrl && (
                <a
                  href={proj.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink hover:text-signal"
                >
                  <FiGithub /> Code
                </a>
              )}
            </div>
          </Card>
        ))}
      </motion.div>
    </Section>
  )
}
