import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'

function sameCell(a, b) {
  return Array.isArray(a) && Array.isArray(b) && a[0] === b[0] && a[1] === b[1]
}

export default function GridDPVisualizer({ step }) {
  const { speedMs } = usePlayerStore()
  const dur = Math.min(0.35, speedMs / 1500)
  if (!step) return null

  const { grid = [], table = [], activeCell, comparingCells = [], result } = step

  return (
    <div className="panel p-4 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">Minimum Path Sum Grid</div>
        <div className="text-xs font-mono text-emerald-300">Result: {result ?? '-'}</div>
      </div>

      <div className="overflow-auto pb-2">
        <div className="inline-grid gap-2" style={{ gridTemplateColumns: `repeat(${grid[0]?.length || 1}, minmax(64px, 64px))` }}>
          {grid.flatMap((row, r) => row.map((cost, c) => {
            const cell = [r, c]
            const active = sameCell(activeCell, cell)
            const comparing = comparingCells.some(other => sameCell(other, cell))
            const solved = table[r]?.[c] !== null && table[r]?.[c] !== undefined

            return (
              <motion.div
                key={`${r}-${c}`}
                animate={{
                  scale: active ? 1.07 : 1,
                  backgroundColor: active ? '#f59e0b' : comparing ? '#0e7490' : solved ? '#1e293b' : '#111827',
                  borderColor: active ? '#fbbf24' : comparing ? '#22d3ee' : solved ? '#475569' : '#374151',
                }}
                transition={{ duration: dur }}
                className="h-16 rounded-lg border-2 flex flex-col items-center justify-center font-mono"
              >
                <span className="text-[10px] text-gray-400">cost {cost}</span>
                <span className="text-sm font-bold text-white">dp {table[r]?.[c] ?? '?'}</span>
              </motion.div>
            )
          }))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
        <div className="rounded border border-amber-800 bg-amber-900/20 px-3 py-2 text-amber-300">Current cell</div>
        <div className="rounded border border-cyan-800 bg-cyan-900/20 px-3 py-2 text-cyan-300">Top/left candidate</div>
        <div className="rounded border border-gray-800 bg-gray-800/40 px-3 py-2 text-gray-400">Cell shows original cost and DP cost</div>
      </div>
    </div>
  )
}
