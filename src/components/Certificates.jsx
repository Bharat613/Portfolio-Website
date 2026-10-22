import { motion } from 'framer-motion'
import { FiAward, FiExternalLink } from 'react-icons/fi'
import Section from './Section'
import Card from './Card'
import { certificates } from '../data/certificates'

export default function Certificates() {
  return (
    <Section
      id="certificates"
      index="04"
      title="Certificates"
      subtitle="Courses and certifications I've completed."
    >
      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.08 }}
      >
        {certificates.map((cert) => (
          <Card key={cert.id} accent="violet">
            {cert.image && (
              <div className="mb-4 -mt-2 -mx-2 overflow-hidden rounded-md border border-navyLine">
                <img src={cert.image} alt={cert.title} className="h-40 w-full object-cover" />
              </div>
            )}
            <FiAward className="mb-3 text-violetEdge" size={22} />
            <h3 className="font-display text-base text-ink">{cert.title}</h3>
            <p className="mt-1 text-sm text-mist">{cert.issuer}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-mono text-xs text-faint">{cert.date}</span>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 font-mono text-xs text-signal hover:underline"
                >
                  Verify <FiExternalLink size={12} />
                </a>
              )}
            </div>
          </Card>
        ))}
      </motion.div>
    </Section>
  )
}
