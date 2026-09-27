import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'

function formatValue(value) {
  if (value === Infinity) return '∞'
  if (value === null || value === undefined) return '?'
  return value
}

export default function OneDDPVisualizer({ step, mode = 'coin' }) {
  const { speedMs } = usePlayerStore()
  const dur = Math.min(0.35, speedMs / 1500)
  if (!step) return null

  const { dp = [], array = [], activeIndex, comparing = [], activeCoin, accepted, coins = [], amount, result } = step
  const title = mode === 'lis' ? 'LIS DP Array' : 'Coin Change DP Array'

  return (
    <div className="panel p-4 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">{title}</div>
        <div className="text-xs font-mono text-emerald-300">Result: {formatValue(result)}</div>
      </div>

      {mode === 'coin' && (
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="rounded border border-gray-800 bg-gray-800/40 px-2 py-1 text-gray-400">Amount: {amount}</span>
          {coins.map(coin => (
            <span key={coin} className={`rounded border px-2 py-1 ${coin === activeCoin ? 'border-amber-700 bg-amber-900/30 text-amber-300' : 'border-cyan-800 bg-cyan-900/20 text-cyan-300'}`}>
              coin {coin}
            </span>
          ))}
        </div>
      )}

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          {dp.map((value, idx) => {
            const active = activeIndex === idx
            const dependency = comparing.includes(idx)
            const sourceValue = array[idx]

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                {mode === 'lis' && <div className="text-[11px] text-gray-400 font-mono">num {sourceValue}</div>}
                <motion.div
                  animate={{
                    scale: active ? 1.08 : 1,
                    backgroundColor: active ? '#f59e0b' : dependency ? '#0e7490' : accepted && dependency ? '#065f46' : '#1e293b',
                    borderColor: active ? '#fbbf24' : dependency ? '#22d3ee' : '#475569',
                  }}
                  transition={{ duration: dur }}
                  className="w-14 h-14 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                >
                  {formatValue(value)}
                </motion.div>
                <div className="text-[11px] text-gray-500 font-mono">dp[{idx}]</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
        <div className="rounded border border-amber-800 bg-amber-900/20 px-3 py-2 text-amber-300">Current state</div>
        <div className="rounded border border-cyan-800 bg-cyan-900/20 px-3 py-2 text-cyan-300">Referenced state</div>
        <div className="rounded border border-emerald-800 bg-emerald-900/20 px-3 py-2 text-emerald-300">Stored answer</div>
      </div>
    </div>
  )
}
