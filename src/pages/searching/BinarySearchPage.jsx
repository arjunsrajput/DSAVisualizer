import { useState, useMemo } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import ArrayVisualizer from '../../components/visualizers/ArrayVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { generateBinarySteps, binarySearchCode } from '../../algorithms/searching/binarySearch'
import { binarySearchTheory } from '../../data/searchingTheory'

const DEFAULT_ARRAY = [2, 5, 8, 12, 16, 23, 38, 45, 72, 91]

export default function BinarySearchPage() {
  const [inputArr, setInputArr] = useState(DEFAULT_ARRAY.join(', '))
  const [target, setTarget] = useState(23)

  const { sorted, steps } = useMemo(() => {
    const arr = inputArr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n))
    const result = generateBinarySteps(arr, target)
    return { sorted: result.sorted, steps: result.steps }
  }, [inputArr, target])

  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  // Input controls JSX
  const inputControls = (
    <>
      <div className="flex items-center gap-2">
        <label className="text-xs text-gray-500 font-mono">Array (will be sorted)</label>
        <input value={inputArr} onChange={e => setInputArr(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-gray-200 w-64 focus:border-cyan-600 outline-none" />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-xs text-gray-500 font-mono">Target</label>
        <input type="number" value={target} onChange={e => setTarget(Number(e.target.value))}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-cyan-400 w-20 text-center focus:border-cyan-600 outline-none" />
      </div>
    </>
  )

  return (
    <AlgoLayout title="Binary Search" category="Searching" categoryPath="/searching/binary">
      <AlgorithmTabs
        theory={binarySearchTheory}
        visualizer={ArrayVisualizer}
        array={cur?.array || sorted}
        step={cur}
        code={binarySearchCode}
        currentStep={cur}
        player={player}
        steps={steps}
        inputControls={inputControls}
        timeComplexity="O(log n)"
        spaceComplexity="O(1)"
        note="⚠ Requires sorted array"
        mode="binary"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
        defaultTab="learn"
      />
    </AlgoLayout>
  )
}
