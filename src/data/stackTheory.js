export const balancedParenTheory = {
  name: 'Balanced Parentheses',
  overview: 'The Balanced Parentheses problem checks whether every opening bracket has a matching closing bracket in the correct order. A stack is used to track unmatched opening brackets.',
  concept: 'Scan left to right. Push every opening bracket onto the stack. For every closing bracket, pop the stack and verify it matches. At the end, the stack must be empty.',
  useCase: ['Compiler syntax validation', 'HTML/XML tag matching', 'Math expression validation'],
  pros: ['O(n) time', 'Simple stack-based logic', 'Easy to extend to any bracket type'],
  cons: ['Stack space O(n) in worst case'],
  complexity: { time: { best: { notation: 'O(1)', explanation: 'First char is unmatched closing' }, average: { notation: 'O(n)', explanation: 'Scan entire string' }, worst: { notation: 'O(n)', explanation: 'Scan entire string' } }, space: { notation: 'O(n)', explanation: 'Stack up to n/2 elements' } },
  characteristics: [{ label: 'Data Structure', value: 'Stack' }, { label: 'Strategy', value: 'Match last opened' }, { label: 'Edge case', value: 'Empty string is valid' }],
}

export const infixPostfixTheory = {
  name: 'Infix to Postfix Conversion',
  overview: 'Infix notation (A+B) is human-readable but hard for computers. Postfix notation (AB+) eliminates parentheses by embedding operator precedence in position. The Shunting-Yard algorithm converts infix to postfix using a stack.',
  concept: 'Scan expression left to right. Operands go directly to output. Operators are pushed to stack after popping any higher/equal precedence operators. Parentheses define sub-expression boundaries.',
  useCase: ['Expression evaluation in compilers', 'Calculator implementations', 'Parse tree construction'],
  pros: ['Eliminates need for parentheses', 'Easy to evaluate with a stack', 'Foundation of expression parsers'],
  cons: ['Multiple passes needed for complex expressions', 'Tricky precedence and associativity rules'],
  complexity: { time: { best: { notation: 'O(n)', explanation: 'Always linear scan' }, average: { notation: 'O(n)', explanation: 'Always linear scan' }, worst: { notation: 'O(n)', explanation: 'Always linear scan' } }, space: { notation: 'O(n)', explanation: 'Stack depth up to n' } },
  characteristics: [{ label: 'Algorithm', value: 'Shunting-Yard' }, { label: 'Output', value: 'Postfix (RPN)' }, { label: 'Handles', value: '+ - * / ^ ()' }],
}

export const ngeTheory = {
  name: 'Next Greater Element',
  overview: 'For each element in an array, find the first element to its right that is strictly greater. Using a brute force approach is O(n²), but a Monotonic Decreasing Stack solves it in O(n).',
  concept: 'Maintain a stack of indices. For each element arr[i], pop all stack elements where arr[stack.top()] < arr[i] — the NGE for those elements is arr[i]. Then push i. Remaining elements in stack have no NGE (-1).',
  useCase: ['Stock span problem', 'Daily temperature problem', 'Trapping rainwater', 'Largest rectangle in histogram'],
  pros: ['O(n) time — every element pushed and popped at most once', 'Clean single-pass solution'],
  cons: ['Only finds right NGE (modify for left NGE)', 'Not immediately intuitive'],
  complexity: { time: { best: { notation: 'O(n)', explanation: 'Each element pushed/popped once' }, average: { notation: 'O(n)', explanation: 'Amortized O(1) per element' }, worst: { notation: 'O(n)', explanation: 'Even for sorted arrays' } }, space: { notation: 'O(n)', explanation: 'Stack' } },
  characteristics: [{ label: 'Stack type', value: 'Monotonic Decreasing' }, { label: 'Result for max', value: '-1 (no NGE)' }, { label: 'Pattern', value: 'Very common in interviews' }],
}

export const stackTheory = {
  name: 'Stack',
  overview: 'A Stack is a linear data structure following Last In, First Out (LIFO) order. The last element added is the first to be removed. Think of a stack of plates — you add and remove from the top.',
  concept: 'Maintain a top pointer. Push: add element at top, increment top. Pop: decrement top, return element. Peek: return element at top without removing.',
  useCase: ['Function call stack (recursion)', 'Undo/redo in editors', 'Browser history (back button)', 'Expression evaluation', 'DFS traversal'],
  pros: ['O(1) push, pop, peek', 'Simple to implement with array or linked list', 'Naturally models LIFO processes'],
  cons: ['No random access', 'Fixed size if array-based', 'Can overflow if unbounded recursion'],
  complexity: { time: { best: { notation: 'O(1)', explanation: 'Push/pop always O(1)' }, average: { notation: 'O(1)', explanation: 'Push/pop always O(1)' }, worst: { notation: 'O(1)', explanation: 'Push/pop always O(1)' } }, space: { notation: 'O(n)', explanation: 'n elements stored' } },
  characteristics: [{ label: 'Order', value: 'LIFO' }, { label: 'Top access', value: 'O(1)' }, { label: 'Arbitrary access', value: 'O(n)' }],
}

Object.assign(balancedParenTheory, {
  workedExample: {
    trace: [
      { step: 1, char: '(', stack: ['('], action: 'Opening bracket: push to stack' },
      { step: 2, char: '[', stack: ['(', '['], action: 'Opening bracket: push to stack' },
      { step: 3, char: ']', stack: ['('], action: 'Closing bracket matches stack top; pop' },
      { step: 4, char: ')', stack: [], action: 'Closing bracket matches stack top; pop' },
    ],
    result: 'Expression "([])" is balanced because the stack is empty at the end.',
  },
  realExample: {
    title: 'Compiler syntax check',
    description: 'Compilers use this idea to reject expressions with mismatched brackets before parsing deeper.',
    steps: ['Push opening brackets', 'Match each closing bracket with the latest opening bracket', 'Accept only if no unmatched brackets remain'],
  },
})

Object.assign(infixPostfixTheory, {
  workedExample: {
    trace: [
      { step: 1, token: 'A', output: ['A'], stack: [], action: 'Operand goes directly to output' },
      { step: 2, token: '+', output: ['A'], stack: ['+'], action: 'Operator pushed to stack' },
      { step: 3, token: 'B', output: ['A', 'B'], stack: ['+'], action: 'Operand goes directly to output' },
      { step: 4, token: '*', output: ['A', 'B'], stack: ['+', '*'], action: '* has higher precedence than +, push it' },
      { step: 5, token: 'C', output: ['A', 'B', 'C'], stack: ['+', '*'], action: 'Operand goes directly to output' },
      { step: 6, token: 'end', output: ['A', 'B', 'C', '*', '+'], stack: [], action: 'Pop remaining operators' },
    ],
    result: 'Infix A+B*C converts to postfix ABC*+.',
  },
  realExample: {
    title: 'Calculator expression parsing',
    description: 'A calculator can convert human-readable infix into postfix, then evaluate postfix with a stack.',
    steps: ['Send operands to output', 'Use stack for operators and precedence', 'Evaluate postfix from left to right'],
  },
})

Object.assign(ngeTheory, {
  workedExample: {
    array: [2, 1, 2, 4, 3],
    trace: [
      { step: 1, value: 2, stack: [0], result: [-1, -1, -1, -1, -1], action: 'Push index 0' },
      { step: 2, value: 1, stack: [0, 1], result: [-1, -1, -1, -1, -1], action: '1 is not greater than 2, push index 1' },
      { step: 3, value: 2, stack: [0, 2], result: [-1, 2, -1, -1, -1], action: '2 is next greater for value 1' },
      { step: 4, value: 4, stack: [3], result: [4, 2, 4, -1, -1], action: '4 resolves pending 2s' },
      { step: 5, value: 3, stack: [3, 4], result: [4, 2, 4, -1, -1], action: 'No greater value to the right yet' },
    ],
    result: 'Next greater array: [4, 2, 4, -1, -1].',
  },
  realExample: {
    title: 'Daily temperature warmer day',
    description: 'For each day, find the next future day with a warmer temperature.',
    steps: ['Keep unresolved days on a decreasing stack', 'When a warmer day arrives, resolve colder days', 'Unresolved days have no warmer future day'],
  },
})

Object.assign(stackTheory, {
  workedExample: {
    trace: [
      { step: 1, operation: 'push(10)', stack: [10], action: '10 becomes top' },
      { step: 2, operation: 'push(20)', stack: [10, 20], action: '20 becomes top' },
      { step: 3, operation: 'peek()', stack: [10, 20], action: 'Read top value 20 without removing it' },
      { step: 4, operation: 'pop()', stack: [10], action: 'Remove and return 20' },
    ],
    result: 'The last pushed value is the first value popped.',
  },
  realExample: {
    title: 'Undo in an editor',
    description: 'Each edit is pushed onto a stack; undo pops the latest edit first.',
    steps: ['Push every new edit', 'Peek to preview latest action', 'Pop when undo is requested'],
  },
})
