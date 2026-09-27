import { useEffect, useMemo, useState } from 'react'
import { CalendarDays, Clock, ExternalLink, RefreshCw, Timer } from 'lucide-react'
import { CONTEST_PLATFORMS, fetchUpcomingContests } from '../services/contestService'

const PLATFORM_STYLES = {
  Codeforces: 'text-blue-300 bg-blue-900/20 border-blue-800/50',
  LeetCode: 'text-amber-300 bg-amber-900/20 border-amber-800/50',
  CodeChef: 'text-rose-300 bg-rose-900/20 border-rose-800/50',
  AtCoder: 'text-emerald-300 bg-emerald-900/20 border-emerald-800/50',
}

const PLATFORM_LOGOS = {
  Codeforces: 'https://codeforces.com/favicon.ico',
  LeetCode: 'https://leetcode.com/favicon.ico',
  CodeChef: 'https://www.codechef.com/favicon.ico',
  AtCoder: 'https://img.atcoder.jp/assets/favicon.png',
}

function PlatformLogo({ platform, className = 'h-5 w-5' }) {
  const logoUrl = PLATFORM_LOGOS[platform]

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt=""
        className={`${className} object-contain`}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.display = 'none'
        }}
      />
    )
  }

  return (
    <span className={`inline-flex items-center justify-center rounded-full bg-gray-700 text-gray-300 font-bold ${className}`} aria-hidden="true">
      <span className="text-[10px] leading-none">?</span>
    </span>
  )
}

function formatDateTime(value) {
  if (!value) return 'Time unavailable'

  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(new Date(value))
}

function formatDuration(seconds) {
  if (!seconds) return 'Duration unavailable'

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const parts = []

  if (hours) parts.push(`${hours}h`)
  if (minutes) parts.push(`${minutes}m`)

  return parts.join(' ') || `${seconds}s`
}

function formatCountdown(startTime, status) {
  if (status === 'ongoing') return 'Live now'

  const diff = new Date(startTime).getTime() - Date.now()
  if (Number.isNaN(diff)) return 'Start unavailable'
  if (diff <= 0) return 'Starting soon'

  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)

  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${Math.max(minutes, 1)}m`
}

function ContestSkeleton() {
  return (
    <div className="panel p-4 animate-pulse">
      <div className="h-4 w-28 rounded bg-gray-800 mb-4" />
      <div className="h-5 w-3/4 rounded bg-gray-800 mb-5" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="h-10 rounded bg-gray-800" />
        <div className="h-10 rounded bg-gray-800" />
        <div className="h-10 rounded bg-gray-800" />
      </div>
    </div>
  )
}

export default function ContestsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [contests, setContests] = useState([])
  const [failures, setFailures] = useState([])
  const [lastUpdated, setLastUpdated] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadContests = async () => {
    setLoading(true)
    setError('')

    try {
      const result = await fetchUpcomingContests()
      setContests(result.contests)
      setFailures(result.failures)
      setLastUpdated(result.lastUpdated)

      if (!result.contests.length && result.failures.length) {
        setError('Contest data could not be loaded right now.')
      }
    } catch (err) {
      setError(err?.message || 'Contest data could not be loaded right now.')
      setContests([])
      setFailures([])
      setLastUpdated(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContests()
  }, [])

  const filteredContests = useMemo(() => {
    if (selectedPlatform === 'all') return contests
    return contests.filter((contest) => contest.platformId === selectedPlatform)
  }, [contests, selectedPlatform])

  const ongoingCount = contests.filter((contest) => contest.status === 'ongoing').length
  const upcomingCount = contests.filter((contest) => contest.status === 'upcoming').length

  return (
    <div className="min-h-screen pt-14 bg-gray-950">
      <div className="border-b border-gray-800 bg-gray-950">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="font-mono text-cyan-400 text-xs tracking-widest mb-3">CONTEST TRACKER</div>
              <h1 className="text-4xl font-bold text-white font-display mb-3">Upcoming Contests</h1>
              <p className="text-gray-400 max-w-2xl">
                Live schedule from competitive programming platforms, sorted by nearest start time.
              </p>
            </div>

            <div className="flex gap-3 text-sm font-mono">
              <div className="panel px-4 py-3">
                <div className="text-2xl font-bold text-cyan-400">{upcomingCount}</div>
                <div className="text-gray-500">upcoming</div>
              </div>
              <div className="panel px-4 py-3">
                <div className="text-2xl font-bold text-emerald-400">{ongoingCount}</div>
                <div className="text-gray-500">ongoing</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedPlatform('all')}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                selectedPlatform === 'all'
                  ? 'bg-cyan-700/50 border-cyan-600 text-cyan-200'
                  : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700'
              }`}
            >
              All
            </button>
            {CONTEST_PLATFORMS.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  selectedPlatform === platform.id
                    ? 'bg-cyan-700/50 border-cyan-600 text-cyan-200'
                    : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <PlatformLogo platform={platform.name} className="h-4 w-4" />
                  {platform.name}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-xs text-gray-500">
                Updated {formatDateTime(lastUpdated)}
              </span>
            )}
            <button onClick={loadContests} disabled={loading} className="btn-ghost flex items-center gap-2">
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {failures.length > 0 && (
          <div className="mb-5 rounded-lg border border-amber-800/40 bg-amber-900/20 px-4 py-3 text-sm text-amber-300">
            Some platforms did not respond: {failures.map((failure) => failure.platform).join(', ')}.
          </div>
        )}

        {error && (
          <div className="panel px-5 py-8 text-center">
            <p className="text-rose-300 mb-4">{error}</p>
            <button onClick={loadContests} className="btn-primary inline-flex items-center gap-2">
              <RefreshCw size={14} />
              Try again
            </button>
          </div>
        )}

        {!error && loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <ContestSkeleton key={index} />
            ))}
          </div>
        )}

        {!error && !loading && filteredContests.length === 0 && (
          <div className="panel px-5 py-10 text-center">
            <CalendarDays className="mx-auto mb-3 text-gray-500" size={32} />
            <h2 className="text-white font-semibold mb-1">No contests found</h2>
            <p className="text-gray-400 text-sm">Try another platform filter or refresh the schedule.</p>
          </div>
        )}

        {!error && !loading && filteredContests.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredContests.map((contest) => (
              <article key={contest.id} className="panel p-4 hover:border-cyan-700 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black bg-white p-1">
                      <PlatformLogo platform={contest.platform} />
                    </span>
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-mono ${PLATFORM_STYLES[contest.platform] || 'text-gray-300 bg-gray-800 border-gray-700'}`}>
                      {contest.platform}
                    </span>
                  </div>
                  <span className={`rounded-full border px-2.5 py-1 text-xs font-mono ${
                    contest.status === 'ongoing'
                      ? 'text-emerald-300 bg-emerald-900/20 border-emerald-800/50'
                      : 'text-cyan-300 bg-cyan-900/20 border-cyan-800/50'
                  }`}>
                    {contest.status}
                  </span>
                </div>

                <h2 className="text-white font-semibold leading-snug mb-5">{contest.name}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                  <div className="rounded-lg border border-gray-800 bg-gray-900/30 p-3">
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                      <CalendarDays size={14} />
                      Starts
                    </div>
                    <div className="text-sm text-gray-200">{formatDateTime(contest.startTime)}</div>
                  </div>
                  <div className="rounded-lg border border-gray-800 bg-gray-900/30 p-3">
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                      <Clock size={14} />
                      Duration
                    </div>
                    <div className="text-sm text-gray-200">{formatDuration(contest.durationSeconds)}</div>
                  </div>
                  <div className="rounded-lg border border-gray-800 bg-gray-900/30 p-3">
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                      <Timer size={14} />
                      Countdown
                    </div>
                    <div className="text-sm text-gray-200">{formatCountdown(contest.startTime, contest.status)}</div>
                  </div>
                </div>

                <a
                  href={contest.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Visit Contest
                  <ExternalLink size={14} />
                </a>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
