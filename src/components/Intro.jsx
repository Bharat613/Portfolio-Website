import { motion } from 'framer-motion'
import { FiArrowDown, FiDownload } from 'react-icons/fi'
import { profile } from '../data/profile'
import SocialLinks from './SocialLinks'

const letterVariant = {
  hidden: { y: '110%' },
  show: (i) => ({
    y: '0%',
    transition: { duration: 0.7, delay: 0.15 + i * 0.04, ease: [0.22, 1, 0.36, 1] },
  }),
}

function RevealLine({ text, className = '' }) {
  const words = text.split(' ')
  return (
    <span className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="mr-[0.3em] overflow-hidden pb-1">
          <motion.span
            className="inline-block"
            custom={i}
            variants={letterVariant}
            initial="hidden"
            animate="show"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function Intro() {
  return (
    <section
      id="intro"
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-24 sm:px-10"
    >
      <div className="grid grid-cols-1 items-center gap-14 sm:grid-cols-[1.3fr_0.7fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-5 font-mono text-sm tracking-widest text-cyanPulse"
          >
            {'// hello, world'}
          </motion.p>

          <h1 className="font-display text-4xl font-medium leading-[1.08] text-ink sm:text-6xl">
            <RevealLine text={`I'm ${profile.name},`} />
            <RevealLine text={profile.role + '.'} className="text-gradient" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-mist text-justify sm:text-lg"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="rounded-full bg-signal px-6 py-3 font-mono text-xs uppercase tracking-widest text-white shadow-glow transition-transform hover:-translate-y-0.5"
            >
              View Projects
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="flex items-center gap-2 rounded-full border border-navyLine px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:border-signal/60"
            >
              <FiDownload /> Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-10"
          >
            <SocialLinks />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
          className="relative mx-auto aspect-[3/4] w-full max-w-[360px]"
        >
          <div className="absolute inset-0 animate-floatY rounded-2xl bg-gradient-to-br from-signal/25 via-transparent to-violetEdge/25 blur-2xl" />
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-navyLine bg-navyDeep">
            <img
              src={profile.photoUrl}
              alt={profile.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextSibling.style.display = 'flex'
              }}
            />
            <motion.div
              aria-hidden="true"
              animate={{ x: ['-140%', '420%'] }}
              transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
              className="pointer-events-none absolute inset-y-0 -left-1/3 z-10 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />
            <div className="hidden h-full w-full items-center justify-center font-mono text-xs text-mist">
              No Image Found
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#skills"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-mist"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiArrowDown />
        </motion.span>
      </motion.a>
    </section>
  )
}
