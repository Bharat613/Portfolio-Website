import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { SiGeeksforgeeks, SiHackerrank, SiLeetcode } from 'react-icons/si'
import Section from './Section'
import Card from './Card'
import { platforms } from '../data/platforms'

const platformLogos = {
  LeetCode: { icon: SiLeetcode, color: '#FFA116' },
  GeeksforGeeks: { icon: SiGeeksforgeeks, color: '#2F8D46' },
  HackerRank: { icon: SiHackerrank, color: '#00EA64' },
}

export default function CodingPlatforms() {
  return (
    <Section
      id="platforms"
      index="05"
      title="Coding Platforms"
      subtitle="Where I practice and compete."
    >
      <motion.div
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.08 }}
      >
        {platforms.map((p) => (
          <a key={p.id} href={p.url || '#'} target="_blank" rel="noreferrer" className="block">
            <Card accent="signal" className="h-full">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {(() => {
                    const platformLogo = platformLogos[p.name]
                    const Logo = platformLogo?.icon
                    return Logo ? <Logo className="text-3xl" style={{ color: platformLogo.color }} aria-hidden="true" /> : null
                  })()}
                  <h3 className="font-display text-base text-ink">{p.name}</h3>
                </div>
                <FiArrowUpRight className="text-mist transition-colors group-hover:text-signal" />
              </div>
              <p className="mt-3 font-mono text-xs text-mist">{p.stat}</p>
            </Card>
          </a>
        ))}
      </motion.div>
    </Section>
  )
}
