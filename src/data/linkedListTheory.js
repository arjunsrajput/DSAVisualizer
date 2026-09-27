export const reverseLinkedListTheory = {
  name: 'Reverse a Linked List',
  overview: 'Reversing a linked list means making each node point to its predecessor instead of its successor. The iterative 3-pointer approach does this in O(n) time and O(1) space without recursion.',
  concept: 'Maintain three pointers: prev=null, curr=head, next=null. In each step: save curr.next → reverse curr.next to prev → advance prev to curr → advance curr to next.',
  useCase: ['Palindrome linked list check', 'Reversing sentences word by word', 'K-group reversal (advanced)', 'Interview staple question'],
  pros: ['O(1) extra space', 'Single pass', 'Clean 3-pointer logic'],
  cons: ['Destructive — original list is lost unless copied', 'Easy to mess up pointer order'],
  complexity: { time: { best: { notation: 'O(n)', explanation: 'Visit every node once' }, average: { notation: 'O(n)', explanation: 'Visit every node once' }, worst: { notation: 'O(n)', explanation: 'Visit every node once' } }, space: { notation: 'O(1)', explanation: 'Three pointers only' } },
  characteristics: [{ label: 'Pointers', value: 'prev, curr, next' }, { label: 'Key step', value: 'Save next before overwriting' }, { label: 'Loop termination', value: 'curr === null' }],
  workedExample: {
    array: [1, 2, 3, 4],
    trace: [
      { step: 1, prev: 'null', curr: 1, next: 2, action: 'Save 2, set 1.next = null' },
      { step: 2, prev: 1, curr: 2, next: 3, action: 'Save 3, set 2.next = 1' },
      { step: 3, prev: 2, curr: 3, next: 4, action: 'Save 4, set 3.next = 2' },
      { step: 4, prev: 3, curr: 4, next: 'null', action: 'Set 4.next = 3; curr becomes null' },
    ],
    result: 'The new head is 4 and the final list is 4 -> 3 -> 2 -> 1.',
  },
  realExample: {
    title: 'Undo stack replay',
    description: 'A chain of recorded actions can be reversed when the most recent action needs to be processed first.',
    steps: ['Start with oldest-to-newest actions', 'Reverse the links in one pass', 'Replay from the new head'],
  },
}

export const reverseDoublyLinkedListTheory = {
  name: 'Reverse a Doubly Linked List',
  overview: 'Reversing a doubly linked list means swapping the next and prev pointer of every node. After every node is processed, the old tail becomes the new head.',
  concept: 'Maintain curr=head and newHead=null. For each node: save curr.next, set curr.next=curr.prev, set curr.prev=savedNext, move newHead to curr, then advance curr to savedNext.',
  useCase: ['Reverse playlist order', 'Browser history direction changes', 'Deque and bidirectional list operations', 'Interview pointer manipulation practice'],
  pros: ['O(n) time', 'O(1) extra space', 'No need to search for predecessors because prev is available'],
  cons: ['Both pointers must be updated correctly', 'Head and tail must be swapped at the end'],
  complexity: { time: { best: { notation: 'O(n)', explanation: 'Every node must swap its two links' }, average: { notation: 'O(n)', explanation: 'Every node is processed once' }, worst: { notation: 'O(n)', explanation: 'Every node is processed once' } }, space: { notation: 'O(1)', explanation: 'Only curr, next, and newHead pointers are used' } },
  characteristics: [{ label: 'Pointers changed', value: 'prev and next' }, { label: 'New head', value: 'Old tail' }, { label: 'New tail', value: 'Old head' }],
  workedExample: {
    array: [1, 2, 3, 4],
    trace: [
      { step: 1, curr: 1, savedNext: 2, action: 'Set 1.next = null and 1.prev = 2' },
      { step: 2, curr: 2, savedNext: 3, action: 'Set 2.next = 1 and 2.prev = 3' },
      { step: 3, curr: 3, savedNext: 4, action: 'Set 3.next = 2 and 3.prev = 4' },
      { step: 4, curr: 4, savedNext: 'null', action: 'Set 4.next = 3 and 4.prev = null' },
    ],
    result: 'The old tail 4 becomes head, producing 4 <-> 3 <-> 2 <-> 1.',
  },
  realExample: {
    title: 'Playlist reverse order',
    description: 'A doubly linked playlist can reverse playback order by swapping every song link.',
    steps: ['Save the original next song', 'Swap next and previous links for current song', 'Move to the saved next song until the old tail becomes head'],
  },
}

export const floydCycleTheory = {
  name: "Floyd's Cycle Detection",
  overview: "Floyd's Cycle Detection Algorithm (Tortoise and Hare) detects cycles in a linked list using two pointers moving at different speeds. If a cycle exists, they must eventually meet. Phase 2 finds the exact cycle entry point.",
  concept: "Phase 1: Move slow by 1 step, fast by 2 steps. If they meet, cycle exists. Phase 2: Reset slow to head. Move both by 1 step at a time — they meet at the cycle's start node.",
  useCase: ['Detecting cycles in linked lists', 'Finding duplicate numbers in arrays (Floyd on indices)', 'Detecting loops in functional iteration', 'Rho algorithm for factorization'],
  pros: ['O(1) extra space — no visited set needed', 'O(n) time', 'Also finds cycle start in Phase 2'],
  cons: ['Only detects one type of cycle structure', 'Phase 2 proof requires mathematical insight'],
  complexity: { time: { best: { notation: 'O(n)', explanation: 'No cycle — traverse full list' }, average: { notation: 'O(n)', explanation: 'Meet after at most cycle-length steps' }, worst: { notation: 'O(n)', explanation: 'Always linear' } }, space: { notation: 'O(1)', explanation: 'Two pointers only' } },
  characteristics: [{ label: 'Phase 1', value: 'Detect: slow+1, fast+2' }, { label: 'Phase 2', value: 'Locate: reset slow, both +1' }, { label: 'Meeting guarantee', value: 'Proven by math (λ and μ)' }],
  workedExample: {
    array: [3, 1, 4, 1, 5, 9],
    trace: [
      { step: 1, slow: 1, fast: 4, phase: 'Detect', action: 'slow moves one edge, fast moves two edges' },
      { step: 2, slow: 4, fast: 5, phase: 'Detect', action: 'Pointers differ, continue' },
      { step: 3, slow: 1, fast: 4, phase: 'Detect', action: 'Pointers differ, continue' },
      { step: 4, slow: 5, fast: 5, phase: 'Detect', action: 'Pointers meet inside the cycle' },
      { step: 5, slow: 3, fast: 5, phase: 'Locate', action: 'Reset slow to head; keep fast at meeting node' },
      { step: 6, slow: 1, fast: 9, phase: 'Locate', action: 'Move both one edge' },
      { step: 7, slow: 4, fast: 4, phase: 'Locate', action: 'Both meet at the cycle start' },
    ],
    result: 'A cycle exists, and the cycle entry is the node with value 4.',
  },
  realExample: {
    title: 'Looping workflow detection',
    description: 'If each workflow state points to the next state, Floyd detects whether the process can loop forever.',
    steps: ['Move one pointer slowly through states', 'Move another pointer twice as fast', 'A meeting means the workflow has a loop'],
  },
}

export const mergeSortedTheory = {
  name: 'Merge Two Sorted Lists',
  overview: 'Given two sorted linked lists, merge them into a single sorted linked list without using extra space for a new list. This is the merge step of merge sort applied to linked lists.',
  concept: 'Use a dummy head and a current pointer. Compare the front elements of both lists, attach the smaller to current.next, and advance that list pointer. When one list is exhausted, attach the remaining list directly.',
  useCase: ['Merge sort for linked lists', 'Merging sorted files', 'K-way merge (priority queue + this)', 'Combining sorted streams'],
  pros: ['O(m+n) time', 'O(1) space — re-links existing nodes', 'Stable — preserves relative order'],
  cons: ['Destructive — modifies original nodes', 'Requires both lists to be sorted'],
  complexity: { time: { best: { notation: 'O(1)', explanation: 'One list empty' }, average: { notation: 'O(m+n)', explanation: 'Compare and link each node' }, worst: { notation: 'O(m+n)', explanation: 'Interleaved values' } }, space: { notation: 'O(1)', explanation: 'Dummy node + current pointer only' } },
  characteristics: [{ label: 'Strategy', value: 'Two-pointer comparison' }, { label: 'Output', value: 'Merged sorted list' }, { label: 'Stable', value: 'Yes (l1 first on tie)' }],
  workedExample: {
    trace: [
      { step: 1, l1: [1, 3, 5], l2: [2, 4, 6], merged: [], action: 'Compare 1 and 2; attach 1' },
      { step: 2, l1: [3, 5], l2: [2, 4, 6], merged: [1], action: 'Compare 3 and 2; attach 2' },
      { step: 3, l1: [3, 5], l2: [4, 6], merged: [1, 2], action: 'Compare 3 and 4; attach 3' },
      { step: 4, l1: [5], l2: [4, 6], merged: [1, 2, 3], action: 'Compare 5 and 4; attach 4' },
      { step: 5, l1: [5], l2: [6], merged: [1, 2, 3, 4], action: 'Compare 5 and 6; attach 5' },
      { step: 6, l1: [], l2: [6], merged: [1, 2, 3, 4, 5], action: 'Append remaining l2' },
    ],
    result: 'The merged sorted list is 1 -> 2 -> 3 -> 4 -> 5 -> 6.',
  },
  realExample: {
    title: 'Combining sorted event streams',
    description: 'Two already sorted logs can be merged by repeatedly taking the earlier timestamp.',
    steps: ['Compare the two front events', 'Append the earlier event', 'When one log ends, append the rest of the other log'],
  },
}

export const linkedListTheory = {
  name: 'Singly Linked List',
  overview: 'A Singly Linked List is a linear data structure where each node stores a value and a pointer to the next node. Unlike arrays, nodes are not stored contiguously — they are connected by pointers.',
  concept: 'Head points to first node. Each node has val and next. Traversal: start at head, follow next pointers until null. Insert at head: O(1). Insert at tail/middle: O(n) to find position.',
  useCase: ['Dynamic memory allocation', 'Implementing stacks and queues', 'Undo functionality', 'Hash chaining'],
  pros: ['Dynamic size — no reallocation', 'O(1) insert/delete at head', 'Memory efficient for dynamic data'],
  cons: ['O(n) random access (no indexing)', 'Extra memory for pointers', 'Cache-unfriendly (non-contiguous)'],
  complexity: { time: { best: { notation: 'O(1)', explanation: 'Insert/delete at head' }, average: { notation: 'O(n)', explanation: 'Traversal, search, insert at position' }, worst: { notation: 'O(n)', explanation: 'Operations at tail' } }, space: { notation: 'O(n)', explanation: 'n nodes + n pointers' } },
  characteristics: [{ label: 'Direction', value: 'Forward only' }, { label: 'Head insert', value: 'O(1)' }, { label: 'Random access', value: 'O(n)' }],
  workedExample: {
    trace: [
      { step: 1, head: 'null', operation: 'insertHead(10)', action: 'Create 10 and make head point to it' },
      { step: 2, head: 10, operation: 'insertTail(20)', action: 'Walk to tail 10, set 10.next = 20' },
      { step: 3, head: 10, operation: 'insertHead(5)', action: 'Set 5.next = old head, then head = 5' },
      { step: 4, head: 5, operation: 'delete(10)', action: 'Find predecessor 5 and bypass 10' },
    ],
    result: 'The final list is 5 -> 20 -> null.',
  },
  realExample: {
    title: 'Hash table chaining',
    description: 'When multiple keys map to the same bucket, a linked list can store all entries in that bucket.',
    steps: ['Hash key to a bucket', 'Insert the entry at the bucket head', 'Search by traversing only that bucket chain'],
  },
}

export const doublyLinkedListTheory = {
  name: 'Doubly Linked List',
  overview: 'A Doubly Linked List extends the singly linked list by adding a prev pointer to each node, allowing traversal in both directions.',
  concept: 'Each node has val, next, and prev. Head.prev = null. Tail.next = null. Bidirectional traversal enables O(1) delete given a node reference.',
  useCase: ['Browser forward/back navigation', 'LRU Cache (O(1) insert/delete)', 'Text editor cursor movement', 'Music playlist'],
  pros: ['O(1) delete given node reference', 'Bidirectional traversal', 'Easier reverse traversal'],
  cons: ['Extra memory for prev pointers', 'More complex insert/delete (update both pointers)'],
  complexity: { time: { best: { notation: 'O(1)', explanation: 'Insert/delete with node reference' }, average: { notation: 'O(n)', explanation: 'Search and positional operations' }, worst: { notation: 'O(n)', explanation: 'Operations at opposite end' } }, space: { notation: 'O(n)', explanation: 'n nodes + 2n pointers' } },
  characteristics: [{ label: 'Direction', value: 'Bidirectional' }, { label: 'Extra pointer', value: 'prev' }, { label: 'Delete by ref', value: 'O(1)' }],
  workedExample: {
    trace: [
      { step: 1, operation: 'insertTail(10)', prevUpdate: '10.prev = null', nextUpdate: 'head = tail = 10', action: 'First node is both head and tail' },
      { step: 2, operation: 'insertTail(20)', prevUpdate: '20.prev = 10', nextUpdate: '10.next = 20', action: 'Tail moves to 20' },
      { step: 3, operation: 'insertHead(5)', prevUpdate: '10.prev = 5', nextUpdate: '5.next = 10', action: 'Head moves to 5' },
      { step: 4, operation: 'delete(10)', prevUpdate: '20.prev = 5', nextUpdate: '5.next = 20', action: 'Both neighboring links skip 10' },
    ],
    result: 'The final forward list is 5 -> 20, and backward traversal is 20 -> 5.',
  },
  realExample: {
    title: 'Browser history navigation',
    description: 'Each page can point to the previous page and the next page, making back and forward navigation direct.',
    steps: ['Visit pages and append them after the current page', 'Back follows prev links', 'Forward follows next links'],
  },
}

export const circularLinkedListTheory = {
  name: 'Circular Linked List',
  overview: 'A Circular Linked List is a linked list where the last node points back to the head, forming a circle. Traversal never reaches null — it loops forever unless you track the starting point.',
  concept: 'Tail.next = head (not null). To detect end of list, compare current.next to head. Useful when you need to cycle through elements repeatedly.',
  useCase: ['Round-robin scheduling', 'Circular buffers', 'Multi-player game turn management', 'Josephus problem'],
  pros: ['Continuous traversal without resetting', 'O(1) access to both head and tail via tail pointer', 'Natural for cyclic processes'],
  cons: ['Must track start to avoid infinite loops', 'Slightly more complex insert/delete'],
  complexity: { time: { best: { notation: 'O(1)', explanation: 'Insert at head/tail' }, average: { notation: 'O(n)', explanation: 'Search and positional operations' }, worst: { notation: 'O(n)', explanation: 'Full traversal' } }, space: { notation: 'O(n)', explanation: 'n nodes, no null tail pointer needed' } },
  characteristics: [{ label: 'Tail.next', value: 'Points to head' }, { label: 'Null', value: 'Never reached' }, { label: 'Traversal end', value: 'When back to head' }],
  workedExample: {
    trace: [
      { step: 1, operation: 'insertTail(10)', head: 10, tailNext: 10, action: 'First node points to itself' },
      { step: 2, operation: 'insertTail(20)', head: 10, tailNext: 10, action: '20 becomes tail and 20.next points to head' },
      { step: 3, operation: 'insertHead(5)', head: 5, tailNext: 5, action: 'Tail link is updated to the new head' },
      { step: 4, operation: 'traverse()', visited: [5, 10, 20], action: 'Stop when the next node would return to head' },
    ],
    result: 'The circular list is 5 -> 10 -> 20 -> back to 5.',
  },
  realExample: {
    title: 'Round-robin scheduling',
    description: 'After the last process gets CPU time, the scheduler naturally returns to the first process.',
    steps: ['Run the current process for one time slice', 'Move to current.next', 'After tail, next points back to head'],
  },
}
