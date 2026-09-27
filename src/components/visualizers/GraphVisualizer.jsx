import { getAutoViewBox } from '../../utils/visualizerLayout'

const STATUS_COLORS = {
  unvisited: { fill: '#334155', stroke: '#475569', text: '#94a3b8' },
  queued:    { fill: '#7c3aed', stroke: '#8b5cf6', text: '#fff' },
  visited:   { fill: '#059669', stroke: '#10b981', text: '#fff' },
}

export default function GraphVisualizer({ nodes, edges, nodeStatus, queueOrStack, label = 'Queue' }) {
  const safeNodes = nodes || []
  const safeEdges = edges || []
  const { viewBox } = getAutoViewBox(safeNodes, { fallbackWidth: 640, fallbackHeight: 360, padding: 90 })

  return (
    <div className="panel p-4">
      <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-3">Graph</div>
      <svg width="100%" height={360} viewBox={viewBox} preserveAspectRatio="xMidYMid meet">
        {/* Edges */}
        {safeEdges.map(([a, b], i) => {
          const na = safeNodes.find(n => n.id === a)
          const nb = safeNodes.find(n => n.id === b)
          if (!na || !nb) return null
          return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="#374151" strokeWidth="2" />
        })}

        {/* Nodes */}
        {safeNodes.map(node => {
          const status = nodeStatus?.[node.id] || 'unvisited'
          const { fill, stroke, text } = STATUS_COLORS[status]
          return (
            <g key={node.id} transform={`translate(${node.x},${node.y})`}
              style={{ transition: 'all 0.4s' }}>
              <circle r="24" fill={fill} stroke={stroke} strokeWidth="2.5" />
              <text fill={text} textAnchor="middle" dominantBaseline="middle"
                fontSize="14" fontFamily="monospace" fontWeight="bold">
                {node.id}
              </text>
            </g>
          )
        })}

        {safeNodes.length === 0 && (
          <text x="320" y="180" textAnchor="middle" fill="#64748b" fontSize="13" fontFamily="monospace">
            Add nodes to visualize the graph
          </text>
        )}
      </svg>

      {/* Queue/Stack panel */}
      {queueOrStack && (
        <div className="mt-3 bg-gray-800 rounded-lg p-3">
          <span className="text-xs text-gray-500 font-mono mr-2">{label}:</span>
          {queueOrStack.length === 0
            ? <span className="text-gray-600 text-xs font-mono">[ empty ]</span>
            : queueOrStack.map((v, i) => (
              <span key={i} className="inline-block px-2 py-0.5 bg-cyan-800 text-cyan-200 rounded text-xs font-mono mr-1">
                {v}
              </span>
            ))
          }
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-4 mt-3 justify-center flex-wrap">
        {Object.entries(STATUS_COLORS).map(([status, colors]) => (
          <div key={status} className="flex items-center gap-1.5 text-xs">
            <svg width="16" height="16">
              <circle cx="8" cy="8" r="7" fill={colors.fill} stroke={colors.stroke} strokeWidth="1.5" />
            </svg>
            <span className="text-gray-500 capitalize">{status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
