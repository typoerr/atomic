import { identity, constant, existy, range, throws } from '../src/misc'

test('identity', () => {
  expect(identity(1, 2, 3)).toBe(1)
})

test('constant', () => {
  const f = constant(1)
  expect(f(10)).toBe(1)
})

test('existy', () => {
  expect(existy(0)).toBe(true)
  expect(existy(undefined)).toBe(false)
  expect(existy(null)).toBe(false)
})

test('range: only end', () => {
  expect(range(3)).toEqual([0, 1, 2])
  expect(range(0)).toEqual([])
  expect(range(-3)).toEqual([0, -1, -2])
})

test('range: with start-end', () => {
  expect(range(1, 3)).toEqual([1, 2])
  expect(range(0, 0)).toEqual([])
  expect(range(-1, 1)).toEqual([-1, 0])
  expect(range(1, -1)).toEqual([1, 0])
  expect(range(-1, -4)).toEqual([-1, -2, -3])
})

test('range: with start-end-step', () => {
  expect(range(0, 6, 2)).toEqual([0, 2, 4])
  expect(range(0, 6, -2)).toEqual([0, 2, 4])
  expect(range(0, 0, 2)).toEqual([])
  expect(range(0, 0, 0)).toEqual([])
  expect(range(1, 5, 3)).toEqual([1, 4])
  expect(range(1, 3, 0)).toEqual([1, 1])
})

test('throws', () => {
  expect(() => throws('err')).toThrow('err')
  expect(() => throws(new Error('err'))).toThrow('err')
})
