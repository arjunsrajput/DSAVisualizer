import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'
import { getAutoViewBox } from '../../utils/visualizerLayout'

export default function WeightedGraphVisualizer({ step, graphDef, title = 'Graph', showDist = false, showMST = false }) {
  const { speedMs } = usePlayerStore()
  const dur = Math.min(0.35, speedMs / 1500)
  if (!graphDef) return null

  const safeStep = step || {}
  const { nodeStatus = {}, dist, activeEdge, mstEdges = [], activeNode } = safeStep
  const nodes = graphDef.nodes || []
  const edges = graphDef.edges || []
  const { viewBox } = getAutoViewBox(nodes, { fallbackWidth: 620, fallbackHeight: 380, padding: 90 })

  const getNodeFill = (id) => {
    const s = nodeStatus[id]
    if (id === activeNode || s === 'active') return '#f59e0b'
    if (s === 'visited') return '#10b981'
    return '#1e293b'
  }

  const isActiveEdge = (u, v) => activeEdge && ((activeEdge[0] === u && activeEdge[1] === v) || (activeEdge[0] === v && activeEdge[1] === u))
  const isMSTEdge = (u, v) => mstEdges.some(([a, b]) => (a === u && b === v) || (a === v && b === u))

  return (
    <div className="panel p-4">
      <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-3">{title}</div>

      <svg width="100%" height={380} viewBox={viewBox} preserveAspectRatio="xMidYMid meet" className="min-w-80">
        {edges.map(([u, v, w], i) => {
          const fn = nodes.find(n => n.id === u)
          const tn = nodes.find(n => n.id === v)
          if (!fn || !tn) return null
          const active = isActiveEdge(u, v)
          const mst = isMSTEdge(u, v)
          const mx = (fn.x + tn.x) / 2, my = (fn.y + tn.y) / 2

          return (
            <g key={i}>
              <motion.line
                x1={fn.x} y1={fn.y} x2={tn.x} y2={tn.y}
                animate={{ stroke: active ? '#f59e0b' : mst ? '#10b981' : '#334155', strokeWidth: active || mst ? 3 : 1.5 }}
                transition={{ duration: dur }}
              />
              <text x={mx} y={my - 6} textAnchor="middle" fill={active ? '#fbbf24' : '#6b7280'} fontSize="11" fontFamily="monospace" fontWeight="bold">{w}</text>
            </g>
          )
        })}

        {nodes.map(node => {
          const fill = getNodeFill(node.id)
          const d = dist?.[node.id]
          const distLabel = d === Infinity ? '∞' : d

          return (
            <g key={node.id} transform={`translate(${node.x},${node.y})`}>
              <motion.circle r={26} animate={{ fill, stroke: nodeStatus[node.id] === 'visited' ? '#34d399' : '#475569' }}
                transition={{ duration: dur }} strokeWidth={2} />
              <text fill="white" textAnchor="middle" dominantBaseline="middle"
                fontSize="14" fontFamily="monospace" fontWeight="bold">{node.id}</text>
              {showDist && d !== undefined && (
                <text y={-38} textAnchor="middle" fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold">{distLabel}</text>
              )}
            </g>
          )
        })}

        {nodes.length === 0 && (
          <text x="310" y="190" textAnchor="middle" fill="#64748b" fontSize="13" fontFamily="monospace">
            Add nodes to visualize the graph
          </text>
        )}
      </svg>

      {showDist && dist && (
        <div className="mt-3">
          <div className="text-xs text-gray-600 font-mono mb-1">Distance table from source:</div>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(dist).map(([id, d]) => (
              <div key={id} className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs font-mono">
                <span className="text-gray-400">Node {id}: </span>
                <span className={d === Infinity ? 'text-gray-600' : 'text-amber-400'}>{d === Infinity ? '∞' : d}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-3 flex gap-4 flex-wrap">
        {[['#f59e0b','Active'],['#10b981','Visited/MST'],['#1e293b','Unvisited']].map(([c,l])=>(
          <div key={l} className="flex items-center gap-1.5 text-xs">
            <div className="w-3 h-3 rounded-full border border-slate-600" style={{ background: c }} />
            <span className="text-gray-500">{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
