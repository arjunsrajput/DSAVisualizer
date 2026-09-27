import { useState, useEffect, useRef, useCallback, useDeferredValue } from 'react'
import usePlayerStore from '../store/usePlayerStore'

export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

export function useAlgorithmPlayer(steps) {
  const { speedMs } = usePlayerStore()
  const [stepIdx, setStepIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const timerRef = useRef(null)
  const isJumping = useRef(false)

  const clearTimer = () => { if (timerRef.current) clearInterval(timerRef.current) }

  useEffect(() => {
    setStepIdx(0)
    setPlaying(false)
  }, [steps])

  useEffect(() => {
    clearTimer()
    if (playing && steps.length > 0) {
      timerRef.current = setInterval(() => {
        setStepIdx(prev => {
          if (prev >= steps.length - 1) { setPlaying(false); return prev }
          return prev + 1
        })
      }, speedMs)
    }
    return clearTimer
  }, [playing, steps, speedMs])

  // keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'ArrowRight') { setPlaying(false); setStepIdx(p => Math.min(steps.length - 1, p + 1)) }
      if (e.key === 'ArrowLeft')  { setPlaying(false); setStepIdx(p => Math.max(0, p - 1)) }
      if (e.key === ' ')          { e.preventDefault(); setPlaying(p => !p) }
      if (e.key === 'r' || e.key === 'R') { setPlaying(false); setStepIdx(0) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [steps.length])

  const play  = useCallback(() => setPlaying(true), [])
  const pause = useCallback(() => setPlaying(false), [])
  const toggle= useCallback(() => setPlaying(p => !p), [])
  const prev  = useCallback(() => { setPlaying(false); setStepIdx(p => Math.max(0, p - 1)) }, [])
  const next  = useCallback(() => { setPlaying(false); setStepIdx(p => Math.min(steps.length - 1, p + 1)) }, [steps.length])
  const reset = useCallback(() => { setPlaying(false); setStepIdx(0) }, [])
  const goTo  = useCallback((idx) => {
    isJumping.current = true
    setPlaying(false)
    setStepIdx(Math.max(0, Math.min(steps.length - 1, idx)))
    setTimeout(() => { isJumping.current = false }, 50)
  }, [steps.length])

  const currentStep = steps[stepIdx] || null
  const progress = steps.length ? ((stepIdx + 1) / steps.length) * 100 : 0
  const isFirst = stepIdx === 0
  const isLast  = stepIdx >= steps.length - 1

  return { stepIdx, playing, currentStep, progress, isFirst, isLast, play, pause, toggle, prev, next, reset, goTo, isJumping }
}
