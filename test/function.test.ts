import { once, before, after, delayed, compose, when } from '../src/function'

test('once', () => {
  const origin = (a: number, b: number) => a + b
  const mock = jest.fn(origin)
  const fn = once(mock)
  expect(fn(1, 1)).toBe(2)
  expect(fn(1, 1)).toBe(2)
  expect(mock).toBeCalledTimes(1)
})

test('before', () => {
  const origin = (i: number) => i
  const mock = jest.fn(origin)
  const fn = before(2, mock)
  expect(fn(1)).toBe(1)
  expect(fn(1)).toBe(1)
  expect(fn(1)).toBeUndefined()
  expect(mock).toHaveBeenCalledTimes(2)
})

test('after', () => {
  const origin = (n: number) => n
  const mock = jest.fn(origin)
  const fn = after(2, mock)
  expect(fn(1)).toBeUndefined()
  expect(fn(1)).toBe(1)
  expect(fn(1)).toBe(1)
  expect(mock).toHaveBeenCalledTimes(2)
})

test('delayed', async () => {
  expect.assertions(1)
  const fn = delayed(3, (i: number) => i)
  expect(await fn(1)).toBe(1)
})

test('compose', () => {
  const fn = compose(
    (a: number, b: number) => a + b,
    (n: number) => n * n,
    (s: number) => String(s),
  )
  expect(fn(1, 2)).toBe('9')
})

test('compose.async', async () => {
  expect.assertions(2)
  const fn = compose.async(
    (a: number, b: number) => a + b,
    async (n: number) => n * n,
    (s: number) => String(s),
  )
  const promise = fn(1, 2)
  expect(promise).toBeInstanceOf(Promise)
  expect(await promise).toBe('9')
})

test('when', () => {
  const fn = when(
    (s: string) => s === 'hello',
    (s) => s,
  )
  expect(fn('hello')).toBe('hello')
  expect(fn('world')).toBe(undefined)
})

test('when - with onfalse', () => {
  const fn = when(
    (s: string) => s === 'hello',
    (s) => s,
    (_) => 'world',
  )
  expect(fn('hello')).toBe('hello')
  expect(fn('')).toBe('world')
})
