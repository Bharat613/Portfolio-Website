import { motion } from 'framer-motion'
import { FaBuilding } from 'react-icons/fa'
import Section from './Section'
import { experience } from '../data/experience'

export default function Experience() {
  return (
    <Section id="experience" index="02" title="Experience" subtitle="Where I've worked.">
      <div className="relative border-l border-navyLine pl-8 sm:pl-10">
        {experience.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative mb-12 last:mb-0"
          >
            <span className="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full border-2 border-signal bg-void sm:-left-[49px]" />
            <div className="rounded-lg border border-navyLine bg-abyss/70 p-6 backdrop-blur-sm transition-colors hover:border-signal/50">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-navyLine bg-navyDeep sm:h-20 sm:w-20">
                    {exp.logo ? (
                      <img src={exp.logo} alt={`${exp.company} logo`} className="h-full w-full object-contain p-1" />
                    ) : (
                      <FaBuilding aria-hidden="true" className="text-xl text-cyanPulse" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-ink">{exp.role}</h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wider text-cyanPulse">
                      {exp.company}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs text-faint">{exp.duration}</span>
              </div>
              <ul className="mt-4 space-y-2">
                {exp.points.map((point, idx) => (
                  <li key={idx} className="flex gap-2 text-sm leading-relaxed text-mist">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}

        {/* ── COPY-PASTE: to add a role, add an object to src/data/experience.js */}
      </div>
    </Section>
  )
}
