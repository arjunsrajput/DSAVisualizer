import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'

function sameCell(a, b) {
  return Array.isArray(a) && Array.isArray(b) && a[0] === b[0] && a[1] === b[1]
}

export default function DPTableVisualizer({ step, mode = 'table' }) {
  const { speedMs } = usePlayerStore()
  const dur = Math.min(0.35, speedMs / 1500)
  if (!step) return null

  const {
    table = [],
    rowLabels = [],
    colLabels = [],
    activeCell,
    comparingCells = [],
    decisions = [],
    items = [],
    capacity,
    stringA,
    stringB,
    result,
  } = step

  const title = mode === 'lcs' ? 'LCS DP Table' : '0/1 Knapsack DP Table'

  return (
    <div className="panel p-4 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">{title}</div>
        <div className="text-xs font-mono text-emerald-300">Result: {result ?? '-'}</div>
      </div>

      {mode === 'knapsack' && (
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="rounded border border-gray-800 bg-gray-800/40 px-2 py-1 text-gray-400">Capacity: {capacity}</span>
          {items.map((item, idx) => (
            <span key={idx} className="rounded border border-cyan-800 bg-cyan-900/20 px-2 py-1 text-cyan-300">
              item {idx + 1}: w={item.weight}, v={item.value}
            </span>
          ))}
        </div>
      )}

      {mode === 'lcs' && (
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="rounded border border-cyan-800 bg-cyan-900/20 px-2 py-1 text-cyan-300">A: {stringA}</span>
          <span className="rounded border border-amber-800 bg-amber-900/20 px-2 py-1 text-amber-300">B: {stringB}</span>
        </div>
      )}

      <div className="overflow-auto pb-2">
        <table className="border-separate border-spacing-1 min-w-max">
          <thead>
            <tr>
              <th className="w-16 h-9 text-[11px] text-gray-600 font-mono">{mode === 'knapsack' ? 'item/cap' : 'A/B'}</th>
              {colLabels.map((label, idx) => (
                <th key={idx} className="w-12 h-9 rounded bg-gray-800 text-xs text-gray-400 font-mono">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.map((row, rowIdx) => (
              <tr key={rowIdx}>
                <th className="w-16 h-12 rounded bg-gray-800 text-xs text-gray-400 font-mono">{rowLabels[rowIdx] ?? rowIdx}</th>
                {row.map((value, colIdx) => {
                  const cell = [rowIdx, colIdx]
                  const active = sameCell(activeCell, cell)
                  const comparing = comparingCells.some(other => sameCell(other, cell))
                  const decision = decisions[rowIdx]?.[colIdx]
                  const base = rowIdx === 0 || colIdx === 0

                  return (
                    <td key={colIdx}>
                      <motion.div
                        animate={{
                          scale: active ? 1.08 : 1,
                          backgroundColor: active ? '#f59e0b' : comparing ? '#0e7490' : decision === 'take' ? '#065f46' : base ? '#111827' : '#1e293b',
                          borderColor: active ? '#fbbf24' : comparing ? '#22d3ee' : decision === 'take' ? '#10b981' : '#475569',
                        }}
                        transition={{ duration: dur }}
                        className="w-12 h-12 rounded border-2 flex flex-col items-center justify-center font-mono text-sm font-bold text-white"
                      >
                        <span>{value}</span>
                        {decision && <span className="text-[9px] font-normal text-gray-300">{decision}</span>}
                      </motion.div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
        <div className="rounded border border-amber-800 bg-amber-900/20 px-3 py-2 text-amber-300">Current cell</div>
        <div className="rounded border border-cyan-800 bg-cyan-900/20 px-3 py-2 text-cyan-300">Cells being compared</div>
        <div className="rounded border border-emerald-800 bg-emerald-900/20 px-3 py-2 text-emerald-300">Chosen take/match value</div>
      </div>
    </div>
  )
}
