export const knapsackCode = [
  'function knapsack(weights, values, capacity) {',
  '  let n = weights.length;',
  '  let dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));',
  '  for (let i = 1; i <= n; i++) {',
  '    for (let w = 0; w <= capacity; w++) {',
  '      dp[i][w] = dp[i - 1][w];',
  '      if (weights[i - 1] <= w) {',
  '        dp[i][w] = Math.max(dp[i][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);',
  '      }',
  '    }',
  '  }',
  '  return dp[n][capacity];',
  '}',
]

export const DEFAULT_KNAPSACK_ITEMS = [
  { weight: 2, value: 12 },
  { weight: 1, value: 10 },
  { weight: 3, value: 20 },
  { weight: 2, value: 15 },
]

function cloneTable(table) {
  return table.map(row => [...row])
}

export function generateKnapsackSteps(items = DEFAULT_KNAPSACK_ITEMS, capacity = 5) {
  const safeItems = items
    .filter(item => Number.isInteger(item.weight) && Number.isInteger(item.value) && item.weight > 0 && item.value >= 0)
    .slice(0, 8)
  const safeCapacity = Math.max(0, Math.min(20, Number.isInteger(capacity) ? capacity : 5))
  const rows = safeItems.length + 1
  const cols = safeCapacity + 1
  const table = Array.from({ length: rows }, () => Array(cols).fill(0))
  const decisions = Array.from({ length: rows }, () => Array(cols).fill(''))
  const steps = []

  const snap = (activeCell, comparingCells, activeLine, description) => {
    steps.push({
      table: cloneTable(table),
      decisions: cloneTable(decisions),
      rowLabels: ['none', ...safeItems.map((item, idx) => `item ${idx + 1}`)],
      colLabels: Array.from({ length: cols }, (_, idx) => idx),
      activeCell,
      comparingCells,
      activeLine,
      description,
      result: table[safeItems.length][safeCapacity],
      items: safeItems,
      capacity: safeCapacity,
    })
  }

  snap(null, [], 0, `Create a table with ${rows} rows and ${cols} capacities. Row i means using the first i items.`)

  for (let i = 1; i <= safeItems.length; i++) {
    const item = safeItems[i - 1]
    snap([i, 0], [], 3, `Consider item ${i}: weight=${item.weight}, value=${item.value}.`)

    for (let w = 0; w <= safeCapacity; w++) {
      const skip = table[i - 1][w]
      table[i][w] = skip
      decisions[i][w] = 'skip'
      snap([i, w], [[i - 1, w]], 5, `Capacity ${w}: start by skipping item ${i}, so value stays ${skip}.`)

      if (item.weight <= w) {
        const take = item.value + table[i - 1][w - item.weight]
        snap([i, w], [[i - 1, w], [i - 1, w - item.weight]], 6, `Item fits. Compare skip=${skip} with take=${item.value}+dp[${i - 1}][${w - item.weight}]=${take}.`)
        if (take > skip) {
          table[i][w] = take
          decisions[i][w] = 'take'
          snap([i, w], [[i - 1, w - item.weight]], 7, `Take item ${i}. dp[${i}][${w}] becomes ${take}.`)
        } else {
          snap([i, w], [[i - 1, w]], 7, `Skipping is at least as good. dp[${i}][${w}] remains ${skip}.`)
        }
      } else {
        snap([i, w], [[i - 1, w]], 6, `Item weight ${item.weight} is larger than capacity ${w}, so it cannot be taken.`)
      }
    }
  }

  snap([safeItems.length, safeCapacity], [], 11, `Best value for capacity ${safeCapacity} is ${table[safeItems.length][safeCapacity]}.`)
  return steps
}
