export const coinChangeCode = [
  'function coinChange(coins, amount) {',
  '  let dp = Array(amount + 1).fill(Infinity);',
  '  dp[0] = 0;',
  '  for (let a = 1; a <= amount; a++) {',
  '    for (let coin of coins) {',
  '      if (coin <= a)',
  '        dp[a] = Math.min(dp[a], 1 + dp[a - coin]);',
  '    }',
  '  }',
  '  return dp[amount] === Infinity ? -1 : dp[amount];',
  '}',
]

export function generateCoinChangeSteps(coins = [1, 3, 4], amount = 6) {
  const safeCoins = [...new Set(coins.filter(n => Number.isInteger(n) && n > 0))].sort((a, b) => a - b).slice(0, 8)
  const target = Math.max(0, Math.min(40, Number.isInteger(amount) ? amount : 6))
  const dp = Array(target + 1).fill(Infinity)
  const choice = Array(target + 1).fill(null)
  const steps = []

  const snap = (activeIndex, comparing, activeCoin, activeLine, description) => {
    steps.push({
      dp: [...dp],
      choice: [...choice],
      activeIndex,
      comparing,
      activeCoin,
      activeLine,
      description,
      result: dp[target] === Infinity ? -1 : dp[target],
      coins: safeCoins,
      amount: target,
    })
  }

  snap(null, [], null, 0, `Find the minimum coins needed for amount ${target}.`)
  dp[0] = 0
  snap(0, [], null, 2, 'Base case: amount 0 needs 0 coins.')

  for (let a = 1; a <= target; a++) {
    snap(a, [], null, 3, `Compute dp[${a}], the minimum coins needed for amount ${a}.`)
    for (const coin of safeCoins) {
      if (coin <= a) {
        const prev = a - coin
        const candidate = dp[prev] === Infinity ? Infinity : 1 + dp[prev]
        snap(a, [prev], coin, 5, `Try coin ${coin}: 1 + dp[${prev}] = ${candidate === Infinity ? '∞' : candidate}.`)
        if (candidate < dp[a]) {
          dp[a] = candidate
          choice[a] = coin
          snap(a, [prev], coin, 6, `Best for amount ${a} improves to ${candidate} using coin ${coin}.`)
        } else {
          snap(a, [prev], coin, 6, `Coin ${coin} does not improve amount ${a}.`)
        }
      } else {
        snap(a, [], coin, 5, `Coin ${coin} is larger than amount ${a}, skip it.`)
      }
    }
  }

  snap(target, [], choice[target], 9, dp[target] === Infinity ? `Amount ${target} cannot be formed.` : `Minimum coins for ${target} = ${dp[target]}.`)
  return steps
}
