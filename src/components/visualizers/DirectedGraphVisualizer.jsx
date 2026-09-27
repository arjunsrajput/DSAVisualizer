import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'
import { getAutoViewBox } from '../../utils/visualizerLayout'

export default function DirectedGraphVisualizer({ step, graphDef, title = 'Directed Graph' }) {
  const { speedMs } = usePlayerStore()
  const dur = Math.min(0.35, speedMs / 1500)
  if (!graphDef) return null
  const safeStep = step || {}
  const { nodeStatus = {}, activeEdge, cycleEdge, result = [] } = safeStep
  const nodes = graphDef.nodes || []
  const edges = graphDef.edges || []
  const { viewBox } = getAutoViewBox(nodes, { fallbackWidth: 620, fallbackHeight: 400, padding: 90 })

  const statusColor = { visited: '#10b981', active: '#f59e0b', queued: '#8b5cf6', unvisited: '#1e293b' }
  const statusStroke = { visited: '#34d399', active: '#fbbf24', queued: '#a78bfa', unvisited: '#475569' }

  const isActive = (u, v) => activeEdge && activeEdge[0] === u && activeEdge[1] === v
  const isCycle = (u, v) => cycleEdge && cycleEdge[0] === u && cycleEdge[1] === v

  return (
    <div className="panel p-4">
      <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-3">{title}</div>

      <svg width="100%" height={400} viewBox={viewBox} preserveAspectRatio="xMidYMid meet" className="min-w-80">
        <defs>
          <marker id="darr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M1 1 L8 5 L1 9" fill="none" stroke="#475569" strokeWidth="1.5" />
          </marker>
          <marker id="darr-active" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M1 1 L8 5 L1 9" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
          </marker>
          <marker id="darr-cycle" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M1 1 L8 5 L1 9" fill="none" stroke="#ef4444" strokeWidth="1.5" />
          </marker>
        </defs>

        {edges.map(([u, v], i) => {
          const fn = nodes.find(n => n.id === u)
          const tn = nodes.find(n => n.id === v)
          if (!fn || !tn) return null
          const active = isActive(u, v)
          const cycle = isCycle(u, v)
          const dx = tn.x - fn.x, dy = tn.y - fn.y
          const len = Math.sqrt(dx * dx + dy * dy)
          if (len === 0) return null
          const x2 = tn.x - (dx / len) * 28, y2 = tn.y - (dy / len) * 28
          const x1 = fn.x + (dx / len) * 28, y1 = fn.y + (dy / len) * 28

          return (
            <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              animate={{ stroke: cycle ? '#ef4444' : active ? '#f59e0b' : '#475569', strokeWidth: active || cycle ? 3 : 1.5 }}
              transition={{ duration: dur }}
              markerEnd={cycle ? 'url(#darr-cycle)' : active ? 'url(#darr-active)' : 'url(#darr)'}
            />
          )
        })}

        {nodes.map(node => {
          const s = nodeStatus[node.id] || 'unvisited'
          return (
            <g key={node.id} transform={`translate(${node.x},${node.y})`}>
              <motion.circle r={26} animate={{ fill: statusColor[s], stroke: statusStroke[s] }}
                transition={{ duration: dur }} strokeWidth={2.5} />
              <text fill="white" textAnchor="middle" dominantBaseline="middle"
                fontSize="14" fontFamily="monospace" fontWeight="bold">{node.id}</text>
            </g>
          )
        })}

        {nodes.length === 0 && (
          <text x="310" y="200" textAnchor="middle" fill="#64748b" fontSize="13" fontFamily="monospace">
            Add nodes to visualize the graph
          </text>
        )}
      </svg>

      {result.length > 0 && (
        <div className="mt-3">
          <div className="text-xs text-gray-600 font-mono mb-1">Order:</div>
          <div className="flex gap-1.5 flex-wrap">
            {result.map((id, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="w-9 h-9 rounded bg-emerald-800 border border-emerald-600 flex items-center justify-center font-mono font-bold text-emerald-200 text-sm">
                {id}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-3 flex gap-4 flex-wrap">
        {[['#f59e0b','Active/Current'],['#8b5cf6','In Stack (gray)'],['#10b981','Fully done (black)'],['#ef4444','Back edge (cycle)']].map(([c,l])=>(
          <div key={l} className="flex items-center gap-1.5 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ background: c }} />
            <span className="text-gray-500">{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
