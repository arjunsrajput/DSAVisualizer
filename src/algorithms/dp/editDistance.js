export const editDistanceCode = [
  'function editDistance(a, b) {',
  '  let dp = Array(a.length + 1).fill().map(() => Array(b.length + 1).fill(0));',
  '  for (let i = 0; i <= a.length; i++) dp[i][0] = i;',
  '  for (let j = 0; j <= b.length; j++) dp[0][j] = j;',
  '  for (let i = 1; i <= a.length; i++) {',
  '    for (let j = 1; j <= b.length; j++) {',
  '      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];',
  '      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);',
  '    }',
  '  }',
  '  return dp[a.length][b.length];',
  '}',
]

const cloneTable = (table) => table.map(row => [...row])

export function generateEditDistanceSteps(a = 'horse', b = 'ros') {
  const source = String(a || '').toLowerCase().replace(/[^a-z]/g, '').slice(0, 10) || 'horse'
  const target = String(b || '').toLowerCase().replace(/[^a-z]/g, '').slice(0, 10) || 'ros'
  const table = Array.from({ length: source.length + 1 }, () => Array(target.length + 1).fill(0))
  const steps = []

  const snap = (activeCell, comparingCells, activeLine, description) => {
    steps.push({
      table: cloneTable(table),
      rowLabels: ['-', ...source.split('')],
      colLabels: ['-', ...target.split('')],
      activeCell,
      comparingCells,
      activeLine,
      description,
      result: table[source.length][target.length],
      stringA: source,
      stringB: target,
    })
  }

  snap(null, [], 0, `Convert "${source}" into "${target}" with minimum insert/delete/replace operations.`)

  for (let i = 0; i <= source.length; i++) {
    table[i][0] = i
    snap([i, 0], [], 2, `Base case: converting first ${i} source chars to empty target needs ${i} deletions.`)
  }
  for (let j = 0; j <= target.length; j++) {
    table[0][j] = j
    snap([0, j], [], 3, `Base case: converting empty source to first ${j} target chars needs ${j} insertions.`)
  }

  for (let i = 1; i <= source.length; i++) {
    for (let j = 1; j <= target.length; j++) {
      const same = source[i - 1] === target[j - 1]
      snap([i, j], [], 5, `Compare '${source[i - 1]}' with '${target[j - 1]}'.`)
      if (same) {
        table[i][j] = table[i - 1][j - 1]
        snap([i, j], [[i - 1, j - 1]], 6, `Characters match. Copy diagonal value ${table[i][j]}.`)
      } else {
        const del = table[i - 1][j]
        const ins = table[i][j - 1]
        const rep = table[i - 1][j - 1]
        table[i][j] = 1 + Math.min(del, ins, rep)
        snap([i, j], [[i - 1, j], [i, j - 1], [i - 1, j - 1]], 7, `Mismatch. 1 + min(delete=${del}, insert=${ins}, replace=${rep}) = ${table[i][j]}.`)
      }
    }
  }

  snap([source.length, target.length], [], 10, `Edit distance = ${table[source.length][target.length]}.`)
  return steps
}
