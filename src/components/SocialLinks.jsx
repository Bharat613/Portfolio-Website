import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiCode } from 'react-icons/fi'
import { profile } from '../data/profile'

const ICONS = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
  instagram: FiInstagram,
  leetcode: FiCode,
}

export default function SocialLinks({ className = '' }) {
  const links = Object.entries(profile.socials).filter(([, url]) => url)

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {links.map(([key, url]) => {
        const Icon = ICONS[key] || FiCode
        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label={key}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-navyLine text-mist transition-all hover:-translate-y-0.5 hover:border-signal/60 hover:text-signal"
          >
            <Icon size={16} />
          </a>
        )
      })}
    </div>
  )
}
