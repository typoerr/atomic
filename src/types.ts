export type Primitive = null | undefined | string | number | boolean | symbol

export type Falsy = false | undefined | null | 0 | -0 | ''

export type UnPartial<T> = { [P in keyof T]-?: T[P] }

export type DeepUnPartial<T> = { [K in keyof T]-?: DeepUnPartial<T[K]> }

export type DeepReadOnly<T> = { readonly [K in keyof T]: DeepReadOnly<T[K]> }

export type Predicate<T> = (value: any) => value is T

export type Comparison<T> = (a: T, b: T) => boolean

export type AnyFunction = (...values: any[]) => any

export type Head<T> = T extends [infer H, ...any[]] ? H : never

export type Tail<T extends any[]> = ((...x: T) => void) extends (h: any, ...rest: infer R) => void ? R : never

export type Union<T> = T extends [...(infer U)[]] ? U : never

export interface SubscriberLike<T> {
  next?(value: T): void
  error?(err: any): void
  complete?(): void
}

export interface SubscriptionLike {
  unsubscribe: AnyFunction
}

declare global {
  interface SymbolConstructor {
    readonly observable: symbol
  }
}

export interface ObservableLike<T> {
  subscribe(subscriber: SubscriberLike<T>): SubscriptionLike
  subscribe(observer: (v: T) => void): SubscriptionLike
  [Symbol.observable](): ObservableLike<T>
}

export type Resolve<T> = T extends Promise<infer R> ? R : T extends ObservableLike<infer R> ? R : T

/**
 * Get Type that omit keys from T
 * K should be not keyof T but string.
 *
 * @deprecated use native(lib.es5.d.ts)
 * @example
 * type A = {a: string, b: number}
 * type Expect = Omit<A, 'a'> // { b: number }
 *
 */
export type Omit<T, K extends any> = Pick<T, Exclude<keyof T, K>>

/**
 * Pick props that un exist U
 * // aaa
 *
 * @example
 * type A = {a: string, b: number}
 * type B = {a?: string, b: number, x: number}
 * type C = Diff<B, A> // { x: number }
 */
export type Diff<T, U> = Pick<T, Exclude<keyof T, keyof U>>

/**
 * Pick props that exist in U
 */

export type Insersection<T, U> = Pick<T, Extract<keyof T, keyof U>>

/**
 * $Diff of Flowtype
 * @example
 * type T1 = WeakDiff<{a: string, b: number}, {a: string}>
 * // Expect { b: number } & { a?: string}
 * type T2 = WeakDiff<{a: string, b: number}, {a: string, c: number}>
 * // Expect { b: number } & { a?: string}
 */
export type WeakDiff<T, U> = Diff<T, U> & Partial<Insersection<T, U>>

/**
 * Overwrite T by U
 *
 * @example
 * type A = {a: string, b: number}
 * type B = {a?: string, b: number, x: number}
 * type C = Assign<A, B> // {b: number} & B
 *
 */
export type Assign<T, U> = Diff<T, U> & U

/**
 * @example
 * type A = {a: string, b: number: c: number}
 * type T = MatchKeys<A, string> // "a"
 */
export type MatchKeys<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T]

/**
 * @example
 * type A = {a: string, b: number: c: number}
 * type T = UnMatchKeys<A, string> // "b" | "c
 */
export type UnMatchKeys<T, U> = { [K in keyof T]: T[K] extends U ? never : K }[keyof T]
