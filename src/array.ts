import { Falsy } from './types'
import { has, idx } from './object'
import { identity } from './misc'

export function compact<T>(arr: (T | Falsy)[]): T[] {
  return arr.filter(Boolean as any)
}

export function difference<T>(a: T[], b: T[], getKey?: (el: T) => string) {
  if (getKey === undefined) {
    return a.filter((el) => !b.includes(el))
  }
  const bHash = idx(b as any, getKey)
  return a.filter((el) => !has(bHash, getKey(el)))
}

export function intersection<T>(a: T[], b: T[], getKey?: (el: T) => string) {
  if (getKey === undefined) {
    return a.filter((el) => b.includes(el))
  }
  const bHash = idx(b as any, getKey)
  return a.filter((el) => has(bHash, getKey(el)))
}

export function unique<T>(arr: T[], getKey?: (el: T) => string) {
  if (getKey === undefined) {
    return Array.from(new Set(arr))
  }
  return Object.values(idx(arr, getKey))
}

type Expose<T> = T extends (infer R)[] ? R : T
type UnArray<T> = Expose<Expose<Expose<Expose<Expose<Expose<Expose<Expose<Expose<Expose<T>>>>>>>>>>
type Flat<T> = Expose<T>[]
type DeepFlat<T> = UnArray<T>[]

export function flat<T, U = T>(arr: T[], map: (el: Expose<T>) => U = identity as any): Flat<U> {
  const callback = (acc: any[], el: any) => {
    if (Array.isArray(el)) acc.push.apply(acc, el.map(map))
    else acc.push(map(el))
    return acc
  }
  return arr.reduce(callback, [])
}

flat.deep = flatDeep

export function flatDeep<T, U = UnArray<T>>(
  arr: T[],
  map: (el: UnArray<T>) => U = identity as any,
): DeepFlat<U> {
  const callback = (acc: any[], el: any): any[] => {
    if (Array.isArray(el)) return el.reduce(callback, acc)
    else acc.push(map(el))
    return acc
  }
  return arr.reduce(callback, []) as any
}
