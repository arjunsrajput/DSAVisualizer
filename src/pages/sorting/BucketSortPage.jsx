import { useState, useMemo } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import BucketSortVisualizer from '../../components/visualizers/BucketSortVisualizer'
import { useAlgorithmPlayer, useDebounce } from '../../hooks/useAlgorithmPlayer'
import { bucketSortCode, generateBucketSteps } from '../../algorithms/sorting/bucketSort'
import { bucketSortTheory } from '../../data/sortingTheory'

const DEFAULT = [29, 25, 3, 49, 9, 37, 21, 43]

export default function BucketSortPage() {
  const [input, setInput] = useState(DEFAULT.join(', '))
  const debounced = useDebounce(input, 400)

  const steps = useMemo(() => {
    const arr = debounced.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n >= 0)
    return generateBucketSteps(arr.length ? arr : DEFAULT)
  }, [debounced])

  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  return (
    <AlgoLayout title="Bucket Sort" category="Sorting" categoryPath="/sorting/bucket">
      <AlgorithmTabs
        theory={bucketSortTheory}
        visualizer={BucketSortVisualizer}
        array={[]} step={cur} code={bucketSortCode} currentStep={cur}
        player={player} steps={steps}
        inputControls={
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500 font-mono">Array (positive ints)</label>
            <input value={input} onChange={e => setInput(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-gray-200 w-72 focus:border-cyan-600 outline-none" />
          </div>
        }
        visualizerProps={{ step: cur }}
        timeComplexity="O(n+k)" spaceComplexity="O(n+k)"
        note="Best when data is uniformly distributed"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
