import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Section({ id, index, title, subtitle, children }) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={item} className="mb-14 flex items-baseline gap-4">
          {index && (
            <span className="font-mono text-sm text-signal/70">{index}</span>
          )}
          <div>
            <h2 className="font-display text-3xl font-medium text-ink sm:text-4xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 max-w-xl text-sm text-mist sm:text-base">{subtitle}</p>
            )}
          </div>
        </motion.div>

        <motion.div variants={item}>{children}</motion.div>
      </motion.div>
    </section>
  )
}

export { item as sectionItemVariant }
