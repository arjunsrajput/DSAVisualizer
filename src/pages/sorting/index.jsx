import SortingPage from './SortingPage'
import { bubbleSortCode, generateBubbleSteps } from '../../algorithms/sorting/bubbleSort'
import { selectionSortCode, generateSelectionSteps } from '../../algorithms/sorting/selectionSort'
import { insertionSortCode, generateInsertionSteps } from '../../algorithms/sorting/insertionSort'
import { mergeSortCode, generateMergeSteps } from '../../algorithms/sorting/mergeSort'
import { quickSortCode, generateQuickSteps } from '../../algorithms/sorting/quickSort'
import { heapSortCode, generateHeapSteps } from '../../algorithms/sorting/heapSort'
import { bubbleSortTheory, selectionSortTheory, insertionSortTheory, mergeSortTheory, quickSortTheory, heapSortTheory } from '../../data/sortingTheory'

export function BubbleSortPage() {
  return <SortingPage title="Bubble Sort" theory={bubbleSortTheory} code={bubbleSortCode} generator={generateBubbleSteps}
    timeComplexity="O(n²)" spaceComplexity="O(1)" categoryPath="/sorting/bubble" />
}

export function SelectionSortPage() {
  return <SortingPage title="Selection Sort" theory={selectionSortTheory} code={selectionSortCode} generator={generateSelectionSteps}
    timeComplexity="O(n²)" spaceComplexity="O(1)" categoryPath="/sorting/selection" />
}

export function InsertionSortPage() {
  return <SortingPage title="Insertion Sort" theory={insertionSortTheory} code={insertionSortCode} generator={generateInsertionSteps}
    timeComplexity="O(n²)" spaceComplexity="O(1)" categoryPath="/sorting/insertion" />
}

export function MergeSortPage() {
  return <SortingPage title="Merge Sort" theory={mergeSortTheory} code={mergeSortCode} generator={generateMergeSteps}
    timeComplexity="O(n log n)" spaceComplexity="O(n)" categoryPath="/sorting/merge" />
}

export function QuickSortPage() {
  return <SortingPage title="Quick Sort" theory={quickSortTheory} code={quickSortCode} generator={generateQuickSteps}
    timeComplexity="O(n log n)" spaceComplexity="O(log n)" categoryPath="/sorting/quick" />
}

export function HeapSortPage() {
  return <SortingPage title="Heap Sort" theory={heapSortTheory} code={heapSortCode} generator={generateHeapSteps}
    timeComplexity="O(n log n)" spaceComplexity="O(1)" categoryPath="/sorting/heap" />
}
