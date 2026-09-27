export const balancedParenthesesCode = [
  'function isBalanced(s) {',
  '  let stack = [];',
  '  let map = { ")":"(", "]":"[", "}":"{" };',
  '  for (let ch of s) {',
  '    if ("([{".includes(ch))',
  '      stack.push(ch);',
  '    else {',
  '      if (stack.pop() !== map[ch])',
  '        return false;',
  '    }',
  '  }',
  '  return stack.length === 0;',
  '}',
]

export function generateBalancedParenSteps(expr) {
  const steps = []
  const stack = []
  const map = { ')': '(', ']': '[', '}': '{' }
  const open = new Set(['(', '[', '{'])
  const close = new Set([')', ']', '}'])
  let valid = true

  const snap = (charIdx, activeLine, description) =>
    steps.push({ expr, charIdx, stack: [...stack], valid, activeLine, description })

  snap(-1, 0, `isBalanced("${expr}") called. Scanning character by character.`)

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i]
    if (open.has(ch)) {
      stack.push(ch)
      snap(i, 5, `'${ch}' is opening bracket → push to stack. Stack: [${stack.join('')}]`)
    } else if (close.has(ch)) {
      const top = stack.pop()
      if (top !== map[ch]) {
        valid = false
        snap(i, 8, `'${ch}' needs '${map[ch]}' but found '${top || 'empty'}' → INVALID!`)
        break
      }
      snap(i, 7, `'${ch}' matches '${top}' → pop. Stack: [${stack.join('')}]`)
    } else {
      snap(i, 3, `'${ch}' is not a bracket, skip.`)
    }
  }

  if (valid) {
    valid = stack.length === 0
    snap(-1, 11, valid ? `✓ Stack empty → BALANCED!` : `✗ Stack not empty (${stack.join('')}) → UNBALANCED!`)
  }

  return steps
}

export const defaultParenExpr = '({[()]})'
export const defaultParenExpr2 = '({[}])'
