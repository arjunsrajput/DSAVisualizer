import { useState, useMemo } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import ArrayVisualizer from '../../components/visualizers/ArrayVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { generateLinearSteps, linearSearchCode } from '../../algorithms/searching/linearSearch'
import { linearSearchTheory } from '../../data/searchingTheory'

const DEFAULT_ARRAY = [9, 3, 7, 1, 15, 6, 12, 4]

export default function LinearSearchPage() {
  const [inputArr, setInputArr] = useState(DEFAULT_ARRAY.join(', '))
  const [target, setTarget] = useState(7)

  const { array, steps } = useMemo(() => {
    const arr = inputArr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n))
    return { array: arr, steps: generateLinearSteps(arr, target) }
  }, [inputArr, target])

  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  // Input controls JSX
  const inputControls = (
    <>
      <div className="flex items-center gap-2">
        <label className="text-xs text-gray-500 font-mono">Array</label>
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
    <AlgoLayout title="Linear Search" category="Searching" categoryPath="/searching/linear">
      <AlgorithmTabs
        theory={linearSearchTheory}
        visualizer={ArrayVisualizer}
        array={cur?.array || array}
        step={cur}
        code={linearSearchCode}
        currentStep={cur}
        player={player}
        steps={steps}
        inputControls={inputControls}
        timeComplexity="O(n)"
        spaceComplexity="O(1)"
        mode="linear"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
        defaultTab="learn"
      />
    </AlgoLayout>
  )
}
