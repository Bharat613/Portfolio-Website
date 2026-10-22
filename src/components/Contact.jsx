import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiSend } from 'react-icons/fi'
import Section from './Section'
import SocialLinks from './SocialLinks'
import { profile } from '../data/profile'

// ─────────────────────────────────────────────────────────────
// These three values come from your EmailJS account (free tier
// works fine). See README.md → "Contact form" for the 5-minute
// setup. Until you fill these in, the form will show an error —
// people can still reach you via the email/phone links below it.
// ─────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: profile.email,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <Section
      id="contact"
      index="08"
      title="Contact Me"
      subtitle="Have a project in mind, or just want to say hi? My inbox is open."
    >
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-4 rounded-lg border border-navyLine bg-abyss/70 p-5 transition-colors hover:border-signal/50"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navyDeep text-signal">
              <FiMail size={18} />
            </span>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-faint">Email</p>
              <p className="text-sm text-ink">{profile.email}</p>
            </div>
          </a>

          <a
            href={`tel:${profile.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-4 rounded-lg border border-navyLine bg-abyss/70 p-5 transition-colors hover:border-signal/50"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navyDeep text-cyanPulse">
              <FiPhone size={18} />
            </span>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-faint">Phone</p>
              <p className="text-sm text-ink">{profile.phone}</p>
            </div>
          </a>

          <div className="pt-2">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-faint">
              Find me elsewhere
            </p>
            <SocialLinks />
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg border border-navyLine bg-abyss/70 p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-mist">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="rounded-md border border-navyLine bg-navyDeep px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-signal"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-mist">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="rounded-md border border-navyLine bg-navyDeep px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-signal"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-mist">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="resize-none rounded-md border border-navyLine bg-navyDeep px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-signal"
              placeholder="What's on your mind?"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-6 flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-mono text-xs uppercase tracking-widest text-white shadow-glow transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            <FiSend />
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>

          {status === 'sent' && (
            <p className="mt-4 font-mono text-xs text-cyanPulse">
              Sent — thanks for reaching out, I'll reply soon.
            </p>
          )}
          {status === 'error' && (
            <p className="mt-4 font-mono text-xs text-red-400">
              The form isn't connected to an email service yet — email me directly at{' '}
              <a className="underline" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>{' '}
              instead. (See README.md → "Contact form" to finish setup.)
            </p>
          )}
        </motion.form>
      </div>
    </Section>
  )
}
