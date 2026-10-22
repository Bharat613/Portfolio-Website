import { motion } from 'framer-motion'
import Section from './Section'
import Card from './Card'
import { skills } from '../data/skills'
import {
  FaAws,
  FaCode,
  FaDocker,
  FaGitAlt,
  FaJava,
  FaJsSquare,
  FaLinux,
  FaNodeJs,
  FaPython,
  FaReact,
} from 'react-icons/fa'
import {
  SiFlask,
  SiCplusplus,
  SiExpress,
  SiFramer,
  SiGraphql,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiPostman,
  SiPowerbi,
  SiRedis,
  SiSpringboot,
  SiTailwindcss,
  SiTableau,
  SiThreedotjs,
  SiTypescript,
} from 'react-icons/si'

const skillIcons = {
  JavaScript: { icon: FaJsSquare, color: '#f7df1e' },
  TypeScript: { icon: SiTypescript, color: '#3178c6' },
  Python: { icon: FaPython, color: '#3776ab' },
  Java: { icon: FaJava, color: '#e76f00' },
  'C++': { icon: SiCplusplus, color: '#00599c' },
  React: { icon: FaReact, color: '#61dafb' },
  'Next.js': { icon: SiNextdotjs, color: '#ffffff' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06b6d4' },
  'Three.js': { icon: SiThreedotjs, color: '#ffffff' },
  'Framer Motion': { icon: SiFramer, color: '#0055ff' },
  'Node.js': { icon: FaNodeJs, color: '#68a063' },
  SpringBoot: { icon: SiSpringboot, color: '#6db33f' },
  Express: { icon: SiExpress, color: '#ffffff' },
  Flask: { icon: SiFlask, color: '#ffffff' },
  GraphQL: { icon: SiGraphql, color: '#e10098' },
  MongoDB: { icon: SiMongodb, color: '#47a248' },
  PostgreSQL: { icon: SiPostgresql, color: '#4169e1' },
  MySQL: { icon: SiMysql, color: '#4479a1' },
  Redis: { icon: SiRedis, color: '#dc382d' },
  Git: { icon: FaGitAlt, color: '#f05032' },
  Docker: { icon: FaDocker, color: '#2496ed' },
  AWS: { icon: FaAws, color: '#ff9900' },
  Linux: { icon: FaLinux, color: '#fcc624' },
  Postman: { icon: SiPostman, color: '#ff6c37' },
  PowerBI: { icon: SiPowerbi, color: '#f2c811' },
  Tableau: { icon: SiTableau, color: '#e97627' },
}

export default function Skills() {
  return (
    <Section id="skills" index="01" title="Skills" subtitle="Tools and technologies I work with.">
      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.08 }}
      >
        {skills.map((group) => (
          <Card key={group.id} accent="signal">
            <h3 className="mb-4 font-display text-lg text-ink">{group.group}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((tag) => {
                const skill = skillIcons[tag] || { icon: FaCode, color: '#9aa7c7' }
                const Icon = skill.icon

                return (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-md border border-navyLine bg-navyDeep px-3 py-1 font-mono text-xs text-mist"
                  >
                    <Icon aria-hidden="true" className="text-xl" style={{ color: skill.color }} />
                    {tag}
                  </span>
                )
              })}
            </div>
          </Card>
        ))}
      </motion.div>
    </Section>
  )
}
