import { useMemo } from 'react'
import AlgoLayout from '../../components/common/AlgoLayout'
import AlgorithmTabs from '../../components/common/AlgorithmTabs'
import StepLog from '../../components/common/StepLog'
import WeightedGraphVisualizer from '../../components/visualizers/WeightedGraphVisualizer'
import { useAlgorithmPlayer } from '../../hooks/useAlgorithmPlayer'
import { bellmanFordCode, generateBellmanFordSteps } from '../../algorithms/graph/bellmanFord'
import { defaultWeightedGraph } from '../../algorithms/graph/dijkstra'
import { bellmanFordTheory } from '../../data/graphTheory'

export default function BellmanFordPage() {
  const steps = useMemo(() => generateBellmanFordSteps(defaultWeightedGraph, 0), [])
  const player = useAlgorithmPlayer(steps)
  const cur = player.currentStep

  return (
    <AlgoLayout title="Bellman-Ford Algorithm" category="Graph" categoryPath="/graph/bellman-ford">
      <AlgorithmTabs
        theory={bellmanFordTheory}
        visualizer={WeightedGraphVisualizer}
        array={[]} step={cur} code={bellmanFordCode} currentStep={cur}
        player={player} steps={steps}
        visualizerProps={{ step: cur, graphDef: defaultWeightedGraph, title: 'Weighted Graph — Bellman-Ford', showDist: true }}
        timeComplexity="O(V·E)" spaceComplexity="O(V)"
        note="Handles negative weights. Can detect negative cycles."
        extraVisualPanel={<StepLog steps={steps} currentStepIdx={player.stepIdx} onSelectStep={player.goTo} />}
      />
    </AlgoLayout>
  )
}
