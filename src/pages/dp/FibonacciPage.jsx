import { useMemo, useState } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import FibonacciVisualizer from '../../components/visualizers/FibonacciVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { fibonacciCode, generateFibonacciSteps } from '../../algorithms/dp/fibonacci'
import { fibonacciTheory } from '../../data/dpTheory'

export default function FibonacciPage() {
  const [n, setN] = useState(8)
  const steps = useMemo(() => generateFibonacciSteps(n), [n])
  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  const inputControls = (
    <div className="flex items-center gap-3 flex-wrap">
      <label className="text-xs text-gray-500 font-mono">n</label>
      <input type="number" min="0" max="20" value={n} onChange={e => setN(Number(e.target.value))}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-cyan-300 w-24 text-center focus:border-cyan-600 outline-none" />
      <span className="text-xs text-gray-500 font-mono">range: 0-20</span>
    </div>
  )

  return (
    <AlgoLayout title="Fibonacci DP" category="Dynamic Programming" categoryPath="/dp/fibonacci">
      <AlgorithmTabs
        theory={fibonacciTheory}
        visualizer={FibonacciVisualizer}
        array={[]}
        step={cur}
        code={fibonacciCode}
        currentStep={cur}
        player={player}
        steps={steps}
        inputControls={inputControls}
        timeComplexity="O(n)"
        spaceComplexity="O(n)"
        note="Each state is solved once and reused"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
