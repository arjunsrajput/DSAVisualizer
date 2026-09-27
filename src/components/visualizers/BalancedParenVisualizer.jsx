import { motion, AnimatePresence } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'

export default function BalancedParenVisualizer({ step }) {
  const { speedMs } = usePlayerStore()
  const dur = Math.min(0.35, speedMs / 1500)
  if (!step) return null
  const { expr = '', charIdx, stack = [], valid } = step

  return (
    <div className="panel p-5 space-y-5">
      <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">Balanced Parentheses</div>

      {/* Expression display */}
      <div>
        <div className="text-xs text-gray-600 font-mono mb-2">Expression</div>
        <div className="flex gap-1 flex-wrap">
          {expr.split('').map((ch, i) => (
            <motion.div key={i}
              animate={{
                scale: charIdx === i ? 1.3 : 1,
                backgroundColor: charIdx === i ? '#f59e0b' : i < charIdx ? '#1e293b' : '#334155',
              }}
              transition={{ duration: dur }}
              className="w-10 h-10 rounded-lg border-2 border-slate-600 flex items-center justify-center font-mono font-bold text-lg text-white">
              {ch}
            </motion.div>
          ))}
        </div>
        {charIdx >= 0 && <div className="mt-1 text-xs text-amber-400 font-mono">↑ current: '{expr[charIdx]}'</div>}
      </div>

      {/* Stack */}
      <div>
        <div className="text-xs text-gray-600 font-mono mb-2">Stack (top → bottom)</div>
        <div className="flex flex-col-reverse gap-1 min-h-16 items-start">
          <AnimatePresence>
            {stack.map((ch, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ duration: dur }}
                className={`w-12 h-10 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-lg ${i === stack.length - 1 ? 'bg-cyan-700 border-cyan-500 text-white' : 'bg-slate-700 border-slate-600 text-slate-200'}`}>
                {ch}
              </motion.div>
            ))}
          </AnimatePresence>
          {stack.length === 0 && <div className="text-gray-600 font-mono text-sm italic">empty</div>}
        </div>
      </div>

      {/* Result */}
      {valid !== undefined && charIdx === -1 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-center p-4 rounded-xl font-bold text-xl border-2 ${valid ? 'bg-emerald-900/30 border-emerald-600 text-emerald-300' : 'bg-rose-900/30 border-rose-600 text-rose-300'}`}>
          {valid ? '✓ BALANCED' : '✗ UNBALANCED'}
        </motion.div>
      )}
    </div>
  )
}
