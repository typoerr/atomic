import { compact, difference, flat, intersection, unique } from '../src/array'

test('compact', () => {
  const arr = [0, 1, 2, 0, NaN, undefined, null, -0]
  const r = compact(arr)
  expect(r).toEqual([1, 2])
})

test('difference: primitive', () => {
  const a = [1, 2, 3, 4]
  const b = [3, 4, 5, 6]
  expect(difference(a, b)).toEqual([1, 2])
})

test('difference: object', () => {
  const a = [{ id: 1 }, { id: 2 }]
  const b = [{ id: 1 }, { id: 3 }]
  const r1 = difference(a, b, (el) => String(el.id))
  const r2 = difference(a, b)
  expect(r1).toEqual([{ id: 2 }])
  expect(r2).toEqual([{ id: 1 }, { id: 2 }])
})

test('intersection: primitive', () => {
  const a = [1, 2, 3, 4]
  const b = [3, 4, 5, 6]
  expect(intersection(a, b)).toEqual([3, 4])
})

test('intersection: object', () => {
  const a = [{ id: 1 }, { id: 2 }]
  const b = [{ id: 1 }, { id: 3 }]
  const r1 = intersection(a, b, (el) => String(el.id))
  const r2 = intersection(a, b)
  expect(r1).toEqual([{ id: 1 }])
  expect(r2).toEqual([])
})

test('unique: primitive', () => {
  const src = [1, 2, 3, 3, 1]
  expect(unique(src)).toEqual([1, 2, 3])
})

test('unique: object', () => {
  const src = [{ id: 1 }, { id: 2 }, { id: 1 }, { id: 3 }]
  const r1 = unique(src, (el) => String(el.id))
  const r2 = unique(src)
  expect(r1).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }])
  expect(r2).toEqual(src)
})

test('flat', () => {
  const arr = [1, [1], [[1]]]
  const result = flat(arr)
  expect(result).toStrictEqual([1, 1, [1]])
})

test('flat: with map', () => {
  const arr = [1, [1]]
  const result = flat(arr, (x) => x + 1)
  expect(result).toStrictEqual([2, 2])
})

test('flat.deep', () => {
  const arr = [1, [1, [1]]]
  const result = flat.deep(arr)
  expect(result).toStrictEqual([1, 1, 1])
})

test('flat.deep: with map', () => {
  const arr = [1, [1, [1]]]
  const result = flat.deep(arr, (x) => x + 1)
  expect(result).toStrictEqual([2, 2, 2])
})
