import { idx, set, del, has, hasOwn, omit, pick, mapKeys, mapValues, dig } from '../src/object'

test('idx', () => {
  const src = [{ id: 1 }, { id: 2 }]
  const result = { 0: src[0], 1: src[1] }
  expect(idx(src)).toStrictEqual(result)
})

test('idx: with selector', () => {
  type Model = { id: number }
  const src = [{ id: 1 }, { id: 2 }]
  const get = (el: Model) => el.id + ''
  const result = { 1: src[0], 2: src[1] }
  expect(idx(src, get)).toStrictEqual(result)
})

test('set', () => {
  const src = { a: 1 }
  const r1 = set(src, 'a', 2)
  expect(src).toStrictEqual({ a: 2 })
  expect(src).toBe(r1)
  const r2 = set(src, 'b', 1)
  expect(src).toStrictEqual({ a: 2, b: 1 })
  expect(src).toBe(r2)
  expect(r2.b).toBe(1)
})

test('del', () => {
  const src = { a: 1, b: 1 }
  const r1 = del(src, 'a')
  expect(src).toStrictEqual({ b: 1 })
  expect(src).toBe(r1)
})

test('has', () => {
  expect(has({}, 'xxx')).toBe(false)
  expect(has(new Map(), 'get')).toBe(true)
})

test('hasOwn', () => {
  expect(hasOwn({}, 'xxx')).toBe(false)
  expect(hasOwn(new Map(), 'get')).toBe(false)
  expect(hasOwn({ a: 1 }, 'a')).toBe(true)
})

test('omit', () => {
  const src = { a: 1, b: 2, c: 3 }
  expect(omit(src, 'a')).toEqual({ b: 2, c: 3 })
  expect(omit(src, ['a', 'c'])).toEqual({ b: 2 })
})

test('pick', () => {
  const src = { a: 1, b: 2 }
  const result = pick(src, ['a'])
  expect(result).toStrictEqual({ a: 1 })
  expect(src).toStrictEqual({ a: 1, b: 2 })
})

test('mapValues', () => {
  const obj = { a: true, b: false }
  const r = mapValues(obj, (v, _k, src) => {
    expect(src).toBe(obj)
    return v ? 1 : 0
  })
  expect(r).toEqual({ a: 1, b: 0 })
})

test('mapKeys', () => {
  const obj = { a: true, b: false }
  const r = mapKeys(obj, (_v, k, src) => {
    expect(src).toBe(obj)
    return k + '!'
  })
  expect(r).toEqual({ 'a!': true, 'b!': false })
})

test('dig', () => {
  type Model = { a: number; b?: { c: number } }
  const m1: Model = { a: 1 }
  const r1 = dig(m1, x => x.a)
  const r2 = dig(m1, x => x.b)
  const r3 = dig(m1, x => x.b.c)
  expect(r1).toBe(1)
  expect(r2).toBe(undefined)
  expect(r3).toBe(undefined)

  const m2: Model = { a: 1, b: { c: 1 } }
  const r4 = dig(m2, x => x.b)
  const r5 = dig(m2, x => x.b.c)
  expect(r4).toStrictEqual({ c: 1 })
  expect(r5).toStrictEqual(1)
})
