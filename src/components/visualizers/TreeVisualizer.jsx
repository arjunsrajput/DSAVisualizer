import { getAutoViewBox, getResponsiveSvgHeight } from '../../utils/visualizerLayout'

export default function TreeVisualizer({ nodes, edges, highlight, path = [], status }) {
  if (!nodes || nodes.length === 0) {
    return (
      <div className="panel p-5">
        <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-4">BST</div>
        <div className="flex items-center justify-center h-48 text-gray-600 font-mono text-sm">empty tree</div>
      </div>
    )
  }

  const { viewBox } = getAutoViewBox(nodes, { fallbackWidth: 700, fallbackHeight: 320, padding: 80 })
  const svgHeight = getResponsiveSvgHeight(nodes, { base: 300, min: 280, max: 560 })

  const getNodeColor = (nodeId) => {
    if (status === 'found' && highlight === nodeId) return { fill: '#059669', text: '#fff', stroke: '#10b981' }
    if (status === 'not-found' && path.includes(nodeId)) return { fill: '#9f1239', text: '#fff', stroke: '#fb7185' }
    if (highlight === nodeId) return { fill: '#f59e0b', text: '#1f2937', stroke: '#fbbf24' }
    if (path.includes(nodeId)) return { fill: '#7c3aed', text: '#fff', stroke: '#8b5cf6' }
    return { fill: '#334155', text: '#cbd5e1', stroke: '#475569' }
  }

  return (
    <div className="panel p-4 overflow-x-auto">
      <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-3">BST</div>
      <svg width="100%" height={svgHeight} viewBox={viewBox} preserveAspectRatio="xMidYMid meet">
        {/* Edges */}
        {edges.map((edge, i) => {
          const from = nodes.find(n => n.id === edge.from)
          const to = nodes.find(n => n.id === edge.to)
          if (!from || !to) return null
          return (
            <line key={i}
              x1={from.x} y1={from.y}
              x2={to.x} y2={to.y}
              stroke="#374151" strokeWidth="2"
            />
          )
        })}

        {/* Nodes */}
        {nodes.map(node => {
          const { fill, text, stroke } = getNodeColor(node.id)
          return (
            <g key={node.id} transform={`translate(${node.x},${node.y})`}
              style={{ transition: 'all 0.3s' }}>
              <circle r="22" fill={fill} stroke={stroke} strokeWidth="2" />
              <text fill={text} textAnchor="middle" dominantBaseline="middle"
                fontSize="13" fontFamily="monospace" fontWeight="bold">
                {node.val}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="flex gap-4 mt-2 justify-center flex-wrap">
        {[
          { color: '#334155', stroke: '#475569', label: 'Node' },
          { color: '#7c3aed', stroke: '#8b5cf6', label: 'Path' },
          { color: '#f59e0b', stroke: '#fbbf24', label: 'Current' },
          { color: '#059669', stroke: '#10b981', label: 'Found' },
          { color: '#9f1239', stroke: '#fb7185', label: 'Not found path' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1.5 text-xs">
            <svg width="16" height="16">
              <circle cx="8" cy="8" r="7" fill={l.color} stroke={l.stroke} strokeWidth="1.5" />
            </svg>
            <span className="text-gray-500">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
