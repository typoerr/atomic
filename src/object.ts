import { HashMap, Omit, Assign, Primitive, DeepReadOnly, DeepUnPartial } from './types'

export function idx<T>(src: Iterable<T>, key?: (el: T, i: number) => string): HashMap<T>
export function idx<T extends object, K extends keyof T>(src: Iterable<T>, key: K): HashMap<T>
export function idx(
  src: Iterable<any>,
  key: string | Function = (_: any, i: number) => i,
): HashMap {
  const map = typeof key === 'function' ? key : (el: any) => el[key]
  const transform = (acc: HashMap, el: any, i: number) => {
    acc[map(el, i)] = el
    return acc
  }
  return Array.from(src).reduce(transform, {})
}

/**
 * mutable set
 */
export function set<T extends object, K extends keyof T>(src: T, key: K, val: T[K]): T
export function set<T extends object, K extends string, V>(
  src: T,
  key: K,
  val: V,
): Assign<T, { [P in K]: V }>
export function set(src: any, key: string, val: any) {
  src[key] = val
  return src
}

/**
 * mutable delete
 */
export function del<T extends object, K extends keyof T>(src: T, key: K): Omit<T, K> {
  delete src[key]
  return src
}

export function has<T extends object, K extends keyof T>(obj: T, key: K): boolean
export function has(obj: object, key: string): boolean
export function has(obj: object, key: string): boolean {
  try {
    return key in obj
  } catch (error) {
    return false
  }
}

export function hasOwn<T extends object, K extends keyof T>(obj: T, key: K): boolean
export function hasOwn(obj: object, key: string): boolean
export function hasOwn(obj: object, key: string): boolean {
  try {
    return obj.hasOwnProperty(key)
  } catch (error) {
    return false
  }
}

export function omit<T extends object, K extends keyof T>(src: T, key: K | K[]): Omit<T, K> {
  src = { ...src }
  const keys = Array.isArray(key) ? key : [key]
  return keys.reduce((acc, key) => del(acc, key) as T, { ...src })
}

export function pick<T extends object, K extends keyof T>(src: T, key: K | K[]): Pick<T, K> {
  const keys = Array.isArray(key) ? key : [key]
  return keys.reduce((acc, k) => set(acc, k, src[k]), {} as T)
}

export function mapValues<T, K extends keyof T, U>(
  src: T,
  fn: (value: T[K], key: K, src: Readonly<T>) => U,
): { [P in K]: U } {
  const result: any = {}
  for (const key in src) {
    result[key] = fn(src[key] as any, key as any, src)
  }
  return result
}

export function mapKeys<T, K extends keyof T, U extends string>(
  src: T,
  fn: (value: T[K], key: K, src: Readonly<T>) => U,
): { [P in U]: T[K] } {
  const result: any = {}

  for (const k in src) {
    const v = src[k] as any
    const _k = fn(v, k as any, src)
    result[_k] = v
  }
  return result
}

type DigResult<T> = T extends Primitive
  ? T | undefined
  : T extends DeepUnPartial<infer R>
  ? R | undefined
  : T | undefined

export function dig<T extends object, R>(
  src: T,
  draft: (src: DeepReadOnly<DeepUnPartial<T>>) => R,
): DigResult<R> {
  let result: any
  const get = (target: any, key: any): any => {
    result = target[key]
    const next = result == null || typeof result !== 'object' ? {} : result
    return new Proxy(next, { get })
  }
  draft(new Proxy(src, { get }))
  return result
}
