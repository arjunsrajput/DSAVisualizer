import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'

export default function FloydCycleVisualizer({ step }) {
  const { speedMs } = usePlayerStore()
  const dur = Math.min(0.4, speedMs / 1500)
  if (!step) return null
  const { nodes = [], slow, fast, phase, cycleStart } = step

  const n = nodes.length
  const cx = 280, cy = 180, r = 140
  const positions = nodes.map((_, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  })

  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">Floyd's Cycle Detection</div>
        <div className={`text-xs font-mono px-2 py-0.5 rounded border ${phase === 1 ? 'text-amber-300 border-amber-700 bg-amber-900/20' : 'text-violet-300 border-violet-700 bg-violet-900/20'}`}>
          Phase {phase}: {phase === 1 ? 'Detect' : 'Locate Start'}
        </div>
      </div>

      <svg width="100%" viewBox="0 0 560 360">
        {/* Edges (circular with cycle) */}
        {nodes.map((node, i) => {
          const to = node.next
          if (to === null || to === undefined) return null
          const from = positions[i], toPos = positions[to]
          return (
            <line key={i} x1={from.x} y1={from.y} x2={toPos.x} y2={toPos.y}
              stroke={to === cycleStart && i === n - 1 ? '#f59e0b' : '#334155'}
              strokeWidth={to === cycleStart && i === n - 1 ? 2.5 : 1.5}
              strokeDasharray={to === cycleStart && i === n - 1 ? '5,3' : ''}
              markerEnd="url(#arr)" />
          )
        })}

        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M1 1 L8 5 L1 9" fill="none" stroke="#475569" strokeWidth="1.5" />
          </marker>
        </defs>

        {/* Nodes */}
        {positions.map((pos, i) => {
          const isSlow = slow === i
          const isFast = fast === i
          const isBoth = isSlow && isFast
          const isCycleStart = i === cycleStart
          const fill = isBoth ? '#7c3aed' : isSlow ? '#10b981' : isFast ? '#ef4444' : isCycleStart ? '#92400e' : '#1e293b'
          const stroke = isBoth ? '#8b5cf6' : isSlow ? '#34d399' : isFast ? '#f87171' : isCycleStart ? '#f59e0b' : '#475569'

          return (
            <g key={i}>
              <motion.circle cx={pos.x} cy={pos.y} r={24} animate={{ fill, stroke }} transition={{ duration: dur }} strokeWidth={2.5} />
              <text x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="middle"
                fill="white" fontSize="13" fontFamily="monospace" fontWeight="bold">
                {nodes[i]?.val}
              </text>
              {isSlow && !isBoth && <text x={pos.x} y={pos.y - 36} textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="monospace">🐢</text>}
              {isFast && !isBoth && <text x={pos.x} y={pos.y + 42} textAnchor="middle" fill="#f87171" fontSize="10" fontFamily="monospace">🐇</text>}
              {isBoth && <text x={pos.x} y={pos.y - 38} textAnchor="middle" fill="#a78bfa" fontSize="10" fontFamily="monospace">⚡MEET</text>}
            </g>
          )
        })}
      </svg>

      <div className="flex gap-4 flex-wrap justify-center mt-2">
        {[['#10b981','🐢 Slow (1 step)'],['#ef4444','🐇 Fast (2 steps)'],['#7c3aed','Meeting point'],['#f59e0b','Cycle start']].map(([c,l])=>(
          <div key={l} className="flex items-center gap-1.5 text-xs">
            <div className="w-3 h-3 rounded-full border border-slate-600" style={{ background: c }} />
            <span className="text-gray-500">{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
