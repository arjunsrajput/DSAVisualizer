import { useState, useMemo } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import RadixSortVisualizer from '../../components/visualizers/RadixSortVisualizer'
import { useAlgorithmPlayer, useDebounce } from '../../hooks/useAlgorithmPlayer'
import { radixSortCode, generateRadixSteps } from '../../algorithms/sorting/radixSort'
import { radixSortTheory } from '../../data/sortingTheory'

const DEFAULT = [170, 45, 75, 90, 802, 24, 2, 66]

export default function RadixSortPage() {
  const [input, setInput] = useState(DEFAULT.join(', '))
  const debounced = useDebounce(input, 400)

  const steps = useMemo(() => {
    const arr = debounced.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n >= 0)
    return generateRadixSteps(arr.length ? arr : DEFAULT)
  }, [debounced])

  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  return (
    <AlgoLayout title="Radix Sort" category="Sorting" categoryPath="/sorting/radix">
      <AlgorithmTabs
        theory={radixSortTheory}
        visualizer={RadixSortVisualizer}
        array={[]} step={cur} code={radixSortCode} currentStep={cur}
        player={player} steps={steps}
        inputControls={
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500 font-mono">Array (non-negative)</label>
            <input value={input} onChange={e => setInput(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-gray-200 w-72 focus:border-cyan-600 outline-none" />
          </div>
        }
        visualizerProps={{ step: cur }}
        timeComplexity="O(d·n)" spaceComplexity="O(n+k)"
        note="d = number of digits, k = base (10)"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
