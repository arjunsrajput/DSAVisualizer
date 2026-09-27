import { useState, useMemo } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import InfixPostfixVisualizer from '../../components/visualizers/InfixPostfixVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { infixToPostfixCode, generateInfixToPostfixSteps, defaultInfixExpr } from '../../algorithms/stack/infixToPostfix'
import { infixPostfixTheory } from '../../data/stackTheory'

const EXAMPLES = ['A+B*C-D/E', '(A+B)*(C-D)', 'A^B^C', '(A+B)*(C+D)/(E-F)']

export default function InfixPostfixPage() {
  const [expr, setExpr] = useState(defaultInfixExpr)
  const steps = useMemo(() => generateInfixToPostfixSteps(expr), [expr])
  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  return (
    <AlgoLayout title="Infix to Postfix Conversion" category="Stack" categoryPath="/stack/infix-postfix">
      <AlgorithmTabs
        theory={infixPostfixTheory}
        visualizer={InfixPostfixVisualizer}
        array={[]} step={cur} code={infixToPostfixCode} currentStep={cur}
        player={player} steps={steps}
        inputControls={
          <div className="flex flex-wrap gap-3 items-center w-full">
            <label className="text-xs text-gray-500 font-mono">Infix Expression</label>
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
        note="Operator precedence: ^ > * / > + -"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
