function getActionLabel(step) {
  if (step?.operation) {
    return step.value !== undefined
      ? `${step.operation}(${step.value})`
      : `${step.operation}()`
  }

  if (step?.swapping?.length === 2) {
    const [a, b] = step.swapping
    return `Swap [${a}] ↔ [${b}]`
  }

  if (step?.comparing?.length === 2) {
    const [a, b] = step.comparing
    return `Compare [${a}] vs [${b}]`
  }

  if (typeof step?.description === 'string') {
    if (step.description.includes('Found')) return 'Found'
    if (step.description.includes('sorted') || step.description.includes('complete')) return 'Complete'
    if (step.description.includes('Compar')) return 'Compare'
    if (step.description.includes('Swap')) return 'Swap'
  }

  return 'Update'
}

function formatList(items) {
  if (!items || items.length === 0) return '[]'
  return `[${items.join(', ')}]`
}

function getSnapshot(step) {
  if (Array.isArray(step?.array)) return formatList(step.array)
  if (Array.isArray(step?.stack)) return `stack: ${formatList(step.stack)}`
  if (Array.isArray(step?.queue)) return `queue: ${formatList(step.queue)}`

  if (Array.isArray(step?.nodes)) {
    if (step.nodes.length === 0) return 'nodes: []'
    if (typeof step.nodes[0] === 'number') return `nodes: ${formatList(step.nodes)}`
    if (typeof step.nodes[0] === 'object') {
      const vals = step.nodes.map((n) => n.val ?? n.id).filter((v) => v !== undefined)
      return `nodes: ${formatList(vals)}`
    }
  }

  if (step?.nodeStatus) {
    const visited = Object.entries(step.nodeStatus)
      .filter(([, status]) => status === 'visited')
      .map(([id]) => id)
    const queued = Object.entries(step.nodeStatus)
      .filter(([, status]) => status === 'queued')
      .map(([id]) => id)

    const visitedPart = `visited=${formatList(visited)}`
    const queuedPart = queued.length ? ` queued=${formatList(queued)}` : ''
    return `${visitedPart}${queuedPart}`
  }

  return step?.description || 'State updated'
}

export default function StepLog({ steps, currentStepIdx, onSelectStep, title = 'Step Log' }) {
  if (!steps || steps.length === 0) return null

  const visible = steps
    .slice(0, currentStepIdx + 1)
    .map((step, idx) => ({ step, idx }))
    .reverse()

  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-cyan-300">{title}</h3>
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
                {getSnapshot(step)}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
