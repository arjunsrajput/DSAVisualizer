function Section({ title, items, tone = 'cyan' }) {
  if (!items || items.length === 0) return null

  const toneClass = {
    cyan: 'text-cyan-300 border-cyan-800 bg-cyan-900/20',
    amber: 'text-amber-300 border-amber-800 bg-amber-900/20',
    rose: 'text-rose-300 border-rose-800 bg-rose-900/20',
    emerald: 'text-emerald-300 border-emerald-800 bg-emerald-900/20',
    blue: 'text-blue-300 border-blue-800 bg-blue-900/20',
  }[tone]

  return (
    <div className="panel p-4">
      <h3 className={`text-sm font-semibold mb-3 ${toneClass.split(' ')[0]}`}>{title}</h3>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className={`rounded border px-3 py-2 text-sm leading-relaxed ${toneClass}`}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

function PatternCard({ pattern }) {
  if (!pattern) return null
  const entries = Object.entries(pattern).filter(([, value]) => {
    if (Array.isArray(value)) return value.length > 0
    return value !== undefined && value !== null && value !== ''
  })
  if (entries.length === 0) return null

  return (
    <div className="panel p-4">
      <h3 className="text-sm font-semibold text-cyan-300 mb-3">Pattern Card</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {entries.map(([key, value]) => (
          <div key={key} className="rounded border border-gray-800 bg-gray-800/40 p-3">
            <div className="text-[11px] uppercase tracking-widest text-gray-500 font-mono mb-1">
              {key.replace(/([A-Z])/g, ' $1')}
            </div>
            {Array.isArray(value) ? (
              <ul className="space-y-1 text-sm text-gray-300">
                {value.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            ) : (
              <p className="text-sm text-gray-300 font-mono">{value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TipsTab({ tips }) {
  if (!tips) {
    return (
      <div className="panel p-4">
        <p className="text-sm text-gray-400">Tips are not available for this algorithm yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 pb-8">
      {tips.memoryHook && (
        <div className="panel p-4 border-cyan-800 bg-cyan-900/10">
          <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-2">Memory Hook</div>
          <p className="text-lg text-cyan-200 font-semibold">{tips.memoryHook}</p>
        </div>
      )}

      <PatternCard pattern={tips.pattern} />
      <Section title="Recognition Cues" items={tips.recognition} tone="cyan" />
      <Section title="Common Pitfalls" items={tips.pitfalls} tone="rose" />
      <Section title="Interview Tricks" items={tips.tricks} tone="amber" />
      <Section title="Edge Cases" items={tips.edgeCases} tone="blue" />
      <Section title="Space Optimization" items={tips.optimizations} tone="emerald" />
      <Section title="When Not To Use" items={tips.whenNotToUse} tone="rose" />
    </div>
  )
}
