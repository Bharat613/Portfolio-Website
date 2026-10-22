import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="relative mx-auto max-w-6xl px-6 py-10 sm:px-10">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-navyLine pt-8 sm:flex-row">
        <p className="font-mono text-xs text-faint">
          © {new Date().getFullYear()} {profile.name}. Built with React &amp; Three.js.
        </p>
        <a
          href="#intro"
          className="font-mono text-xs uppercase tracking-widest text-mist hover:text-signal"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
