import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { SiGithub, SiLinkedin } from 'react-icons/si'
import Section from './Section'
import Card from './Card'
import { profile } from '../data/profile'

const profiles = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Professional network',
    url: profile.socials.linkedin,
    icon: SiLinkedin,
    color: '#0A66C2',
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Open-source projects',
    url: profile.socials.github,
    icon: SiGithub,
    color: '#F0F6FC',
  },
]

export default function ProfessionalProfiles() {
  return (
    <Section
      id="profiles"
      index="06"
      title="Professional Profiles"
      subtitle="Connect with me and explore my work."
    >
      <motion.div
        className="grid grid-cols-1 gap-8 sm:grid-cols-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.08 }}
      >
        {profiles.map((item) => {
          const Icon = item.icon

          return (
            <a key={item.id} href={item.url || '#'} target="_blank" rel="noreferrer" className="block">
              <Card accent="cyan" className="h-full">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="text-3xl" style={{ color: item.color }} aria-hidden="true" />
                    <h3 className="font-display text-base text-ink">{item.name}</h3>
                  </div>
                  <FiArrowUpRight className="text-mist transition-colors group-hover:text-cyanPulse" />
                </div>
                <p className="mt-3 font-mono text-xs text-mist">{item.description}</p>
              </Card>
            </a>
          )
        })}
      </motion.div>
    </Section>
  )
}
