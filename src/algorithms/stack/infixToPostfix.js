export const infixToPostfixCode = [
  'function infixToPostfix(expr) {',
  '  let stack = [], output = [];',
  '  let prec = { "+":1, "-":1, "*":2, "/":2, "^":3 };',
  '  for (let ch of expr) {',
  '    if (isOperand(ch))',
  '      output.push(ch);',
  '    else if (ch === "(")',
  '      stack.push(ch);',
  '    else if (ch === ")") {',
  '      while (stack.top() !== "(")',
  '        output.push(stack.pop());',
  '      stack.pop(); // remove "("',
  '    } else {',
  '      while (stack.length && prec[stack.top()] >= prec[ch])',
  '        output.push(stack.pop());',
  '      stack.push(ch);',
  '    }',
  '  }',
  '  while (stack.length) output.push(stack.pop());',
  '  return output.join("");',
  '}',
]

const prec = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 }
const isOperand = (c) => /[a-zA-Z0-9]/.test(c)

export function generateInfixToPostfixSteps(expr) {
  const steps = []
  const stack = []
  const output = []
  const clean = expr.replace(/\s/g, '')

  const snap = (charIdx, activeLine, description) =>
    steps.push({ expr: clean, charIdx, stack: [...stack], output: [...output], activeLine, description })

  snap(-1, 0, `infixToPostfix("${clean}"). Scan left to right. Higher precedence * / > + -.`)

  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i]
    if (isOperand(ch)) {
      output.push(ch)
      snap(i, 5, `'${ch}' is operand → directly to output: [${output.join(' ')}]`)
    } else if (ch === '(') {
      stack.push(ch)
      snap(i, 7, `'(' → push to stack. Stack: [${stack.join(' ')}]`)
    } else if (ch === ')') {
      snap(i, 8, `')' found → pop until '('`)
      while (stack.length && stack[stack.length - 1] !== '(') {
        output.push(stack.pop())
        snap(i, 10, `Pop to output: [${output.join(' ')}]. Stack: [${stack.join(' ')}]`)
      }
      stack.pop()
      snap(i, 11, `Pop '(' from stack (discard). Stack: [${stack.join(' ')}]`)
    } else if (prec[ch] !== undefined) {
      while (stack.length && stack[stack.length - 1] !== '(' && (prec[stack[stack.length - 1]] || 0) >= prec[ch]) {
        output.push(stack.pop())
        snap(i, 14, `Pop higher/equal prec op to output: [${output.join(' ')}]`)
      }
      stack.push(ch)
      snap(i, 15, `Push '${ch}' to stack. Stack: [${stack.join(' ')}]`)
    }
  }

  while (stack.length) {
    output.push(stack.pop())
    snap(-1, 18, `Pop remaining ops to output: [${output.join(' ')}]`)
  }

  snap(-1, 19, `✓ Postfix: "${output.join('')}"`)
  return steps
}

export const defaultInfixExpr = 'A+B*C-D/E'
