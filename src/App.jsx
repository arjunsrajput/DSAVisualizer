import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import usePlayerStore from './store/usePlayerStore'
import Home from './pages/Home'
import ContestsPage from './pages/ContestsPage'

// Searching
import LinearSearchPage from './pages/searching/LinearSearchPage'
import BinarySearchPage from './pages/searching/BinarySearchPage'
import MedianOfMediansPage from './pages/searching/MedianOfMediansPage'

// Sorting (existing)
import { BubbleSortPage, SelectionSortPage, InsertionSortPage, MergeSortPage, QuickSortPage, HeapSortPage } from './pages/sorting/index'
// Sorting (new)
import CountingSortPage from './pages/sorting/CountingSortPage'
import RadixSortPage from './pages/sorting/RadixSortPage'
import BucketSortPage from './pages/sorting/BucketSortPage'

// Stack
import StackPage from './pages/stack/StackPage'
import BalancedParenPage from './pages/stack/BalancedParenPage'
import InfixPostfixPage from './pages/stack/InfixPostfixPage'
import NGEPage from './pages/stack/NGEPage'

// Queue
import QueuePage from './pages/queue/QueuePage'
import CircularQueuePage from './pages/queue/CircularQueuePage'
import PriorityQueuePage from './pages/queue/PriorityQueuePage'

// Linked List (existing)
import LinkedListPage from './pages/linkedlist/LinkedListPage'
import DoublyLinkedListPage from './pages/linkedlist/DoublyLinkedListPage'
import CircularLinkedListPage from './pages/linkedlist/CircularLinkedListPage'
// Linked List (new)
import ReverseLinkedListPage from './pages/linkedList/ReverseLinkedListPage'
import FloydCyclePage from './pages/linkedList/FloydCyclePage'
import MergeSortedPage from './pages/linkedList/MergeSortedPage'

// Tree (existing)
import BSTPage from './pages/tree/BSTPage'
// Tree (new)
import TraversalPage from './pages/tree/TraversalPage'
import AVLPage from './pages/tree/AVLPage'

// Dynamic Programming
import FibonacciPage from './pages/dp/FibonacciPage'
import KnapsackPage from './pages/dp/KnapsackPage'
import LCSPage from './pages/dp/LCSPage'
import CoinChangePage from './pages/dp/CoinChangePage'
import LISPage from './pages/dp/LISPage'
import EditDistancePage from './pages/dp/EditDistancePage'
import MinPathSumPage from './pages/dp/MinPathSumPage'

// Graph (existing)
import BFSPage from './pages/graph/BFSPage'
import DFSPage from './pages/graph/DFSPage'
// Graph (new)
import DijkstraPage from './pages/graph/DijkstraPage'
import BellmanFordPage from './pages/graph/BellmanFordPage'
import PrimsPage from './pages/graph/PrimsPage'
import KruskalsPage from './pages/graph/KruskalsPage'
import TopologicalSortPage from './pages/graph/TopologicalSortPage'
import CycleDetectionPage from './pages/graph/CycleDetectionPage'

export default function App() {
  const { theme } = usePlayerStore()

  useEffect(() => {
    document.documentElement.classList.toggle('light-theme', theme === 'light')
  }, [theme])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contests" element={<ContestsPage />} />

        {/* Searching */}
        <Route path="/searching/linear" element={<LinearSearchPage />} />
        <Route path="/searching/binary" element={<BinarySearchPage />} />
        <Route path="/searching/median-of-medians" element={<MedianOfMediansPage />} />
        <Route path="/searching" element={<Navigate to="/searching/linear" replace />} />

        {/* Sorting */}
        <Route path="/sorting/bubble"    element={<BubbleSortPage />} />
        <Route path="/sorting/selection" element={<SelectionSortPage />} />
        <Route path="/sorting/insertion" element={<InsertionSortPage />} />
        <Route path="/sorting/merge"     element={<MergeSortPage />} />
        <Route path="/sorting/quick"     element={<QuickSortPage />} />
        <Route path="/sorting/heap"      element={<HeapSortPage />} />
        <Route path="/sorting/counting"  element={<CountingSortPage />} />
        <Route path="/sorting/radix"     element={<RadixSortPage />} />
        <Route path="/sorting/bucket"    element={<BucketSortPage />} />
        <Route path="/sorting" element={<Navigate to="/sorting/bubble" replace />} />

        {/* Stack */}
        <Route path="/stack"                element={<StackPage />} />
        <Route path="/stack/balanced-paren" element={<BalancedParenPage />} />
        <Route path="/stack/infix-postfix"  element={<InfixPostfixPage />} />
        <Route path="/stack/nge"            element={<NGEPage />} />

        {/* Queue */}
        <Route path="/queue"           element={<QueuePage />} />
        <Route path="/queue/circular"  element={<CircularQueuePage />} />
        <Route path="/queue/priority"  element={<PriorityQueuePage />} />

        {/* Linked List */}
        <Route path="/linked-list"              element={<LinkedListPage />} />
        <Route path="/linked-list/doubly"       element={<DoublyLinkedListPage />} />
        <Route path="/linked-list/circular"     element={<CircularLinkedListPage />} />
        <Route path="/linked-list/reverse"      element={<ReverseLinkedListPage />} />
        <Route path="/linked-list/reverse-doubly" element={<ReverseLinkedListPage defaultType="doubly" />} />
        <Route path="/linked-list/floyd"        element={<FloydCyclePage />} />
        <Route path="/linked-list/merge-sorted" element={<MergeSortedPage />} />

        {/* Tree */}
        <Route path="/tree/bst"        element={<BSTPage />} />
        <Route path="/tree/inorder"    element={<TraversalPage type="inorder" />} />
        <Route path="/tree/preorder"   element={<TraversalPage type="preorder" />} />
        <Route path="/tree/postorder"  element={<TraversalPage type="postorder" />} />
        <Route path="/tree/level-order" element={<TraversalPage type="levelOrder" />} />
        <Route path="/tree/avl"        element={<AVLPage />} />
        <Route path="/tree" element={<Navigate to="/tree/bst" replace />} />

        {/* Dynamic Programming */}
        <Route path="/dp/fibonacci" element={<FibonacciPage />} />
        <Route path="/dp/knapsack"  element={<KnapsackPage />} />
        <Route path="/dp/lcs"       element={<LCSPage />} />
        <Route path="/dp/coin-change" element={<CoinChangePage />} />
        <Route path="/dp/lis" element={<LISPage />} />
        <Route path="/dp/edit-distance" element={<EditDistancePage />} />
        <Route path="/dp/min-path-sum" element={<MinPathSumPage />} />
        <Route path="/dp" element={<Navigate to="/dp/fibonacci" replace />} />

        {/* Graph */}
        <Route path="/graph/bfs"          element={<BFSPage />} />
        <Route path="/graph/dfs"          element={<DFSPage />} />
        <Route path="/graph/dijkstra"     element={<DijkstraPage />} />
        <Route path="/graph/bellman-ford" element={<BellmanFordPage />} />
        <Route path="/graph/prims"        element={<PrimsPage />} />
        <Route path="/graph/kruskals"     element={<KruskalsPage />} />
        <Route path="/graph/topological"  element={<TopologicalSortPage />} />
        <Route path="/graph/cycle"        element={<CycleDetectionPage />} />
        <Route path="/graph" element={<Navigate to="/graph/bfs" replace />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
