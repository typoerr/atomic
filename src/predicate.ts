import { Predicate as Pred, Index, AnyFunc } from './types'

export function conforms<T>(predmap: { [K in keyof T]: Pred<T[K]> }) {
  return function test(val: any): val is T {
    try {
      for (const k in predmap) {
        const v = val[k]
        if (!(k in val) || !predmap[k](v)) {
          return false
        }
      }
      return true
    } catch {
      return false
    }
  }
}

export function and<T1, T2>(a: Pred<T1>, b: Pred<T2>): Pred<T1 & T2>
export function and<T1, T2, T3>(a: Pred<T1>, b: Pred<T2>, c: Pred<T3>): Pred<T1 & T2 & T3>
export function and<T1, T2, T3, T4>(
  a: Pred<T1>,
  b: Pred<T2>,
  c: Pred<T3>,
  d: Pred<T3>,
): Pred<T1 & T2 & T3 & T4>
export function and<T>(...predicates: Pred<any>[]): Pred<T>
export function and(...predicates: Pred<any>[]) {
  return function test(val: any) {
    try {
      for (let i = 0; i < predicates.length; i++) {
        if (!predicates[i](val)) return false
      }
      return true
    } catch {
      return false
    }
  }
}

export function or<T1, T2>(a: Pred<T1>, b: Pred<T2>): Pred<T1 | T2>
export function or<T1, T2, T3>(a: Pred<T1>, b: Pred<T2>, c: Pred<T3>): Pred<T1 | T2 | T3>
export function or<T1, T2, T3, T4>(
  a: Pred<T1>,
  b: Pred<T2>,
  c: Pred<T3>,
  d: Pred<T4>,
): Pred<T1 | T2 | T3 | T4>
export function or<T>(...predicates: Pred<any>[]): Pred<T>
export function or(...predicates: Pred<any>[]) {
  return function test(val: any) {
    try {
      for (let i = 0; i < predicates.length; i++) {
        if (predicates[i](val)) return true
      }
      return false
    } catch {
      return false
    }
  }
}

export function not<F extends AnyFunc>(f: F) {
  return (...val: Parameters<F>): boolean => !Boolean(f(...val)) // eslint-disable-line
}

export function isString(value: any): value is string {
  return typeof value === 'string'
}

export function isNumber(value: any): value is number {
  return typeof value === 'number'
}

export function isUndef(value: any): value is undefined {
  return value === undefined
}

export function isNull(value: any): value is null {
  return value === null
}

export function isVoid(value: any): value is void {
  return value === undefined || value === null
}

export function isBool(value: any): value is boolean {
  return typeof value === 'boolean'
}

export function isSymbol(value: any): value is symbol {
  return typeof value === 'symbol'
}
export function isArray<T>(value: T[] | any): value is T[] {
  return Array.isArray(value)
}

export function isPlain<T = Index>(obj: any | T): obj is T {
  return obj instanceof Object && Object.getPrototypeOf(obj) === Object.prototype
}

export function isObject<T extends object>(obj: any | T): obj is T {
  return obj === Object(obj)
}

export function isDate(value: any): value is Date {
  return value instanceof Date
}

export function isErr(value: any): value is Error {
  return value instanceof Error
}

export function isMap<K, V>(value: any | Map<K, V>): value is Map<K, V> {
  return value instanceof Map
}

export function isSet<T>(value: any | Set<T>): value is Set<T> {
  return value instanceof Set
}

export function isWeakMap<K extends object, V>(value: any | WeakMap<K, V>): value is WeakMap<K, V> {
  return value instanceof WeakMap
}

export function isWeakSet<T extends object>(value: any | WeakSet<T>): value is WeakSet<T> {
  return value instanceof WeakSet
}

export function isFunc<T extends AnyFunc>(value: T | any): value is T {
  return typeof value === 'function'
}

export function isEmpty(value: any) {
  const v: any = value
  switch (typeof v) {
    case 'number':
    case 'boolean':
    case 'undefined':
      return true

    case 'string':
    case 'symbol':
    case 'function':
    case 'object':
      if (isNull(v)) {
        return true
      }
      // Array / ArrayLike / Map / Set / string
      if (v[Symbol.iterator]) {
        return Array.from(v).length <= 0
      }

      // the others object
      return Object.keys(v).length <= 0
    default:
      return false
  }
}
