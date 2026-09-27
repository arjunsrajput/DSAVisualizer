import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'

export default function InfixPostfixVisualizer({ step }) {
  const { speedMs } = usePlayerStore()
  const dur = Math.min(0.35, speedMs / 1500)
  if (!step) return null
  const { expr = '', charIdx, stack = [], output = [] } = step

  return (
    <div className="panel p-5 space-y-5">
      <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">Infix → Postfix</div>

      {/* Infix expression */}
      <div>
        <div className="text-xs text-gray-600 font-mono mb-2">Infix Expression</div>
        <div className="flex gap-1 flex-wrap">
          {expr.split('').map((ch, i) => (
            <motion.div key={i}
              animate={{ scale: charIdx === i ? 1.3 : 1, backgroundColor: charIdx === i ? '#f59e0b' : i < charIdx ? '#0f172a' : '#334155' }}
              transition={{ duration: dur }}
              className="w-10 h-10 rounded-lg border-2 border-slate-600 flex items-center justify-center font-mono font-bold text-base text-white">
              {ch}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Operator stack */}
        <div>
          <div className="text-xs text-gray-600 font-mono mb-2">Operator Stack</div>
          <div className="flex flex-col-reverse gap-1 min-h-24 items-start border border-slate-700 rounded-lg p-2 bg-slate-900/50">
            {stack.map((ch, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: dur }}
                className={`w-10 h-9 rounded border-2 flex items-center justify-center font-mono font-bold ${i === stack.length - 1 ? 'bg-violet-700 border-violet-500 text-white' : 'bg-slate-700 border-slate-600 text-slate-300'}`}>
                {ch}
              </motion.div>
            ))}
            {stack.length === 0 && <span className="text-gray-700 text-xs font-mono italic">empty</span>}
          </div>
        </div>

        {/* Output queue */}
        <div>
          <div className="text-xs text-gray-600 font-mono mb-2">Output (Postfix)</div>
          <div className="flex flex-wrap gap-1 min-h-24 border border-slate-700 rounded-lg p-2 bg-slate-900/50 content-start">
            {output.map((ch, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: dur }}
                className="w-9 h-9 rounded border-2 bg-emerald-800 border-emerald-600 flex items-center justify-center font-mono font-bold text-emerald-200">
                {ch}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
