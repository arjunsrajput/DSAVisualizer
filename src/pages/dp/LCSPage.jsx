import { useMemo, useState } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import DPTableVisualizer from '../../components/visualizers/DPTableVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { generateLCSSteps, lcsCode } from '../../algorithms/dp/lcs'
import { lcsTheory } from '../../data/dpTheory'

export default function LCSPage() {
  const [stringA, setStringA] = useState('ABCDGH')
  const [stringB, setStringB] = useState('AEDFHR')
  const steps = useMemo(() => generateLCSSteps(stringA, stringB), [stringA, stringB])
  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  const inputControls = (
    <div className="flex items-center gap-3 flex-wrap">
      <label className="text-xs text-gray-500 font-mono">String A</label>
      <input value={stringA} onChange={e => setStringA(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-cyan-300 w-36 focus:border-cyan-600 outline-none" />
      <label className="text-xs text-gray-500 font-mono">String B</label>
      <input value={stringB} onChange={e => setStringB(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-amber-300 w-36 focus:border-cyan-600 outline-none" />
      <span className="text-xs text-gray-500 font-mono">letters only, max 10 each</span>
    </div>
  )

  return (
    <AlgoLayout title="Longest Common Subsequence" category="Dynamic Programming" categoryPath="/dp/lcs">
      <AlgorithmTabs
        theory={lcsTheory}
        visualizer={DPTableVisualizer}
        array={[]}
        step={cur}
        code={lcsCode}
        currentStep={cur}
        player={player}
        steps={steps}
        inputControls={inputControls}
        timeComplexity="O(mn)"
        spaceComplexity="O(mn)"
        note="Match uses diagonal + 1; mismatch uses max of top and left"
        mode="lcs"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
