import { useMemo, useState } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import GridDPVisualizer from '../../components/visualizers/GridDPVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { DEFAULT_MIN_PATH_GRID, generateMinPathSumSteps, minPathSumCode } from '../../algorithms/dp/minPathSum'
import { minPathSumTheory } from '../../data/dpTheory'

function parseGrid(input) {
  return input
    .split(';')
    .map(row => row.split(',').map(value => Number(value.trim())).filter(Number.isFinite))
    .filter(row => row.length > 0)
}

export default function MinPathSumPage() {
  const [gridInput, setGridInput] = useState('1,3,1; 1,5,1; 4,2,1')
  const steps = useMemo(() => generateMinPathSumSteps(parseGrid(gridInput)), [gridInput])
  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  const inputControls = (
    <div className="flex items-center gap-3 flex-wrap w-full">
      <label className="text-xs text-gray-500 font-mono">Grid rows</label>
      <input value={gridInput} onChange={e => setGridInput(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-gray-200 w-96 max-w-full focus:border-cyan-600 outline-none" />
      <button onClick={() => setGridInput(DEFAULT_MIN_PATH_GRID.map(row => row.join(',')).join('; '))}
        className="btn-ghost text-xs">Reset Demo</button>
      <span className="text-xs text-gray-500 font-mono">use ; between rows</span>
    </div>
  )

  return (
    <AlgoLayout title="Minimum Path Sum" category="Dynamic Programming" categoryPath="/dp/min-path-sum">
      <AlgorithmTabs
        theory={minPathSumTheory}
        visualizer={GridDPVisualizer}
        array={[]}
        step={cur}
        code={minPathSumCode}
        currentStep={cur}
        player={player}
        steps={steps}
        inputControls={inputControls}
        timeComplexity="O(mn)"
        spaceComplexity="O(mn)"
        note="Each cell takes its cost plus the cheaper of top or left"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
