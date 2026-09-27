import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'

function heapLayout(heap, idx = 0, x = 360, y = 50, spread = 140) {
  if (idx >= heap.length) return []
  const nodes = [{ idx, val: heap[idx], x, y }]
  nodes.push(...heapLayout(heap, 2 * idx + 1, x - spread, y + 85, spread / 2))
  nodes.push(...heapLayout(heap, 2 * idx + 2, x + spread, y + 85, spread / 2))
  return nodes
}

export default function PriorityQueueVisualizer({ step }) {
  const { speedMs } = usePlayerStore()
  const dur = Math.min(0.35, speedMs / 1500)
  if (!step) return null
  const { heap = [], highlight = [], swapping = [] } = step
  const layoutNodes = heapLayout(heap)

  const getColor = (idx) => {
    if (swapping.includes(idx)) return { fill: '#ef4444', stroke: '#f87171' }
    if (highlight.includes(idx)) return { fill: '#f59e0b', stroke: '#fbbf24' }
    if (idx === 0) return { fill: '#7c3aed', stroke: '#8b5cf6' }
    return { fill: '#1e3a5f', stroke: '#3b82f6' }
  }

  return (
    <div className="panel p-4">
      <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-3">Min Heap (Priority Queue)</div>

      {heap.length === 0
        ? <div className="flex items-center justify-center h-48 text-gray-600 font-mono text-sm">empty heap</div>
        : (
          <svg width="100%" viewBox="0 0 720 300" className="min-w-96">
            {/* Edges */}
            {layoutNodes.map(node => {
              if (node.idx === 0) return null
              const parent = layoutNodes.find(n => n.idx === Math.floor((node.idx - 1) / 2))
              if (!parent) return null
              return (
                <line key={node.idx} x1={parent.x} y1={parent.y} x2={node.x} y2={node.y}
                  stroke="#334155" strokeWidth="2" />
              )
            })}

            {/* Nodes */}
            {layoutNodes.map(node => {
              const { fill, stroke } = getColor(node.idx)
              return (
                <g key={node.idx} transform={`translate(${node.x},${node.y})`}>
                  <motion.circle r={26} animate={{ fill, stroke }} transition={{ duration: dur }} strokeWidth={2} />
                  <text fill="white" textAnchor="middle" dominantBaseline="middle"
                    fontSize="14" fontFamily="monospace" fontWeight="bold">{node.val}</text>
                  <text y={36} fill="#64748b" textAnchor="middle" fontSize="9" fontFamily="monospace">[{node.idx}]</text>
                </g>
              )
            })}
          </svg>
        )}

      {/* Heap array representation */}
      <div className="mt-3">
        <div className="text-xs text-gray-600 font-mono mb-1">Array representation</div>
        <div className="flex gap-1.5 flex-wrap">
          {heap.map((val, i) => (
            <motion.div key={i}
              animate={{ backgroundColor: highlight.includes(i) ? '#f59e0b' : swapping.includes(i) ? '#ef4444' : '#1e3a5f', scale: highlight.includes(i) || swapping.includes(i) ? 1.1 : 1 }}
              transition={{ duration: dur }}
              className="w-10 h-10 rounded border-2 border-blue-800 flex flex-col items-center justify-center">
              <span className="text-white font-mono font-bold text-sm">{val}</span>
              <span className="text-[9px] text-gray-500">[{i}]</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-2 flex gap-3 flex-wrap">
        {[['#7c3aed','Root (Min)'],['#f59e0b','Active'],['#ef4444','Swapping']].map(([c,l])=>(
          <div key={l} className="flex items-center gap-1 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ background: c }} />
            <span className="text-gray-500">{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
