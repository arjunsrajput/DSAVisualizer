export const minPathSumCode = [
  'function minPathSum(grid) {',
  '  let m = grid.length, n = grid[0].length;',
  '  let dp = Array(m).fill().map(() => Array(n).fill(0));',
  '  dp[0][0] = grid[0][0];',
  '  for (let i = 0; i < m; i++) {',
  '    for (let j = 0; j < n; j++) {',
  '      if (i === 0 && j === 0) continue;',
  '      let top = i > 0 ? dp[i - 1][j] : Infinity;',
  '      let left = j > 0 ? dp[i][j - 1] : Infinity;',
  '      dp[i][j] = grid[i][j] + Math.min(top, left);',
  '    }',
  '  }',
  '  return dp[m - 1][n - 1];',
  '}',
]

export const DEFAULT_MIN_PATH_GRID = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
]

const cloneTable = (table) => table.map(row => [...row])

export function generateMinPathSumSteps(grid = DEFAULT_MIN_PATH_GRID) {
  const safeGrid = grid
    .filter(row => Array.isArray(row) && row.length > 0)
    .slice(0, 8)
    .map(row => row.filter(Number.isFinite).map(n => Math.max(0, Math.min(99, Math.trunc(n)))).slice(0, 8))
    .filter(row => row.length > 0)
  const width = Math.min(...safeGrid.map(row => row.length))
  const normalized = safeGrid.map(row => row.slice(0, width))
  const rows = normalized.length
  const cols = width || 0
  const table = Array.from({ length: rows }, () => Array(cols).fill(null))
  const steps = []

  const snap = (activeCell, comparingCells, activeLine, description) => {
    steps.push({
      grid: cloneTable(normalized),
      table: cloneTable(table),
      rowLabels: Array.from({ length: rows }, (_, idx) => idx),
      colLabels: Array.from({ length: cols }, (_, idx) => idx),
      activeCell,
      comparingCells,
      activeLine,
      description,
      result: rows && cols ? table[rows - 1][cols - 1] : 0,
    })
  }

  if (!rows || !cols) {
    snap(null, [], 0, 'Add a numeric grid to compute minimum path sum.')
    return steps
  }

  snap(null, [], 0, 'Move only right or down. dp[r][c] stores the cheapest path cost to each cell.')

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r === 0 && c === 0) {
        table[r][c] = normalized[r][c]
        snap([r, c], [], 3, `Start cell cost is ${normalized[r][c]}.`)
        continue
      }

      const candidates = []
      if (r > 0) candidates.push([r - 1, c])
      if (c > 0) candidates.push([r, c - 1])
      const top = r > 0 ? table[r - 1][c] : Infinity
      const left = c > 0 ? table[r][c - 1] : Infinity
      table[r][c] = normalized[r][c] + Math.min(top, left)
      snap([r, c], candidates, 9, `Cell ${r},${c}: grid cost ${normalized[r][c]} + min(top=${top === Infinity ? '∞' : top}, left=${left === Infinity ? '∞' : left}) = ${table[r][c]}.`)
    }
  }

  snap([rows - 1, cols - 1], [], 12, `Minimum path sum = ${table[rows - 1][cols - 1]}.`)
  return steps
}
