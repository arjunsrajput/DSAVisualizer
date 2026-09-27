import { useMemo, useState } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import OneDDPVisualizer from '../../components/visualizers/OneDDPVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { generateLISSteps, lisCode } from '../../algorithms/dp/lis'
import { lisTheory } from '../../data/dpTheory'

const parseNumbers = (input) => input.split(',').map(s => Number(s.trim())).filter(Number.isFinite)

export default function LISPage() {
  const [inputArr, setInputArr] = useState('10, 9, 2, 5, 3, 7, 101, 18')
  const steps = useMemo(() => generateLISSteps(parseNumbers(inputArr)), [inputArr])
  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  const inputControls = (
    <div className="flex items-center gap-3 flex-wrap w-full">
      <label className="text-xs text-gray-500 font-mono">Array</label>
      <input value={inputArr} onChange={e => setInputArr(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-gray-200 w-96 max-w-full focus:border-cyan-600 outline-none" />
    </div>
  )

  return (
    <AlgoLayout title="Longest Increasing Subsequence" category="Dynamic Programming" categoryPath="/dp/lis">
      <AlgorithmTabs
        theory={lisTheory}
        visualizer={OneDDPVisualizer}
        array={[]}
        step={cur}
        code={lisCode}
        currentStep={cur}
        player={player}
        steps={steps}
        inputControls={inputControls}
        timeComplexity="O(n²)"
        spaceComplexity="O(n)"
        note="dp[i] stores the best increasing subsequence ending at i"
        mode="lis"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
