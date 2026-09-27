const chipBase = 'min-w-10 h-10 px-2 rounded-lg border-2 flex items-center justify-center font-bold font-mono text-sm transition-all duration-300'

function NumberChip({ value, tone = 'default' }) {
  const tones = {
    default: 'bg-slate-700 border-slate-600 text-slate-200',
    median: 'bg-amber-400 border-amber-300 text-gray-900 shadow-md shadow-amber-400/20',
    pivot: 'bg-cyan-500 border-cyan-400 text-white shadow-md shadow-cyan-500/20',
    less: 'bg-violet-900/60 border-violet-600 text-violet-100',
    equal: 'bg-emerald-500 border-emerald-400 text-gray-950',
    greater: 'bg-slate-800 border-slate-600 text-slate-300',
    answer: 'bg-emerald-400 border-emerald-300 text-gray-950 scale-105 shadow-lg shadow-emerald-400/30',
  }

  return <div className={`${chipBase} ${tones[tone] || tones.default}`}>{value}</div>
}

function ChipRow({ values = [], tone, emptyText = 'empty', answerValue = null, getTone }) {
  if (values.length === 0) {
    return <span className="text-xs text-gray-600 font-mono px-2 py-2">{emptyText}</span>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value, index) => (
        <NumberChip
          key={`${value}-${index}`}
          value={value}
          tone={answerValue !== null && value === answerValue ? 'answer' : getTone?.(value) || tone}
        />
      ))}
    </div>
  )
}

function GroupCard({ group }) {
  const showSorted = ['median', 'base', 'answer'].includes(group.role)
  const values = showSorted && group.sorted?.length ? group.sorted : group.values

  return (
    <div className="bg-gray-900/70 border border-gray-700 rounded-lg p-3 min-w-[180px]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500 font-mono">Group {group.id}</span>
        <span className="text-xs text-gray-500 font-mono">size={values.length}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {values.map((value, index) => (
          <NumberChip
            key={`${group.id}-${value}-${index}`}
            value={value}
            tone={showSorted && value === group.median ? (group.role === 'answer' ? 'answer' : 'median') : 'default'}
          />
        ))}
      </div>
      {showSorted && group.median !== undefined && (
        <div className="mt-2 text-xs font-mono text-amber-300">median = {group.median}</div>
      )}
    </div>
  )
}

function PartitionPanel({ partitions, pivot, decision }) {
  if (!partitions) return null

  const decisionText = {
    left: 'Continue inside the less group',
    found: 'Pivot group contains k',
    right: 'Skip less + equal, continue right',
  }[decision]

  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Partition by pivot</span>
        <span className="text-xs font-mono px-2 py-1 rounded border border-cyan-700 bg-cyan-900/30 text-cyan-300">
          pivot = {pivot}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-gray-900/70 border border-violet-800 rounded-lg p-3">
          <div className="text-xs text-violet-300 font-mono mb-2">less ({partitions.less.length})</div>
          <ChipRow values={partitions.less} tone="less" />
        </div>
        <div className="bg-gray-900/70 border border-emerald-800 rounded-lg p-3">
          <div className="text-xs text-emerald-300 font-mono mb-2">equal ({partitions.equal.length})</div>
          <ChipRow values={partitions.equal} tone="equal" />
        </div>
        <div className="bg-gray-900/70 border border-slate-700 rounded-lg p-3">
          <div className="text-xs text-slate-300 font-mono mb-2">greater ({partitions.greater.length})</div>
          <ChipRow values={partitions.greater} tone="greater" />
        </div>
      </div>
      {decisionText && (
        <div className="mt-3 text-xs font-mono text-cyan-300 bg-gray-900 border border-gray-700 rounded px-3 py-2">
          {decisionText}
        </div>
      )}
    </div>
  )
}

function FormulaPanel({ step }) {
  const metrics = step?.metrics
  if (!metrics) return null

  const rankText = metrics.pivotRankStart === metrics.pivotRankEnd
    ? String(metrics.pivotRankStart)
    : `${metrics.pivotRankStart}..${metrics.pivotRankEnd}`

  const decisionText = {
    left: `k=${metrics.originalK} <= ${metrics.lessSize}, so search the less group.`,
    found: `k=${metrics.originalK} falls on pivot rank ${rankText}.`,
    right: `new k = ${metrics.originalK} - (${metrics.lessSize} + ${metrics.equalSize}) = ${metrics.nextK}`,
  }[step?.decision] || `pivot rank = less size + 1 = ${metrics.lessSize} + 1`

  return (
    <div className="panel p-4">
      <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-3">Decision math</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
        <div className="bg-gray-900 border border-gray-700 rounded p-2">
          <div className="text-gray-500">k</div>
          <div className="text-cyan-300">{metrics.originalK}</div>
        </div>
        <div className="bg-gray-900 border border-violet-800 rounded p-2">
          <div className="text-gray-500">less size</div>
          <div className="text-violet-300">{metrics.lessSize}</div>
        </div>
        <div className="bg-gray-900 border border-emerald-800 rounded p-2">
          <div className="text-gray-500">equal size</div>
          <div className="text-emerald-300">{metrics.equalSize}</div>
        </div>
        <div className="bg-gray-900 border border-amber-800 rounded p-2">
          <div className="text-gray-500">pivot rank</div>
          <div className="text-amber-300">{rankText}</div>
        </div>
      </div>
      <div className="mt-3 text-xs font-mono text-gray-300 bg-gray-900 border border-gray-700 rounded px-3 py-2">
        {decisionText}
      </div>
    </div>
  )
}

export default function MedianOfMediansVisualizer({ array, step }) {
  const active = step?.activeArray || array || []
  const groups = step?.groups || []
  const medians = step?.medians || []
  const lessSet = new Set(step?.partitions?.less || [])
  const equalSet = new Set(step?.partitions?.equal || [])
  const greaterSet = new Set(step?.partitions?.greater || [])
  const getActiveTone = (value) => {
    if (step?.pivot !== null && step?.pivot !== undefined && value === step.pivot) return 'pivot'
    if (lessSet.has(value)) return 'less'
    if (equalSet.has(value)) return 'equal'
    if (greaterSet.has(value)) return 'greater'
    return 'default'
  }

  return (
    <div className="space-y-4">
      <div className="panel p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Active array</span>
          <div className="flex gap-2 flex-wrap justify-end">
            {step?.depth !== undefined && (
              <span className="text-xs font-mono px-2 py-1 rounded border border-gray-700 bg-gray-900 text-gray-400">
                depth = {step.depth}
              </span>
            )}
            {step?.k !== undefined && (
              <span className="text-xs font-mono px-2 py-1 rounded border border-cyan-700 bg-cyan-900/30 text-cyan-300">
                k = {step.k}
              </span>
            )}
            {step?.answer !== null && step?.answer !== undefined && (
              <span className="text-xs font-mono px-2 py-1 rounded border border-emerald-700 bg-emerald-900/30 text-emerald-300">
                answer = {step.answer}
              </span>
            )}
          </div>
        </div>
        <ChipRow values={active} tone="default" answerValue={step?.answer ?? null} getTone={getActiveTone} />
      </div>

      {groups.length > 0 && (
        <div className="panel p-4">
          <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-3">Groups of 5</div>
          <div className="flex flex-wrap gap-3">
            {groups.map(group => <GroupCard key={group.id} group={group} />)}
          </div>
        </div>
      )}

      {medians.length > 0 && (
        <div className="panel p-4">
          <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-3">Medians row</div>
          <ChipRow values={medians} tone="median" />
        </div>
      )}

      <PartitionPanel partitions={step?.partitions} pivot={step?.pivot} decision={step?.decision} />
      <FormulaPanel step={step} />

      <div className="panel p-3">
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            ['bg-slate-700', 'Element'],
            ['bg-amber-400', 'Group median'],
            ['bg-cyan-500', 'Pivot'],
            ['bg-violet-900', 'Less group'],
            ['bg-emerald-400', 'Answer/equal'],
          ].map(([color, label]) => (
            <div key={label} className="flex items-center gap-1.5 text-xs">
              <div className={`w-3 h-3 rounded ${color} border border-gray-700`} />
              <span className="text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
