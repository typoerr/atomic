import { AnyFunc, Resolve } from './types'

export function once<Callback extends AnyFunc>(callback: Callback) {
  let invoked = false
  let ret: ReturnType<Callback>
  return (...args: Parameters<Callback>): ReturnType<Callback> => {
    if (!invoked) {
      invoked = true
      return (ret = callback(...args))
    }
    return ret
  }
}

export function before<Callback extends AnyFunc>(n: number, cb: Callback) {
  return (...args: Parameters<Callback>): ReturnType<Callback> | undefined => {
    return --n >= 0 ? cb(...args) : undefined
  }
}

export function after<Callback extends AnyFunc>(n: number, cb: Callback) {
  return (...args: Parameters<Callback>): ReturnType<Callback> | undefined => {
    return --n > 0 ? undefined : cb(...args)
  }
}

export function delayed<Callback extends AnyFunc>(ms: number, cb: Callback) {
  return (...args: Parameters<Callback>) => {
    return new Promise<ReturnType<Callback>>((resolve) => {
      const tid = setTimeout(() => {
        clearTimeout(tid)
        resolve(cb(...args))
      }, ms)
    })
  }
}

export function compose<A extends any[], R>(a: (...args: A) => R): (...args: A) => R
export function compose<A extends any[], B, R>(
  a: (...args: A) => B,
  b: (b: B) => R,
): (...args: A) => R
export function compose<A extends any[], B, C, R>(
  a: (...args: A) => B,
  b: (b: B) => C,
  c: (c: C) => R,
): (...args: A) => R
export function compose<A extends any[], B, C, D, R>(
  a: (...args: A) => B,
  b: (b: B) => C,
  c: (c: C) => D,
  d: (d: D) => R,
): (...args: A) => R
export function compose<A extends any[], B, C, D, E, R>(
  a: (...args: A) => B,
  b: (b: B) => C,
  c: (c: C) => D,
  d: (d: D) => E,
  e: (e: E) => R,
): (...args: A) => R
export function compose<A extends any[], B, C, D, E, F, R>(
  a: (...args: A) => B,
  b: (b: B) => C,
  c: (c: C) => D,
  d: (d: D) => E,
  e: (e: E) => F,
  f: (f: F) => R,
): (...args: A) => R
export function compose(...funcs: AnyFunc[]) {
  return funcs.reduceRight((a, b) => (...args: any[]) => a(b(...args)))
}

compose.async = composeAsync

export function composeAsync<A extends any[], R>(
  a: (...args: A) => R,
): (...args: A) => Promise<Resolve<R>>
export function composeAsync<A extends any[], B, R>(
  a: (...args: A) => B,
  b: (b: Resolve<B>) => R,
): (...args: A) => Promise<Resolve<R>>
export function composeAsync<A extends any[], B, C, R>(
  a: (...args: A) => B,
  b: (b: Resolve<B>) => C,
  c: (c: Resolve<C>) => R,
): (...args: A) => Promise<Resolve<R>>
export function composeAsync<A extends any[], B, C, D, R>(
  a: (...args: A) => B,
  b: (b: Resolve<B>) => C,
  c: (c: Resolve<C>) => D,
  d: (d: Resolve<D>) => R,
): (...args: A) => Promise<Resolve<R>>
export function composeAsync<A extends any[], B, C, D, E, R>(
  a: (...args: A) => B,
  b: (b: Resolve<B>) => C,
  c: (c: Resolve<C>) => D,
  d: (d: Resolve<D>) => E,
  e: (e: Resolve<E>) => R,
): (...args: A) => Promise<Resolve<R>>
export function composeAsync<A extends any[], B, C, D, E, F, R>(
  a: (...args: A) => B,
  b: (b: Resolve<B>) => C,
  c: (c: Resolve<C>) => D,
  d: (d: Resolve<D>) => E,
  e: (e: Resolve<E>) => F,
  f: (f: Resolve<F>) => R,
): (...args: A) => Promise<Resolve<R>>
export function composeAsync(...funcs: AnyFunc[]) {
  return funcs.reduceRight((a, b) => async (...args: any[]) => a(await b(...args)))
}
