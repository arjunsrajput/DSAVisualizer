import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const formatHeader = (key) =>
  key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

const formatValue = (value) => {
  if (Array.isArray(value)) return `[${value.join(', ')}]`
  return String(value)
}

export default function LearnTab({ theory }) {
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    complexity: true,
    example: true,
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const workedExample = theory.workedExample
  const trace = workedExample?.trace || []
  const comparisonRows = theory.comparisonTable?.data || []
  const comparisonColumns = comparisonRows.length > 0 ? Object.keys(comparisonRows[0]) : []

  return (
    <div className="space-y-4 pb-8">
      {/* Overview Section */}
      <div className="panel">
        <button
          onClick={() => toggleSection('overview')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-750 transition-colors"
        >
          <h3 className="text-lg font-bold text-cyan-300">Overview</h3>
          <ChevronDown size={20} className={`transition-transform ${expandedSections.overview ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.overview && (
          <div className="px-4 pb-4 border-t border-gray-700 pt-4 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-2">What is it?</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{theory.overview}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Core Concept</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{theory.concept}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-2">When to use?</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                {theory.useCase.map((use, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-emerald-400 mb-2">✓ Pros</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  {theory.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">+</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-rose-400 mb-2">✗ Cons</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  {theory.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 mt-1">-</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Complexity Analysis */}
      <div className="panel">
        <button
          onClick={() => toggleSection('complexity')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-750 transition-colors"
        >
          <h3 className="text-lg font-bold text-cyan-300">Complexity Analysis</h3>
          <ChevronDown size={20} className={`transition-transform ${expandedSections.complexity ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.complexity && (
          <div className="px-4 pb-4 border-t border-gray-700 pt-4 space-y-4">
            {/* Time Complexity */}
            <div>
              <h4 className="text-sm font-semibold text-cyan-300 mb-3">Time Complexity</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-800 rounded p-3 border-l-2 border-blue-500">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono font-semibold text-blue-300">Best: {theory.complexity.time.best.notation}</span>
                  </div>
                  <p className="text-gray-400 text-xs">{theory.complexity.time.best.explanation}</p>
                </div>
                <div className="bg-gray-800 rounded p-3 border-l-2 border-amber-500">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono font-semibold text-amber-300">Average: {theory.complexity.time.average.notation}</span>
                  </div>
                  <p className="text-gray-400 text-xs">{theory.complexity.time.average.explanation}</p>
                </div>
                <div className="bg-gray-800 rounded p-3 border-l-2 border-rose-500">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono font-semibold text-rose-300">Worst: {theory.complexity.time.worst.notation}</span>
                  </div>
                  <p className="text-gray-400 text-xs">{theory.complexity.time.worst.explanation}</p>
                </div>
              </div>
            </div>

            {/* Space Complexity */}
            <div>
              <h4 className="text-sm font-semibold text-cyan-300 mb-3">Space Complexity</h4>
              <div className="bg-gray-800 rounded p-3 border-l-2 border-green-500">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono font-semibold text-green-300">{theory.complexity.space.notation}</span>
                </div>
                <p className="text-gray-400 text-xs">{theory.complexity.space.explanation}</p>
              </div>
            </div>

            {/* Characteristics */}
            <div>
              <h4 className="text-sm font-semibold text-cyan-300 mb-3">Characteristics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {theory.characteristics.map((char, i) => (
                  <div key={i} className="bg-gray-800 rounded p-2 text-center">
                    <p className="text-xs text-gray-400 mb-1">{char.label}</p>
                    <p className="text-xs font-semibold text-cyan-300">{char.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Worked Example */}
      <div className="panel">
        <button
          onClick={() => toggleSection('example')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-750 transition-colors"
        >
          <h3 className="text-lg font-bold text-cyan-300">Worked Example</h3>
          <ChevronDown size={20} className={`transition-transform ${expandedSections.example ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.example && (
          <div className="px-4 pb-4 border-t border-gray-700 pt-4 space-y-4">
            {/* Array and Target */}
            {workedExample && (
              <div>
                <h4 className="text-sm font-semibold text-cyan-300 mb-2">Input</h4>
                <div className="bg-gray-800 rounded p-3 font-mono text-sm space-y-1">
                  {Array.isArray(workedExample.array) && (
                    <p className="text-gray-300">Array: <span className="text-blue-300">[{workedExample.array.join(', ')}]</span></p>
                  )}
                  {workedExample.target !== undefined && (
                    <p className="text-gray-300">Target: <span className="text-orange-300">{workedExample.target}</span></p>
                  )}
                </div>
              </div>
            )}

            {/* Trace */}
            {trace.length > 0 && (
              <div>
              <h4 className="text-sm font-semibold text-cyan-300 mb-2">Trace</h4>
              <div className="space-y-2">
                {trace.map((t, i) => (
                  <div key={i} className="bg-gray-800 rounded p-3 text-sm">
                    {(t.step !== undefined && t.index !== undefined && t.value !== undefined) && (
                      <>
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <span className="text-gray-400 font-mono">Step {t.step}</span>
                          <span className="text-cyan-300 font-mono">Index: {t.index}</span>
                          <span className={typeof t.action === 'string' && t.action.toUpperCase().includes('FOUND') ? 'text-emerald-400' : 'text-gray-400'}>
                            {t.action}
                          </span>
                        </div>
                        <p className="text-gray-300">arr[{t.index}] = {t.value}, Comparison: <span className="text-amber-300">{t.comparison}</span></p>
                      </>
                    )}
                    {(t.iteration !== undefined && t.low !== undefined && t.high !== undefined && t.mid !== undefined) && (
                      <>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400 font-mono">Iteration {t.iteration}</span>
                          <span className={typeof t.action === 'string' && t.action.toUpperCase().includes('FOUND') ? 'text-emerald-400' : 'text-gray-400'}>
                            {t.action}
                          </span>
                        </div>
                        <div className="text-gray-300 font-mono text-xs space-y-1">
                          <p>low={t.low}, high={t.high}, mid={t.mid} (value: {t.midValue})</p>
                          <p>Comparison: <span className="text-amber-300">{t.comparison}</span></p>
                        </div>
                      </>
                    )}
                    {!((t.step !== undefined && t.index !== undefined && t.value !== undefined) || (t.iteration !== undefined && t.low !== undefined && t.high !== undefined && t.mid !== undefined)) && (
                      <div className="space-y-1 text-xs font-mono">
                        {Object.entries(t).map(([key, value]) => (
                          <p key={key} className="text-gray-300">
                            <span className="text-cyan-300">{formatHeader(key)}:</span>{' '}
                            <span className="text-gray-400">{formatValue(value)}</span>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              </div>
            )}

            {/* Result */}
            {workedExample?.result && (
              <div className="bg-emerald-900/30 border border-emerald-700 rounded p-3">
                <p className="text-sm text-emerald-300 font-semibold">Result</p>
                <p className="text-sm text-emerald-200">{workedExample.result}</p>
              </div>
            )}

            {/* Real World Example */}
            {theory.realExample && (
              <div>
                <h4 className="text-sm font-semibold text-cyan-300 mb-2">Real World Example</h4>
                <div className="bg-gray-800 rounded p-3">
                  <p className="text-sm font-semibold text-amber-300 mb-2">{theory.realExample.title}</p>
                  <p className="text-sm text-gray-400 mb-3">{theory.realExample.description}</p>
                  <ol className="text-sm text-gray-400 space-y-1 ml-4">
                    {theory.realExample.steps.map((step, i) => (
                      <li key={i} className="list-decimal">{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {/* Comparison Table */}
            {theory.comparisonTable && (
              <div>
                <h4 className="text-sm font-semibold text-cyan-300 mb-2">{theory.comparisonTable.title}</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-700">
                        {comparisonColumns.map((column, idx) => (
                          <th
                            key={column}
                            className={`${idx === 0 ? 'text-left' : 'text-center'} py-2 px-2 text-gray-400`}
                          >
                            {formatHeader(column)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row, i) => (
                        <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/50">
                          {comparisonColumns.map((column, idx) => (
                            <td
                              key={column}
                              className={`${idx === 0 ? 'text-left' : 'text-center'} py-2 px-2 text-gray-300 font-mono`}
                            >
                              {formatValue(row[column])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
