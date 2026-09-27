import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'

export default function MergeSortedListsVisualizer({ step }) {
  const { speedMs } = usePlayerStore()
  const dur = Math.min(0.35, speedMs / 1500)
  if (!step) return null
  const { arr1 = [], arr2 = [], merged = [], p1, p2 } = step

  const Node = ({ val, active, done }) => (
    <motion.div
      animate={{ backgroundColor: active ? '#f59e0b' : done ? '#065f46' : '#334155', scale: active ? 1.2 : 1 }}
      transition={{ duration: dur }}
      className={`w-11 h-11 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white ${active ? 'border-amber-400' : done ? 'border-emerald-600' : 'border-slate-600'}`}>
      {val}
    </motion.div>
  )

  return (
    <div className="panel p-5 space-y-4">
      <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">Merge Two Sorted Lists</div>

      <div>
        <div className="text-xs text-gray-600 font-mono mb-1">List 1</div>
        <div className="flex gap-1.5 flex-wrap">
          {arr1.map((v, i) => <Node key={i} val={v} active={p1 === i} done={i < p1} />)}
          <span className="text-gray-600 self-center font-mono text-sm">→ NULL</span>
        </div>
      </div>

      <div>
        <div className="text-xs text-gray-600 font-mono mb-1">List 2</div>
        <div className="flex gap-1.5 flex-wrap">
          {arr2.map((v, i) => <Node key={i} val={v} active={p2 === i} done={i < p2} />)}
          <span className="text-gray-600 self-center font-mono text-sm">→ NULL</span>
        </div>
      </div>

      {merged.length > 0 && (
        <div>
          <div className="text-xs text-gray-600 font-mono mb-1">Merged List</div>
          <div className="flex gap-1.5 flex-wrap">
            {merged.map((v, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: dur, delay: i * 0.02 }}
                className="w-11 h-11 rounded-lg border-2 bg-emerald-800 border-emerald-600 flex items-center justify-center font-mono font-bold text-emerald-200">
                {v}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
