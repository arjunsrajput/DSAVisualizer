import { useState, useMemo } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import MergeSortedListsVisualizer from '../../components/visualizers/MergeSortedListsVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { mergeSortedListsCode, generateMergeSortedSteps, defaultMergeArr1, defaultMergeArr2 } from '../../algorithms/linkedList/mergeSortedLists'
import { mergeSortedTheory } from '../../data/linkedListTheory'

export default function MergeSortedPage() {
  const [in1, setIn1] = useState(defaultMergeArr1.join(', '))
  const [in2, setIn2] = useState(defaultMergeArr2.join(', '))
  const steps = useMemo(() => {
    const a1 = in1.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n)).sort((a,b)=>a-b)
    const a2 = in2.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n)).sort((a,b)=>a-b)
    return generateMergeSortedSteps(a1.length ? a1 : defaultMergeArr1, a2.length ? a2 : defaultMergeArr2)
  }, [in1, in2])
  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  return (
    <AlgoLayout title="Merge Two Sorted Lists" category="Linked List" categoryPath="/linked-list/merge-sorted">
      <AlgorithmTabs
        theory={mergeSortedTheory}
        visualizer={MergeSortedListsVisualizer}
        array={[]} step={cur} code={mergeSortedListsCode} currentStep={cur}
        player={player} steps={steps}
        inputControls={
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500 font-mono">List 1</label>
              <input value={in1} onChange={e => setIn1(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-gray-200 w-44 focus:border-cyan-600 outline-none" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500 font-mono">List 2</label>
              <input value={in2} onChange={e => setIn2(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-gray-200 w-44 focus:border-cyan-600 outline-none" />
            </div>
            <span className="text-xs text-gray-600 font-mono italic">Lists will be auto-sorted before merging</span>
          </div>
        }
        visualizerProps={{ step: cur }}
        timeComplexity="O(m+n)" spaceComplexity="O(1)"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
