import { useMemo, useState } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import MedianOfMediansVisualizer from '../../components/visualizers/MedianOfMediansVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { generateMedianOfMediansSteps, medianOfMediansCode } from '../../algorithms/searching/medianOfMedians'
import { medianOfMediansTheory } from '../../data/searchingTheory'

const DEFAULT_ARRAY = [12, 3, 5, 7, 19, 26, 4, 15, 9, 1, 30, 18, 11]

export default function MedianOfMediansPage() {
  const [inputArr, setInputArr] = useState(DEFAULT_ARRAY.join(', '))
  const [k, setK] = useState(6)

  const { array, steps } = useMemo(() => {
    const arr = inputArr
      .split(',')
      .map(value => Number(value.trim()))
      .filter(Number.isFinite)

    return { array: arr, steps: generateMedianOfMediansSteps(arr, Number(k)) }
  }, [inputArr, k])

  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  const inputControls = (
    <>
      <div className="flex items-center gap-2">
        <label className="text-xs text-gray-500 font-mono">Array</label>
        <input
          value={inputArr}
          onChange={e => setInputArr(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-gray-200 w-80 max-w-full focus:border-cyan-600 outline-none"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-xs text-gray-500 font-mono">kth smallest</label>
        <input
          type="number"
          min="1"
          max={Math.max(1, array.length)}
          value={k}
          onChange={e => setK(Number(e.target.value))}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-cyan-400 w-20 text-center focus:border-cyan-600 outline-none"
        />
      </div>
    </>
  )

  return (
    <AlgoLayout title="Median of Medians" category="Searching" categoryPath="/searching/median-of-medians">
      <AlgorithmTabs
        theory={medianOfMediansTheory}
        visualizer={MedianOfMediansVisualizer}
        array={cur?.array || array}
        step={cur}
        code={medianOfMediansCode}
        currentStep={cur}
        player={player}
        steps={steps}
        inputControls={inputControls}
        timeComplexity="O(n)"
        spaceComplexity="O(n)"
        note="Deterministic worst-case linear selection"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
        defaultTab="learn"
      />
    </AlgoLayout>
  )
}
