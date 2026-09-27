export const fibonacciCode = [
  'function fibonacci(n) {',
  '  let dp = Array(n + 1).fill(0);',
  '  dp[0] = 0;',
  '  dp[1] = 1;',
  '  for (let i = 2; i <= n; i++) {',
  '    dp[i] = dp[i - 1] + dp[i - 2];',
  '  }',
  '  return dp[n];',
  '}',
]

export function generateFibonacciSteps(n = 8) {
  const limit = Math.max(0, Math.min(20, Number.isInteger(n) ? n : 8))
  const dp = Array(limit + 1).fill(null)
  const steps = []

  const snap = (activeIndex, comparing, activeLine, description) => {
    steps.push({
      dp: [...dp],
      activeIndex,
      comparing,
      activeLine,
      description,
      result: dp[limit],
    })
  }

  snap(null, [], 0, `Build a DP array where dp[i] stores Fibonacci(${limit}).`)

  if (limit >= 0) {
    dp[0] = 0
    snap(0, [], 2, 'Base case: dp[0] = 0')
  }

  if (limit >= 1) {
    dp[1] = 1
    snap(1, [], 3, 'Base case: dp[1] = 1')
  }

  for (let i = 2; i <= limit; i++) {
    snap(i, [i - 1, i - 2], 4, `Compute dp[${i}] using the two solved subproblems.`)
    dp[i] = dp[i - 1] + dp[i - 2]
    snap(i, [i - 1, i - 2], 5, `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`)
  }

  snap(limit, [], 7, `Fibonacci(${limit}) = ${dp[limit]}`)
  return steps
}
