import { useState, useMemo } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import BalancedParenVisualizer from '../../components/visualizers/BalancedParenVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { balancedParenthesesCode, generateBalancedParenSteps, defaultParenExpr } from '../../algorithms/stack/balancedParentheses'
import { balancedParenTheory } from '../../data/stackTheory'

const EXAMPLES = ['({[()]})', '({[}])', '((()))', '{[}', '()[]{}']

export default function BalancedParenPage() {
  const [expr, setExpr] = useState(defaultParenExpr)
  const steps = useMemo(() => generateBalancedParenSteps(expr), [expr])
  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  return (
    <AlgoLayout title="Balanced Parentheses" category="Stack" categoryPath="/stack/balanced-paren">
      <AlgorithmTabs
        theory={balancedParenTheory}
        visualizer={BalancedParenVisualizer}
        array={[]} step={cur} code={balancedParenthesesCode} currentStep={cur}
        player={player} steps={steps}
        inputControls={
          <div className="flex flex-wrap gap-3 items-center w-full">
            <label className="text-xs text-gray-500 font-mono">Expression</label>
            <input value={expr} onChange={e => setExpr(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-gray-200 w-56 focus:border-cyan-600 outline-none" />
            <div className="flex gap-2 flex-wrap">
              {EXAMPLES.map(ex => (
                <button key={ex} onClick={() => setExpr(ex)}
                  className="text-xs font-mono px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:border-cyan-700">
                  {ex}
                </button>
              ))}
            </div>
          </div>
        }
        visualizerProps={{ step: cur }}
        timeComplexity="O(n)" spaceComplexity="O(n)"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
