import { useMemo } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import DirectedGraphVisualizer from '../../components/visualizers/DirectedGraphVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { cycleDetectionCode, generateCycleDetectionSteps, defaultCyclicGraph } from '../../algorithms/graph/cycleDetection'
import { cycleDetectionTheory } from '../../data/graphTheory'

export default function CycleDetectionPage() {
  const steps = useMemo(() => generateCycleDetectionSteps(defaultCyclicGraph), [])
  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  return (
    <AlgoLayout title="Cycle Detection in Directed Graph" category="Graph" categoryPath="/graph/cycle">
      <AlgorithmTabs
        theory={cycleDetectionTheory}
        visualizer={DirectedGraphVisualizer}
        array={[]} step={cur} code={cycleDetectionCode} currentStep={cur}
        player={player} steps={steps}
        visualizerProps={{ step: cur, graphDef: defaultCyclicGraph, title: 'Directed Graph — Cycle Detection' }}
        timeComplexity="O(V+E)" spaceComplexity="O(V)"
        note="Uses 3-coloring: white=unvisited, gray=processing, black=done. Back edge → cycle!"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
