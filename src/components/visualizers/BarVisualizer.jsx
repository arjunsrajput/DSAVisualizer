import { motion, AnimatePresence } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'

function getBarStyle(idx, step) {
  if (!step) return { bg: 'bg-slate-600', border: 'border-slate-500' }
  if (step.sorted?.includes(idx))   return { bg: 'bg-emerald-500', border: 'border-emerald-400' }
  if (step.swapping?.includes(idx)) return { bg: 'bg-rose-500',    border: 'border-rose-400' }
  if (step.comparing?.includes(idx))return { bg: 'bg-amber-400',   border: 'border-amber-300' }
  if (step.minIdx === idx)          return { bg: 'bg-cyan-500',    border: 'border-cyan-400' }
  if (step.current === idx)         return { bg: 'bg-violet-500',  border: 'border-violet-400' }
  if (step.pivot === idx)           return { bg: 'bg-cyan-500',    border: 'border-cyan-400' }
  if (step.keyIdx === idx)          return { bg: 'bg-amber-400',   border: 'border-amber-300' }
  if (step.shifting?.includes(idx)) return { bg: 'bg-orange-500', border: 'border-orange-400' }
  if (step.left?.includes(idx))     return { bg: 'bg-blue-500',   border: 'border-blue-400' }
  if (step.right?.includes(idx))    return { bg: 'bg-pink-500',   border: 'border-pink-400' }
  if (step.merging?.includes(idx))  return { bg: 'bg-cyan-500',   border: 'border-cyan-400' }
  if (step.range?.length === 2 && idx >= step.range[0] && idx <= step.range[1])
    return { bg: 'bg-slate-500', border: 'border-slate-400' }
  return { bg: 'bg-slate-700', border: 'border-slate-600' }
}

// context-aware legend based on step fields
function getLegend(step) {
  if (!step) return []
  const items = []
  if (step.comparing !== undefined) items.push({ color: 'bg-amber-400', label: 'Comparing' })
  if (step.swapping !== undefined)  items.push({ color: 'bg-rose-500', label: 'Swapping' })
  if (step.sorted !== undefined)    items.push({ color: 'bg-emerald-500', label: 'Sorted' })
  if (step.pivot !== undefined)     items.push({ color: 'bg-cyan-500', label: 'Pivot' })
  if (step.minIdx !== undefined)    items.push({ color: 'bg-cyan-500', label: 'Min' })
  if (step.current !== undefined)   items.push({ color: 'bg-violet-500', label: 'Current' })
  if (step.left !== undefined)      items.push({ color: 'bg-blue-500', label: 'Left half' })
  if (step.right !== undefined)     items.push({ color: 'bg-pink-500', label: 'Right half' })
  if (step.merging !== undefined)   items.push({ color: 'bg-cyan-500', label: 'Merging' })
  if (step.keyIdx !== undefined)    items.push({ color: 'bg-amber-400', label: 'Key' })
  if (step.shifting !== undefined)  items.push({ color: 'bg-orange-500', label: 'Shifting' })
  return items.filter((v, i, a) => a.findIndex(x => x.label === v.label) === i)
}

export default function BarVisualizer({ array, step }) {
  const { speedMs } = usePlayerStore()
  if (!array || array.length === 0) return null
  const max = Math.max(1, ...array)
  const animDuration = Math.min(0.3, speedMs / 2000)
  const legend = getLegend(step)

  return (
    <div className="panel p-5">
      <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-4">Array</div>
      <div className="flex items-end justify-center gap-1.5 h-48">
        <AnimatePresence initial={false}>
          {array.map((val, idx) => {
            const { bg, border } = getBarStyle(idx, step)
            const height = `${Math.max(8, (val / max) * 100)}%`
            return (
              <motion.div
                key={val + '-' + idx}
                layout
                transition={{ duration: animDuration, type: 'spring', stiffness: 300, damping: 30 }}
                className="flex flex-col items-center gap-1 flex-1 max-w-14 h-full"
              >
                <span className="text-xs font-mono text-gray-400">{val}</span>
                <div className="w-full h-36 flex items-end">
                  <motion.div
                    className={`w-full rounded-t-md border-2 ${bg} ${border}`}
                    animate={{ height }}
                    transition={{ duration: animDuration }}
                  />
                </div>
                <span className="text-[10px] text-gray-600 font-mono">{idx}</span>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      {legend.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          {legend.map(l => (
            <div key={l.label} className="flex items-center gap-1.5 text-xs">
              <div className={`w-3 h-3 rounded ${l.color}`} />
              <span className="text-gray-500">{l.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
