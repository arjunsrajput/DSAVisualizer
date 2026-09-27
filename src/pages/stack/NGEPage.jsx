import { useState, useMemo } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import NGEVisualizer from '../../components/visualizers/NGEVisualizer'
import { useAlgorithmPlayer, useDebounce } from '../../hooks/useAlgorithmPlayer'
import { nextGreaterElementCode, generateNGESteps, defaultNGEArray } from '../../algorithms/stack/nextGreaterElement'
import { ngeTheory } from '../../data/stackTheory'

export default function NGEPage() {
  const [input, setInput] = useState(defaultNGEArray.join(', '))
  const debounced = useDebounce(input, 400)
  const steps = useMemo(() => {
    const arr = debounced.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n))
    return generateNGESteps(arr.length ? arr : defaultNGEArray)
  }, [debounced])
  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  return (
    <AlgoLayout title="Next Greater Element" category="Stack" categoryPath="/stack/nge">
      <AlgorithmTabs
        theory={ngeTheory}
        visualizer={NGEVisualizer}
        array={[]} step={cur} code={nextGreaterElementCode} currentStep={cur}
        player={player} steps={steps}
        inputControls={
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500 font-mono">Array</label>
            <input value={input} onChange={e => setInput(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-gray-200 w-72 focus:border-cyan-600 outline-none" />
          </div>
        }
        visualizerProps={{ step: cur }}
        timeComplexity="O(n)" spaceComplexity="O(n)"
        note="Monotonic decreasing stack — every element pushed/popped at most once"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
