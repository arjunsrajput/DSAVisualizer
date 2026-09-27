import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'

export default function ReverseLinkedListVisualizer({ step }) {
  const { speedMs } = usePlayerStore()
  const dur = Math.min(0.4, speedMs / 1500)
  if (!step) return null
  const {
    nodes = [],
    type = 'singly',
    prevIdx,
    currIdx,
    nextIdx,
    headAddress,
    tailAddress,
    prevAddress,
    currAddress,
    nextAddress,
    newHeadAddress,
    oldHeadAddress,
  } = step
  const isDoubly = type === 'doubly'

  const getNodeStyle = (i) => {
    if (i === currIdx) return 'bg-amber-500 border-amber-400'
    if (i === prevIdx) return 'bg-cyan-700 border-cyan-500'
    if (i === nextIdx) return 'bg-violet-700 border-violet-500'
    return 'bg-slate-700 border-slate-600'
  }

  const getPointerLabel = (i) => {
    const labels = []
    if (headAddress && nodes[i]?.address === headAddress) labels.push('head')
    if (tailAddress && nodes[i]?.address === tailAddress) labels.push('tail')
    if (i === prevIdx) labels.push('prev')
    if (i === currIdx) labels.push('curr')
    if (i === nextIdx) labels.push('next')
    if (newHeadAddress && nodes[i]?.address === newHeadAddress) labels.push('newHead')
    return labels.join('/')
  }

  const PointerBadge = ({ label, address, tone = 'cyan' }) => {
    const toneClass = {
      emerald: 'border-emerald-800 bg-emerald-900/20 text-emerald-300',
      blue: 'border-blue-800 bg-blue-900/20 text-blue-300',
      amber: 'border-amber-800 bg-amber-900/20 text-amber-300',
      cyan: 'border-cyan-800 bg-cyan-900/20 text-cyan-300',
      violet: 'border-violet-800 bg-violet-900/20 text-violet-300',
    }[tone]

    return (
      <div className={`rounded-lg border px-3 py-2 font-mono text-xs ${toneClass}`}>
        <div className="text-[10px] uppercase tracking-wider opacity-75">{label}</div>
        <div className="font-bold">{address || 'NULL'}</div>
      </div>
    )
  }

  return (
    <div className="panel p-5 space-y-4 overflow-x-auto">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">
          {isDoubly ? 'Reverse Doubly Linked List' : 'Reverse Singly Linked List'}
        </div>
        <div className="flex flex-wrap gap-2">
          <PointerBadge label="HEAD" address={headAddress} tone="emerald" />
          {isDoubly && <PointerBadge label="TAIL" address={tailAddress} tone="blue" />}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {isDoubly ? (
          <>
            <PointerBadge label="curr" address={currAddress} tone="amber" />
            <PointerBadge label="next saved" address={nextAddress} tone="violet" />
            <PointerBadge label="newHead" address={newHeadAddress} tone="cyan" />
            <PointerBadge label="oldHead" address={oldHeadAddress} tone="emerald" />
          </>
        ) : (
          <>
            <PointerBadge label="prev" address={prevAddress} tone="cyan" />
            <PointerBadge label="curr" address={currAddress} tone="amber" />
            <PointerBadge label="next saved" address={nextAddress} tone="violet" />
          </>
        )}
      </div>

      {nodes.length === 0 ? (
        <div className="flex items-center justify-center h-32 font-mono text-sm">
          <div className="rounded-lg border border-rose-800 bg-rose-900/20 px-3 py-2 text-rose-300">
            HEAD → NULL
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 min-w-max py-4">
          {nodes.map((node, i) => {
            const label = getPointerLabel(i)
            const nextIndex = nodes.findIndex(n => n.address === node.nextAddress)
            const pointsBackward = nextIndex !== -1 && nextIndex < i
            const pointsForward = nextIndex !== -1 && nextIndex > i

            return (
              <div key={node.address || i} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-2">
                  <div className={`h-4 text-[10px] font-mono font-bold ${label ? 'text-amber-300' : 'text-transparent'}`}>
                    {label || 'node'}
                  </div>
                  <div className={`text-[10px] font-mono ${
                    i === currIdx ? 'text-amber-300' : node.address === headAddress ? 'text-emerald-300' : node.address === tailAddress ? 'text-blue-300' : 'text-gray-500'
                  }`}>
                    {node.address}
                  </div>
                  <motion.div
                    layout
                    transition={{ duration: dur, type: 'spring' }}
                    className={`flex rounded-lg border-2 overflow-hidden transition-all duration-300 ${getNodeStyle(i)}`}
                  >
                    {isDoubly && (
                      <div className="w-20 h-16 flex flex-col items-center justify-center bg-gray-800 text-blue-300 font-mono">
                        <span className="text-[10px] uppercase tracking-wider text-gray-500">prev</span>
                        <span className={`text-xs font-bold ${node.prevAddress ? '' : 'text-rose-300'}`}>
                          {node.prevAddress || 'NULL'}
                        </span>
                      </div>
                    )}
                    <div className={`w-16 h-16 flex flex-col items-center justify-center font-mono ${
                      isDoubly ? 'border-x border-slate-600' : ''
                    } ${i === currIdx ? 'bg-amber-400 text-gray-900' : 'bg-slate-700 text-white'}`}>
                      <span className="text-[10px] uppercase tracking-wider opacity-70">data</span>
                      <span className="text-lg font-bold leading-none">{node.val}</span>
                    </div>
                    <div className="w-20 h-16 flex flex-col items-center justify-center border-l border-slate-600 bg-gray-800 text-cyan-300 font-mono">
                      <span className="text-[10px] uppercase tracking-wider text-gray-500">next</span>
                      <span className={`text-xs font-bold ${node.nextAddress ? '' : 'text-rose-300'}`}>
                        {node.nextAddress || 'NULL'}
                      </span>
                    </div>
                  </motion.div>
                </div>
                {node.nextAddress ? (
                  <motion.div
                    animate={{ color: pointsBackward ? '#10b981' : pointsForward ? '#06b6d4' : '#475569' }}
                    className="font-bold text-xl font-mono">
                    {pointsBackward ? '←' : '→'}
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-rose-500 text-xl">→</span>
                    <span className="rounded-lg border border-rose-800 bg-rose-900/20 px-3 py-2 font-mono text-xs text-rose-300">
                      NULL
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      <div className="flex gap-4 flex-wrap">
        {[
          ['bg-amber-500','curr node'],
          ['bg-cyan-700', isDoubly ? 'new head / reversed side' : 'prev pointer'],
          ['bg-violet-700','saved next pointer'],
        ].map(([c,l]) => (
          <div key={l} className="flex items-center gap-1.5 text-xs">
            <div className={`w-3 h-3 rounded ${c}`} />
            <span className="text-gray-500">{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
