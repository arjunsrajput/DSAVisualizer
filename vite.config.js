import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const CODEFORCES_API_URL = 'https://codeforces.com/api/contest.list'
const LEETCODE_API_URL = 'https://leetcode.com/graphql'
const CODECHEF_API_URL = 'https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all'
const ATCODER_CONTESTS_URL = 'https://atcoder.jp/contests/'

function getStatus(startTime, endTime) {
  const now = Date.now()
  const start = new Date(startTime).getTime()
  const end = new Date(endTime).getTime()

  if (now >= start && now <= end) return 'ongoing'
  return now < start ? 'upcoming' : 'ended'
}

function createContest({ id, name, platform, startTime, endTime, durationSeconds, url }) {
  const platformId = platform.toLowerCase()

  return {
    id: `${platformId}-${id}`,
    name,
    platform,
    platformId,
    startTime,
    endTime,
    durationSeconds,
    url,
    status: getStatus(startTime, endTime),
  }
}

async function fetchJson(url, options) {
  const response = await fetch(url, {
    headers: {
      'accept': 'application/json,text/html,*/*',
      'user-agent': 'Mozilla/5.0 AlgoViz contest tracker',
      ...(options?.headers || {}),
    },
    ...options,
  })

  if (!response.ok) throw new Error(`${url} returned ${response.status}`)
  return response.json()
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      'accept': 'text/html,*/*',
      'user-agent': 'Mozilla/5.0 AlgoViz contest tracker',
    },
  })

  if (!response.ok) throw new Error(`${url} returned ${response.status}`)
  return response.text()
}

async function fetchCodeforcesContests() {
  const payload = await fetchJson(CODEFORCES_API_URL)
  const contests = Array.isArray(payload?.result) ? payload.result : []

  return contests
    .filter((contest) => contest.phase === 'BEFORE' || contest.phase === 'CODING')
    .map((contest) => {
      const startTime = new Date(contest.startTimeSeconds * 1000).toISOString()
      const endTime = new Date((contest.startTimeSeconds + contest.durationSeconds) * 1000).toISOString()

      return createContest({
        id: contest.id,
        name: contest.name,
        platform: 'Codeforces',
        startTime,
        endTime,
        durationSeconds: contest.durationSeconds,
        url: `https://codeforces.com/contest/${contest.id}`,
      })
    })
}

async function fetchLeetCodeContests() {
  const payload = await fetchJson(LEETCODE_API_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query: 'query upcomingContests { upcomingContests { title titleSlug startTime duration } }',
    }),
  })
  const contests = Array.isArray(payload?.data?.upcomingContests)
    ? payload.data.upcomingContests
    : []

  return contests.map((contest) => {
    const startTime = new Date(contest.startTime * 1000).toISOString()
    const endTime = new Date((contest.startTime + contest.duration) * 1000).toISOString()

    return createContest({
      id: contest.titleSlug,
      name: contest.title,
      platform: 'LeetCode',
      startTime,
      endTime,
      durationSeconds: contest.duration,
      url: `https://leetcode.com/contest/${contest.titleSlug}`,
    })
  })
}

async function fetchCodeChefContests() {
  const payload = await fetchJson(CODECHEF_API_URL)
  const contests = [
    ...(Array.isArray(payload?.present_contests) ? payload.present_contests : []),
    ...(Array.isArray(payload?.future_contests) ? payload.future_contests : []),
  ]

  return contests.map((contest) => {
    const startTime = new Date(contest.contest_start_date_iso).toISOString()
    const endTime = new Date(contest.contest_end_date_iso).toISOString()

    return createContest({
      id: contest.contest_code,
      name: contest.contest_name,
      platform: 'CodeChef',
      startTime,
      endTime,
      durationSeconds: Number(contest.contest_duration || 0) * 60,
      url: `https://www.codechef.com/${contest.contest_code}`,
    })
  })
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/<[^>]+>/g, '')
    .trim()
}

function parseDurationToSeconds(value) {
  const [hours = 0, minutes = 0] = value.split(':').map(Number)
  return ((hours || 0) * 60 + (minutes || 0)) * 60
}

async function fetchAtCoderContests() {
  const html = await fetchText(ATCODER_CONTESTS_URL)
  const section = html.match(/<div id="contest-table-upcoming">([\s\S]*?)<p class="text-center">/)
  if (!section) return []

  const rowPattern = /<tr>\s*<td[^>]*>[\s\S]*?<time[^>]*>([^<]+)<\/time>[\s\S]*?<td[^>]*>[\s\S]*?<a href="([^"]+)">([\s\S]*?)<\/a><\/td>\s*<td[^>]*>([^<]+)<\/td>/g
  const contests = []
  let match

  while ((match = rowPattern.exec(section[1])) !== null) {
    const [, rawStartTime, path, rawTitle, rawDuration] = match
    const startTime = new Date(rawStartTime).toISOString()
    const durationSeconds = parseDurationToSeconds(rawDuration.trim())
    const endTime = new Date(new Date(startTime).getTime() + durationSeconds * 1000).toISOString()
    const id = path.split('/').filter(Boolean).at(-1)

    contests.push(createContest({
      id,
      name: decodeHtml(rawTitle),
      platform: 'AtCoder',
      startTime,
      endTime,
      durationSeconds,
      url: `https://atcoder.jp${path}`,
    }))
  }

  return contests
}

function contestsApiPlugin() {
  return {
    name: 'contests-api',
    configureServer(server) {
      server.middlewares.use('/api/contests', async (_req, res) => {
        const sources = [
          ['Codeforces', fetchCodeforcesContests],
          ['LeetCode', fetchLeetCodeContests],
          ['CodeChef', fetchCodeChefContests],
          ['AtCoder', fetchAtCoderContests],
        ]

        const results = await Promise.allSettled(sources.map(([, fetcher]) => fetcher()))
        const failures = []
        const contests = []

        results.forEach((result, index) => {
          const [source] = sources[index]

          if (result.status === 'fulfilled') {
            contests.push(...result.value)
          } else {
            failures.push({
              platform: source,
              message: result.reason?.message || 'Unable to fetch contests',
            })
          }
        })

        const response = {
          contests: contests
            .filter((contest) => contest.status === 'upcoming' || contest.status === 'ongoing')
            .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()),
          failures,
          lastUpdated: new Date().toISOString(),
        }

        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify(response))
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), contestsApiPlugin()],
})
