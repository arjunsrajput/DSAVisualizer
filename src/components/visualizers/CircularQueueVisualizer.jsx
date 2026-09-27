import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'

export default function CircularQueueVisualizer({ step }) {
  const { speedMs } = usePlayerStore()
  const dur = Math.min(0.35, speedMs / 1500)
  if (!step) return null
  const { items = [], front, rear, size, capacity } = step
  const cap = capacity || 5

  const cx = 200, cy = 200, r = 130
  const slots = Array.from({ length: cap }, (_, i) => {
    const angle = (2 * Math.PI * i) / cap - Math.PI / 2
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), angle }
  })

  const isFront = (i) => i === front
  const isRear = (i) => i === rear
  const hasItem = (i) => {
    if (size === 0) return false
    if (front <= rear) return i >= front && i <= rear
    return i >= front || i <= rear
  }

  return (
    <div className="panel p-4 flex flex-col items-center">
      <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-3 self-start">Circular Queue</div>

      <svg width="400" height="400" viewBox="0 0 400 400">
        {/* Circular slots */}
        {slots.map((slot, i) => {
          const filled = hasItem(i)
          const isF = isFront(i)
          const isR = isRear(i)
          const fill = isF && isR ? '#7c3aed' : isF ? '#10b981' : isR ? '#0891b2' : filled ? '#1d4ed8' : '#1e293b'
          const stroke = isF && isR ? '#8b5cf6' : isF ? '#34d399' : isR ? '#22d3ee' : filled ? '#3b82f6' : '#334155'

          return (
            <g key={i}>
              <motion.circle cx={slot.x} cy={slot.y} r={30}
                animate={{ fill, stroke }}
                transition={{ duration: dur }}
                strokeWidth={2.5}
              />
              <text x={slot.x} y={slot.y - 4} textAnchor="middle" dominantBaseline="middle"
                fill="white" fontSize="13" fontFamily="monospace" fontWeight="bold">
                {items[i] != null ? items[i] : ''}
              </text>
              <text x={slot.x} y={slot.y + 12} textAnchor="middle"
                fill={filled ? '#94a3b8' : '#475569'} fontSize="9" fontFamily="monospace">
                [{i}]
              </text>
              {isF && (
                <text x={slot.x} y={slot.y - 44} textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold">FRONT</text>
              )}
              {isR && !isF && (
                <text x={slot.x} y={slot.y + 46} textAnchor="middle" fill="#22d3ee" fontSize="10" fontFamily="monospace" fontWeight="bold">REAR</text>
              )}
              {isF && isR && (
                <text x={slot.x} y={slot.y + 46} textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace">F+R</text>
              )}
            </g>
          )
        })}

        {/* Center info */}
        <text x={cx} y={cy - 10} textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="monospace">size</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#e2e8f0" fontSize="20" fontFamily="monospace" fontWeight="bold">{size}/{cap}</text>
      </svg>

      {/* Legend */}
      <div className="flex gap-4 mt-1 flex-wrap justify-center">
        {[['#10b981','Front'],['#0891b2','Rear'],['#1d4ed8','Filled'],['#1e293b','Empty']].map(([c,l]) => (
          <div key={l} className="flex items-center gap-1.5 text-xs">
            <div className="w-3 h-3 rounded-full border border-slate-600" style={{ background: c }} />
            <span className="text-gray-500">{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
