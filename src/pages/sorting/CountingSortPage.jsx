import { useState, useMemo } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import CountingSortVisualizer from '../../components/visualizers/CountingSortVisualizer'
import { useAlgorithmPlayer, useDebounce } from '../../hooks/useAlgorithmPlayer'
import { countingSortCode, generateCountingSteps } from '../../algorithms/sorting/countingSort'
import { countingSortTheory } from '../../data/sortingTheory'

const DEFAULT = [4, 2, 2, 8, 3, 3, 1, 6]

export default function CountingSortPage() {
  const [input, setInput] = useState(DEFAULT.join(', '))
  const debounced = useDebounce(input, 400)

  const steps = useMemo(() => {
    const arr = debounced.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n >= 0)
    return generateCountingSteps(arr.length ? arr : DEFAULT)
  }, [debounced])

  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  return (
    <AlgoLayout title="Counting Sort" category="Sorting" categoryPath="/sorting/counting">
      <AlgorithmTabs
        theory={countingSortTheory}
        visualizer={CountingSortVisualizer}
        array={[]} step={cur} code={countingSortCode} currentStep={cur}
        player={player} steps={steps}
        inputControls={
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500 font-mono">Array (non-negative ints)</label>
            <input value={input} onChange={e => setInput(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-gray-200 w-72 focus:border-cyan-600 outline-none" />
          </div>
        }
        visualizerProps={{ step: cur }}
        timeComplexity="O(n+k)" spaceComplexity="O(k)"
        note="k = range of input values"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
