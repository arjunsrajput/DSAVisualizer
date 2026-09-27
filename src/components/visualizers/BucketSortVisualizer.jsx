import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'

export default function BucketSortVisualizer({ step }) {
  const { speedMs } = usePlayerStore()
  const dur = Math.min(0.3, speedMs / 1500)
  if (!step) return null
  const { array = [], buckets = [], activeIdx, activeBucket, phase } = step

  return (
    <div className="panel p-4 space-y-4">
      <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">Bucket Sort</div>

      {/* Input array */}
      <div>
        <div className="text-xs text-gray-600 font-mono mb-1">{phase === 'done' ? 'Sorted Array' : 'Input Array'}</div>
        <div className="flex gap-1.5 flex-wrap">
          {array.map((val, i) => (
            <motion.div key={i}
              animate={{ scale: activeIdx === i ? 1.15 : 1, backgroundColor: phase === 'done' ? '#065f46' : activeIdx === i ? '#f59e0b' : '#334155' }}
              transition={{ duration: dur }}
              className={`w-11 h-10 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-sm text-white ${phase === 'done' ? 'border-emerald-600' : 'border-slate-600'}`}>
              {val}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Buckets */}
      <div>
        <div className="text-xs text-gray-600 font-mono mb-1">Buckets</div>
        <div className="flex gap-2 flex-wrap">
          {buckets.map((bucket, bi) => (
            <div key={bi} className={`rounded-lg border-2 p-2 min-w-[60px] ${bi === activeBucket ? 'border-amber-400 bg-amber-900/10' : 'border-slate-700 bg-slate-800/30'}`}>
              <div className="text-[10px] text-gray-500 font-mono mb-1 text-center">B{bi}</div>
              <div className="flex flex-col gap-0.5">
                {bucket.length === 0
                  ? <div className="w-10 h-7 border border-dashed border-slate-700 rounded text-xs text-gray-700 flex items-center justify-center">—</div>
                  : bucket.map((v, vi) => (
                    <motion.div key={vi}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: dur }}
                      className="w-10 h-7 bg-cyan-700 border border-cyan-600 rounded text-xs font-mono font-bold text-white flex items-center justify-center">
                      {v}
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
