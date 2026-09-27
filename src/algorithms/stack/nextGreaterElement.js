export const nextGreaterElementCode = [
  'function nextGreater(arr) {',
  '  let stack = [], result = Array(arr.length).fill(-1);',
  '  for (let i = 0; i < arr.length; i++) {',
  '    while (stack.length &&',
  '           arr[stack[stack.length-1]] < arr[i]) {',
  '      let idx = stack.pop();',
  '      result[idx] = arr[i];',
  '    }',
  '    stack.push(i);',
  '  }',
  '  return result; // -1 means no greater element',
  '}',
]

export function generateNGESteps(arr) {
  const steps = []
  const stack = []
  const result = new Array(arr.length).fill(-1)

  const snap = (activeIdx, resolvedIdx, activeLine, description) =>
    steps.push({ array: [...arr], stack: [...stack], result: [...result], activeIdx, resolvedIdx, activeLine, description })

  snap(-1, -1, 0, `nextGreater([${arr.join(', ')}]). Monotonic decreasing stack stores indices.`)

  for (let i = 0; i < arr.length; i++) {
    snap(i, -1, 2, `i=${i}, arr[i]=${arr[i]}. Check if it's NGE for stack top.`)

    while (stack.length && arr[stack[stack.length - 1]] < arr[i]) {
      const idx = stack.pop()
      result[idx] = arr[i]
      snap(i, idx, 6, `arr[${idx}]=${arr[idx]} < ${arr[i]} → NGE of arr[${idx}] is ${arr[i]}. result[${idx}]=${arr[i]}`)
    }

    stack.push(i)
    snap(i, -1, 8, `Push index ${i} (val=${arr[i]}) to stack. Stack indices: [${stack.join(', ')}]`)
  }

  snap(-1, -1, 10, `Remaining stack elements have no greater element (result=-1): [${stack.map(i => arr[i]).join(', ')}]`)
  snap(-1, -1, 10, `✓ Result: [${result.join(', ')}]`)
  return steps
}

export const defaultNGEArray = [4, 5, 2, 10, 8, 3, 9]
