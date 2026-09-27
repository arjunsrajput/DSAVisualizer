import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'
import { getAutoViewBox, getResponsiveSvgHeight } from '../../utils/visualizerLayout'

export default function TraversalVisualizer({ step, title = 'Tree Traversal' }) {
  const { speedMs } = usePlayerStore()
  const dur = Math.min(0.35, speedMs / 1500)
  if (!step) return null
  const { nodes = [], edges = [], current, visited = [], visitedIds = [], queue = [] } = step
  const { viewBox } = getAutoViewBox(nodes, { fallbackWidth: 800, fallbackHeight: 280, padding: 80 })
  const svgHeight = getResponsiveSvgHeight(nodes, { base: 280, min: 260, max: 540 })

  return (
    <div className="panel p-4">
      <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-3">{title}</div>

      <svg width="100%" height={svgHeight} viewBox={viewBox} preserveAspectRatio="xMidYMid meet">
        {edges.map((e, i) => {
          const from = nodes.find(n => n.id === e.from)
          const to = nodes.find(n => n.id === e.to)
          if (!from || !to) return null
          return <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#334155" strokeWidth="2" />
        })}

        {nodes.map(node => {
          const isVisited = visitedIds.includes(node.id)
          const isCurrent = current === node.id
          const fill = isCurrent ? '#f59e0b' : isVisited ? '#10b981' : '#1e293b'
          const stroke = isCurrent ? '#fbbf24' : isVisited ? '#34d399' : '#475569'

          return (
            <g key={node.id} transform={`translate(${node.x},${node.y})`}>
              <motion.circle r={22} animate={{ fill, stroke }} transition={{ duration: dur }} strokeWidth={2.5} />
              <text fill="white" textAnchor="middle" dominantBaseline="middle"
                fontSize="13" fontFamily="monospace" fontWeight="bold">{node.val}</text>
            </g>
          )
        })}
      </svg>

      {/* Visited order */}
      {visited.length > 0 && (
        <div className="mt-3">
          <div className="text-xs text-gray-600 font-mono mb-1">Visited order:</div>
          <div className="flex gap-1.5 flex-wrap">
            {visited.map((val, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: dur }}
                className="w-9 h-9 rounded-lg bg-emerald-800 border-2 border-emerald-600 flex items-center justify-center font-mono font-bold text-emerald-200 text-sm">
                {val}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Queue (level order) */}
      {queue.length > 0 && (
        <div className="mt-2">
          <div className="text-xs text-gray-600 font-mono mb-1">Queue:</div>
          <div className="flex gap-1 flex-wrap">
            {queue.map((val, i) => (
              <div key={i} className="w-9 h-9 rounded bg-cyan-900 border border-cyan-700 flex items-center justify-center font-mono text-sm text-cyan-300">{val}</div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-3 flex gap-4 flex-wrap">
        {[['#f59e0b','Current'],['#10b981','Visited'],['#1e293b','Unvisited']].map(([c,l])=>(
          <div key={l} className="flex items-center gap-1.5 text-xs">
            <div className="w-3 h-3 rounded-full border border-slate-600" style={{ background: c }} />
            <span className="text-gray-500">{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
