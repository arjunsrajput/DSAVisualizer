export const lcsCode = [
  'function lcs(a, b) {',
  '  let dp = Array(a.length + 1).fill().map(() => Array(b.length + 1).fill(0));',
  '  for (let i = 1; i <= a.length; i++) {',
  '    for (let j = 1; j <= b.length; j++) {',
  '      if (a[i - 1] === b[j - 1])',
  '        dp[i][j] = 1 + dp[i - 1][j - 1];',
  '      else',
  '        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);',
  '    }',
  '  }',
  '  return dp[a.length][b.length];',
  '}',
]

function cloneTable(table) {
  return table.map(row => [...row])
}

export function generateLCSSteps(a = 'ABCDGH', b = 'AEDFHR') {
  const left = String(a || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 10) || 'ABCDGH'
  const top = String(b || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 10) || 'AEDFHR'
  const table = Array.from({ length: left.length + 1 }, () => Array(top.length + 1).fill(0))
  const steps = []

  const snap = (activeCell, comparingCells, matched, activeLine, description) => {
    steps.push({
      table: cloneTable(table),
      rowLabels: ['-', ...left.split('')],
      colLabels: ['-', ...top.split('')],
      activeCell,
      comparingCells,
      matched,
      activeLine,
      description,
      result: table[left.length][top.length],
      stringA: left,
      stringB: top,
    })
  }

  snap(null, [], false, 0, `Build an LCS table for "${left}" and "${top}". Each cell stores the best subsequence length so far.`)

  for (let i = 1; i <= left.length; i++) {
    for (let j = 1; j <= top.length; j++) {
      const charA = left[i - 1]
      const charB = top[j - 1]
      snap([i, j], [], charA === charB, 4, `Compare ${charA} from string A with ${charB} from string B.`)

      if (charA === charB) {
        table[i][j] = 1 + table[i - 1][j - 1]
        snap([i, j], [[i - 1, j - 1]], true, 5, `Match. Add 1 to the diagonal: dp[${i}][${j}] = ${table[i][j]}.`)
      } else {
        const up = table[i - 1][j]
        const leftVal = table[i][j - 1]
        table[i][j] = Math.max(up, leftVal)
        snap([i, j], [[i - 1, j], [i, j - 1]], false, 7, `No match. Keep the best of top=${up} and left=${leftVal}: dp[${i}][${j}] = ${table[i][j]}.`)
      }
    }
  }

  snap([left.length, top.length], [], false, 10, `LCS length is ${table[left.length][top.length]}.`)
  return steps
}
