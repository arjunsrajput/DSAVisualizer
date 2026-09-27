const KONTESTS_API_URL = 'https://kontests.net/api/v1/all'
const CODEFORCES_API_URL = 'https://codeforces.com/api/contest.list'
const LOCAL_CONTESTS_API_URL = '/api/contests'
const REQUEST_TIMEOUT_MS = 4000

export const CONTEST_PLATFORMS = [
  { id: 'codeforces', name: 'Codeforces', endpoint: 'codeforces' },
  { id: 'leetcode', name: 'LeetCode', endpoint: 'leetcode' },
  { id: 'codechef', name: 'CodeChef', endpoint: 'codechef' },
  { id: 'atcoder', name: 'AtCoder', endpoint: 'atcoder' },
]

const PLATFORM_ALIASES = {
  codeforces: 'Codeforces',
  leetcode: 'LeetCode',
  codechef: 'CodeChef',
  atcoder: 'AtCoder',
}

function getContestStatus(startTime, endTime) {
  const now = Date.now()
  const start = new Date(startTime).getTime()
  const end = new Date(endTime).getTime()

  if (Number.isNaN(start) || Number.isNaN(end)) return 'unknown'
  if (now >= start && now <= end) return 'ongoing'
  return now < start ? 'upcoming' : 'ended'
}

function normalizePlatformName(platform = '') {
  const normalized = String(platform).toLowerCase().replace(/[^a-z]/g, '')
  const alias = PLATFORM_ALIASES[normalized]
  const match = CONTEST_PLATFORMS.find((item) => item.name === alias)

  return match?.name || platform || 'Unknown'
}

function getPlatformId(platformName) {
  return CONTEST_PLATFORMS.find((platform) => platform.name === platformName)?.id || 'other'
}

function parseDuration(value) {
  if (typeof value === 'number') return value
  if (!value) return 0

  const parts = String(value).split(':').map(Number)
  if (parts.some(Number.isNaN)) return 0
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
  if (parts.length === 2) return parts[0] * 60 + parts[1]

  return Number(value) || 0
}

function normalizeContest(contest, fallbackPlatform) {
  const startTime = contest.startTime || contest.start_time
  const endTime = contest.endTime || contest.end_time
  const title = contest.title || contest.name || 'Untitled Contest'
  const platformName = normalizePlatformName(contest.platform || contest.site || fallbackPlatform?.name)

  return {
    id: `${getPlatformId(platformName)}-${title}-${startTime}`,
    name: title,
    platform: platformName,
    platformId: getPlatformId(platformName),
    startTime,
    endTime,
    durationSeconds: parseDuration(contest.duration || contest.durationSeconds),
    url: contest.url,
    status: getContestStatus(startTime, endTime),
  }
}

function normalizeCodeforcesContest(contest) {
  const startTime = new Date(contest.startTimeSeconds * 1000).toISOString()
  const endTime = new Date((contest.startTimeSeconds + contest.durationSeconds) * 1000).toISOString()

  return normalizeContest({
    title: contest.name,
    url: `https://codeforces.com/contest/${contest.id}`,
    startTime,
    endTime,
    durationSeconds: contest.durationSeconds,
    platform: 'Codeforces',
  })
}

async function fetchWithTimeout(url) {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(url, { signal: controller.signal })
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    return response.json()
  } finally {
    window.clearTimeout(timeoutId)
  }
}

async function fetchKontestsContests() {
  const payload = await fetchWithTimeout(KONTESTS_API_URL)
  const contests = Array.isArray(payload) ? payload : []
  const supportedPlatforms = new Set(CONTEST_PLATFORMS.map((platform) => platform.name))

  return {
    source: 'Kontests',
    contests: contests
      .map((contest) => normalizeContest(contest))
      .filter((contest) => supportedPlatforms.has(contest.platform)),
    lastUpdated: new Date().toISOString(),
  }
}

async function fetchCodeforcesContests() {
  const payload = await fetchWithTimeout(CODEFORCES_API_URL)
  const contests = Array.isArray(payload?.result) ? payload.result : []

  if (payload?.status !== 'OK') {
    throw new Error('Codeforces API returned an error')
  }

  return {
    source: 'Codeforces',
    contests: contests
      .filter((contest) => contest.phase === 'BEFORE' || contest.phase === 'CODING')
      .map(normalizeCodeforcesContest),
    lastUpdated: new Date().toISOString(),
  }
}

export async function fetchUpcomingContests() {
  try {
    return await fetchWithTimeout(LOCAL_CONTESTS_API_URL)
  } catch {
    // Static builds do not have the Vite middleware. Fall back to browser-safe sources.
  }

  const results = await Promise.allSettled([
    fetchKontestsContests(),
    fetchCodeforcesContests(),
  ])
  const contests = []
  const failures = []
  const lastUpdatedValues = []

  results.forEach((result, index) => {
    const source = index === 0 ? 'Kontests' : 'Codeforces'

    if (result.status === 'fulfilled') {
      contests.push(...result.value.contests)
      if (result.value.lastUpdated) lastUpdatedValues.push(result.value.lastUpdated)
    } else {
      failures.push({
        platform: source,
        message: result.reason?.name === 'AbortError'
          ? 'Request timed out'
          : result.reason?.message || 'Unable to fetch contests',
      })
    }
  })

  return {
    contests: Array.from(new Map(contests.map((contest) => [contest.id, contest])).values())
      .filter((contest) => contest.status === 'upcoming' || contest.status === 'ongoing')
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()),
    failures,
    lastUpdated: lastUpdatedValues.sort().at(-1) || null,
  }
}
