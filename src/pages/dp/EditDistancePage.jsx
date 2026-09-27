import { useMemo, useState } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import DPTableVisualizer from '../../components/visualizers/DPTableVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { editDistanceCode, generateEditDistanceSteps } from '../../algorithms/dp/editDistance'
import { editDistanceTheory } from '../../data/dpTheory'

export default function EditDistancePage() {
  const [source, setSource] = useState('horse')
  const [target, setTarget] = useState('ros')
  const steps = useMemo(() => generateEditDistanceSteps(source, target), [source, target])
  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  const inputControls = (
    <div className="flex items-center gap-3 flex-wrap">
      <label className="text-xs text-gray-500 font-mono">Source</label>
      <input value={source} onChange={e => setSource(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-cyan-300 w-36 focus:border-cyan-600 outline-none" />
      <label className="text-xs text-gray-500 font-mono">Target</label>
      <input value={target} onChange={e => setTarget(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-amber-300 w-36 focus:border-cyan-600 outline-none" />
      <span className="text-xs text-gray-500 font-mono">letters only, max 10 each</span>
    </div>
  )

  return (
    <AlgoLayout title="Edit Distance" category="Dynamic Programming" categoryPath="/dp/edit-distance">
      <AlgorithmTabs
        theory={editDistanceTheory}
        visualizer={DPTableVisualizer}
        array={[]}
        step={cur}
        code={editDistanceCode}
        currentStep={cur}
        player={player}
        steps={steps}
        inputControls={inputControls}
        timeComplexity="O(mn)"
        spaceComplexity="O(mn)"
        note="Mismatch chooses the cheapest insert, delete, or replace"
        mode="edit"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
