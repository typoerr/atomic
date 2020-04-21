export function identity<T>(a: T, ..._rest: any[]) {
  return a
}

export function constant<T>(v: T) {
  return (..._: any[]) => v
}

/**
 * Check that value is not undefined or null
 */
export function existy<T>(v: T | null | undefined): v is T {
  return v != null
}

/**
 * no operation
 */
export function noop(..._: any[]) {
  /* no operation */
}

/**
 * create array of numbers from start to end.
 */
export function range(end: number): number[]
export function range(start: number, end: number, step?: number): number[]
export function range(a: number, b?: number, c = 1) {
  const [start, end] = arguments.length === 1 ? [0, a] : [a, b!]
  const step = c === 0 ? c : Math.sign(end - start) >= 0 ? Math.abs(c) : Math.abs(c) * -1
  let current = start
  const result: number[] = []
  const comparator = director(start, end, step, result)

  while (comparator(current)) {
    result.push(current)
    current += step
  }
  return result

  function director(start: number, end: number, step: number, result: number[]) {
    if (step === 0) return () => result.length + 1 < end
    if (start <= end) return (cur: number) => cur < end
    return (cur: number) => cur > end
  }
}

/**
 * Throw Error
 */
export function throws<T extends Error>(err: T | string) {
  const _err = typeof err === 'string' ? new Error(err) : err
  throw _err
}
