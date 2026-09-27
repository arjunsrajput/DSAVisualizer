function getActionLabel(step) {
  if (step?.swapping?.length === 2) {
    const [a, b] = step.swapping
    return `Swap [${a}] ↔ [${b}]`
  }
  if (step?.comparing?.length === 2) {
    const [a, b] = step.comparing
    return `Compare [${a}] vs [${b}]`
  }
  if (typeof step?.description === 'string') {
    if (step.description.includes('Starting')) return 'Start'
    if (step.description.includes('fully sorted')) return 'Complete'
    if (step.description.includes('no swap')) return 'No swap'
  }
  return 'Update'
}

export default function BubbleStepLog({ steps, currentStepIdx, onSelectStep }) {
  if (!steps || steps.length === 0) return null
  const visible = steps
    .slice(0, currentStepIdx + 1)
    .map((step, idx) => ({ step, idx }))
    .reverse()

  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-cyan-300">Step Log</h3>
        <span className="text-xs text-gray-500 font-mono">{visible.length} / {steps.length} steps</span>
      </div>

      <div className="max-h-72 overflow-auto space-y-1">
        {visible.map(({ step, idx }) => {
          const isActive = idx === currentStepIdx
          return (
            <button
              key={idx}
              onClick={() => onSelectStep(idx)}
              className={`w-full text-left rounded-md border px-3 py-2 transition-colors ${
                isActive
                  ? 'border-cyan-500 bg-cyan-900/30'
                  : 'border-gray-800 bg-gray-900 hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-gray-400">Step {idx + 1}</span>
                <span className={`text-xs font-mono ${isActive ? 'text-cyan-300' : 'text-amber-300'}`}>
                  {getActionLabel(step)}
                </span>
              </div>
              <div className="mt-1 text-xs text-slate-300 font-mono break-all">
                [{(step.array || []).join(', ')}]
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
