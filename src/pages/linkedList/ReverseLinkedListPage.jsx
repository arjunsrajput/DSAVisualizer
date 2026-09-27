import { useEffect, useState, useMemo } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import ReverseLinkedListVisualizer from '../../components/visualizers/ReverseLinkedListVisualizer'
import { useAlgorithmPlayer, useDebounce } from '../../hooks/useAlgorithmPlayer'
import {
  reverseLinkedListCode,
  reverseDoublyLinkedListCode,
  generateReverseLinkedListSteps,
  generateReverseDoublyLinkedListSteps,
  defaultReverseValues,
} from '../../algorithms/linkedList/reverseLinkedList'
import { reverseLinkedListTheory, reverseDoublyLinkedListTheory } from '../../data/linkedListTheory'

export default function ReverseLinkedListPage({ defaultType = 'singly' }) {
  const [input, setInput] = useState(defaultReverseValues.join(', '))
  const [listType, setListType] = useState(defaultType)

  useEffect(() => {
    setListType(defaultType)
  }, [defaultType])

  const debounced = useDebounce(input, 400)
  const steps = useMemo(() => {
    const arr = debounced.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n))
    const values = arr.length ? arr : defaultReverseValues
    return listType === 'doubly'
      ? generateReverseDoublyLinkedListSteps(values)
      : generateReverseLinkedListSteps(values)
  }, [debounced, listType])
  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep
  const code = listType === 'doubly' ? reverseDoublyLinkedListCode : reverseLinkedListCode
  const title = listType === 'doubly' ? 'Reverse Doubly Linked List' : 'Reverse Singly Linked List'
  const theory = listType === 'doubly' ? reverseDoublyLinkedListTheory : reverseLinkedListTheory
  const categoryPath = listType === 'doubly' ? '/linked-list/reverse-doubly' : '/linked-list/reverse'

  return (
    <AlgoLayout title={title} category="Linked List" categoryPath={categoryPath}>
      <AlgorithmTabs
        theory={theory}
        visualizer={ReverseLinkedListVisualizer}
        array={[]} step={cur} code={code} currentStep={cur}
        player={player} steps={steps}
        inputControls={
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-lg bg-gray-800 border border-gray-700 p-1">
              {[
                ['singly', 'Singly'],
                ['doubly', 'Doubly'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setListType(value)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                    listType === value
                      ? 'bg-cyan-700 text-white'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500 font-mono">Values</label>
              <input value={input} onChange={e => setInput(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm font-mono text-gray-200 w-64 focus:border-cyan-600 outline-none" />
            </div>
          </div>
        }
        visualizerProps={{ step: cur }}
        timeComplexity="O(n)" spaceComplexity="O(1)"
        note={listType === 'doubly' ? 'Swap next and prev for every node, then move head to the old tail' : 'Iterative 3-pointer approach — no extra space'}
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
