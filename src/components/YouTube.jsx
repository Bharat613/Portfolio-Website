import { useEffect, useState } from 'react'
import { FiArrowUpRight, FiClock, FiEye, FiUsers } from 'react-icons/fi'
import { SiYoutube } from 'react-icons/si'
import Section from './Section'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || ''
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || ''
const WATCH_HOURS = import.meta.env.VITE_YOUTUBE_WATCH_HOURS || ''
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3'

function formatCount(value) {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value)
}

function formatExactCount(value) {
  return new Intl.NumberFormat('en-US').format(value)
}

export default function YouTube() {
  const [channel, setChannel] = useState(null)
  const [status, setStatus] = useState(API_KEY && CHANNEL_ID ? 'loading' : 'idle')

  useEffect(() => {
    if (!API_KEY || !CHANNEL_ID) return

    async function loadChannel() {
      try {
        const channelParams = new URLSearchParams({
          part: 'snippet,statistics',
          id: CHANNEL_ID,
          key: API_KEY,
        })
        const channelResponse = await fetch(`${YOUTUBE_API_URL}/channels?${channelParams}`)
        if (!channelResponse.ok) throw new Error('Unable to load YouTube channel')

        const channelData = await channelResponse.json()
        const channelItem = channelData.items?.[0]
        if (!channelItem) throw new Error('YouTube channel was not found')

        setChannel(channelItem)
        setStatus('ready')
      } catch (error) {
        console.error(error)
        setStatus('error')
      }
    }

    loadChannel()
  }, [])

  return (
    <Section
      id="youtube"
      index="07"
      title={
        <span className="inline-flex items-center gap-3">
          <SiYoutube className="text-red-500" aria-hidden="true" />
          On YouTube
        </span>
      }
      subtitle="I create and publish cinematic movie edits, memorable scenes, and creative fan-made video moments."
    >
      {status === 'loading' && (
        <div className="rounded-lg border border-navyLine bg-abyss/70 p-8 text-center font-mono text-xs uppercase tracking-widest text-mist">
          Loading channel...
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-lg border border-red-400/30 bg-abyss/70 p-8 text-center text-sm text-mist">
          YouTube is temporarily unavailable. Visit the channel directly to see the latest videos.
        </div>
      )}

      {status === 'idle' && (
        <div className="rounded-lg border border-navyLine bg-abyss/70 p-8 text-center text-sm text-mist">
          Add your YouTube API key and channel ID to load your channel metrics here.
        </div>
      )}

      {status === 'ready' && channel && (
        <div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <MetricCard icon={<FiEye />} label="Total views" value={formatExactCount(Number(channel.statistics.viewCount))} />
            <MetricCard icon={<FiUsers />} label="Subscribers" value={formatExactCount(Number(channel.statistics.subscriberCount))} />
            <MetricCard icon={<FiClock />} label="Watch hours" value={WATCH_HOURS ? formatCount(Number(WATCH_HOURS)) + 'K hours' : 'Add in .env'} />
          </div>
          <a
            href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-signal/60 px-4 py-2 font-mono text-xs uppercase tracking-widest text-signal transition-colors hover:bg-signal hover:text-white"
          >
            Visit channel <FiArrowUpRight />
          </a>
        </div>
      )}
    </Section>
  )
}

function MetricCard({ icon, label, value }) {
  return (
    <div className="rounded-lg border border-navyLine bg-abyss/70 p-6">
      <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-full border border-signal/40 text-signal">
        {icon}
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-mist">{label}</p>
      <p className="mt-2 font-display text-3xl text-ink">{value}</p>
    </div>
  )
}