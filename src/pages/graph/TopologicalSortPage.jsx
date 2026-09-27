import { useMemo } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import DirectedGraphVisualizer from '../../components/visualizers/DirectedGraphVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { topologicalSortCode, generateTopologicalSortSteps, defaultDAG } from '../../algorithms/graph/topologicalSort'
import { topologicalSortTheory } from '../../data/graphTheory'

export default function TopologicalSortPage() {
  const steps = useMemo(() => generateTopologicalSortSteps(defaultDAG), [])
  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  return (
    <AlgoLayout title="Topological Sort" category="Graph" categoryPath="/graph/topological">
      <AlgorithmTabs
        theory={topologicalSortTheory}
        visualizer={DirectedGraphVisualizer}
        array={[]} step={cur} code={topologicalSortCode} currentStep={cur}
        player={player} steps={steps}
        visualizerProps={{ step: cur, graphDef: defaultDAG, title: 'DAG — Topological Sort' }}
        timeComplexity="O(V+E)" spaceComplexity="O(V)"
        note="Only valid for Directed Acyclic Graphs (DAGs)"
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
