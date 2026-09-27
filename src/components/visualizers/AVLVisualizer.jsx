import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'
import { getAutoViewBox, getResponsiveSvgHeight } from '../../utils/visualizerLayout'

export default function AVLVisualizer({ step }) {
  const { speedMs } = usePlayerStore()
  const dur = Math.min(0.4, speedMs / 1500)
  if (!step) return null
  const { nodes = [], edges = [], highlight, rotation, rotationNodes = [] } = step
  const { viewBox } = getAutoViewBox(nodes, { fallbackWidth: 800, fallbackHeight: 320, padding: 90 })
  const svgHeight = getResponsiveSvgHeight(nodes, { base: 320, min: 300, max: 580 })

  const getColor = (nodeId) => {
    if (nodeId === highlight) return { fill: '#f59e0b', stroke: '#fbbf24' }
    if (rotationNodes.includes(nodeId)) return { fill: '#9f1239', stroke: '#fb7185' }
    return { fill: '#1e3a5f', stroke: '#3b82f6' }
  }

  const rotationEdgeKeys = new Set()
  edges.forEach(edge => {
    if (rotationNodes.includes(edge.from) && rotationNodes.includes(edge.to)) {
      rotationEdgeKeys.add(`${edge.from}-${edge.to}`)
    }
  })

  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">AVL Tree</div>
        {rotation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xs font-mono px-3 py-1 rounded-full bg-rose-900/30 border border-rose-700 text-rose-300">
            🔄 {rotation}
          </motion.div>
        )}
      </div>

      {nodes.length === 0
        ? <div className="flex items-center justify-center h-48 text-gray-600 font-mono text-sm">empty tree</div>
        : (
          <svg width="100%" height={svgHeight} viewBox={viewBox} preserveAspectRatio="xMidYMid meet">
            {edges.map((e, i) => {
              const f = nodes.find(n => n.id === e.from)
              const t = nodes.find(n => n.id === e.to)
              if (!f || !t) return null
              const rotating = rotationEdgeKeys.has(`${e.from}-${e.to}`)
              return (
                <motion.line
                  key={i}
                  x1={f.x}
                  y1={f.y}
                  x2={t.x}
                  y2={t.y}
                  animate={{
                    stroke: rotating ? '#fb7185' : '#334155',
                    strokeWidth: rotating ? 4 : 2,
                  }}
                  transition={{ duration: dur }}
                  strokeLinecap="round"
                  strokeDasharray={rotating ? '7 5' : '0'}
                />
              )
            })}

            {nodes.map(node => {
              const { fill, stroke } = getColor(node.id)
              const bfColor = Math.abs(node.bf || 0) > 1 ? '#ef4444' : '#64748b'
              return (
                <g key={node.id} transform={`translate(${node.x},${node.y})`}>
                  <motion.circle r={24} animate={{ fill, stroke }} transition={{ duration: dur }} strokeWidth={2.5} />
                  {rotationNodes.includes(node.id) && node.id !== highlight && (
                    <motion.circle
                      r={31}
                      fill="none"
                      stroke="#fb7185"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      initial={{ opacity: 0.4, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: dur }}
                    />
                  )}
                  <text fill="white" textAnchor="middle" dominantBaseline="middle"
                    fontSize="13" fontFamily="monospace" fontWeight="bold">{node.val}</text>
                  <text y={-36} textAnchor="middle" fill={bfColor} fontSize="10" fontFamily="monospace">
                    bf={node.bf}
                  </text>
                  <text y={36} textAnchor="middle" fill="#475569" fontSize="9" fontFamily="monospace">
                    h={node.height}
                  </text>
                </g>
              )
            })}
          </svg>
        )}

      <div className="mt-2 flex gap-4 flex-wrap">
        {[['#f59e0b','Inserted/Active'],['#9f1239','Rotation nodes'],['#3b82f6','Balanced node'],['#ef4444','BF > 1 (unbalanced)']].map(([c,l])=>(
          <div key={l} className="flex items-center gap-1.5 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ background: c }} />
            <span className="text-gray-500">{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
