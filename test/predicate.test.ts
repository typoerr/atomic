import * as _ from '../src/predicate'
import { noop } from '../src/misc'

test('conforms', () => {
  interface Model {
    a?: number
    b: string
    c: { d: number | string }
  }

  const isModel = _.conforms<Model>({
    a: _.or(_.isNumber, _.isUndefined),
    b: _.isString,
    c: _.conforms({
      d: _.or(_.isNumber, _.isString),
    }),
  })

  expect(isModel({})).toBe(false)
  expect(isModel(null)).toBe(false)
  expect(isModel(undefined)).toBe(false)
  expect(isModel({ a: 1, b: '' })).toBe(false)
  expect(isModel({ a: 1, b: '', c: { d: 1 } })).toBe(true)
  expect(isModel({ a: 1, b: '', c: { d: '' } })).toBe(true)
  expect(isModel({ b: '', c: { d: '' } })).toBe(true)
  expect(isModel({ a: true, b: '', c: { d: '' } })).toBe(false)
  expect(isModel({ b: '', c: { d: '' }, f: 1 })).toBe(true)
})

test('and', () => {
  type Model = { id: number; content: string }
  const hasId = (src: Partial<Model>): src is { id: number } => {
    return typeof src.id === 'number'
  }
  const hasContent = (src: Partial<Model>): src is { content: string } => {
    return typeof src.content === 'string'
  }

  const fn = _.and(hasId, hasContent)
  expect(fn(null)).toBe(false)
  expect(fn({ id: 1 })).toBe(false)
  expect(fn({ id: 1, content: 'hello' })).toBe(true)
})

test('or', () => {
  const fn = _.or(_.isNumber, _.isString)
  expect(fn(1)).toBe(true)
  expect(fn('')).toBe(true)
  expect(fn(null)).toBe(false)
})

test('isString', () => {
  expect(_.isString('')).toBe(true)
  expect(_.isString(1)).toBe(false)
})

test('isNumber', () => {
  expect(_.isNumber(1)).toBe(true)
  expect(_.isNumber(NaN)).toBe(true)
  expect(_.isNumber(-1)).toBe(true)
  expect(_.isNumber(Infinity)).toBe(true)
  expect(_.isNumber('1')).toBe(false)
})

test('isUndefined', () => {
  expect(_.isUndefined(undefined)).toBe(true)
  expect(_.isUndefined(null)).toBe(false)
})

test('isNull', () => {
  expect(_.isNull(null)).toBe(true)
  expect(_.isNull(undefined)).toBe(false)
})

test('isVoid', () => {
  expect(_.isVoid(undefined)).toBe(true)
  expect(_.isVoid(null)).toBe(true)
  expect(_.isVoid({})).toBe(false)
})

test('isBoolean', () => {
  // tslint:disable:no-construct
  expect(_.isBoolean(true)).toBe(true)
  expect(_.isBoolean(false)).toBe(true)
  expect(_.isBoolean(Boolean())).toBe(true)
  expect(_.isBoolean(new Boolean())).toBe(false)
  expect(_.isBoolean(1)).toBe(false)
})

test('isSymbol', () => {
  const sym = Symbol()
  expect(_.isSymbol(sym)).toBe(true)
  expect(_.isSymbol({})).toBe(false)
})

test('isArray', () => {
  const arr = [1, 2, 3]
  expect(_.isArray(arr)).toBe(true)
  expect(_.isArray({})).toBe(false)
})

test('isObject', () => {
  expect(_.isObject({})).toBe(true)
  expect(_.isObject(new Map())).toBe(true)
  expect(_.isObject('')).toBe(false)
  expect(_.isObject(null)).toBe(false)
  expect(_.isObject(undefined)).toBe(false)
})

test('isPlainObject', () => {
  class Klass {}
  expect(_.isPlainObject({})).toBe(true)
  expect(_.isPlainObject(new Klass())).toBe(false)
  expect(_.isPlainObject('')).toBe(false)
})

test('isDate', () => {
  const date = new Date()
  expect(_.isDate(date)).toBe(true)
  expect(_.isDate(date.toString())).toBe(false)
})

test('isError', () => {
  expect(_.isError(new Error())).toBe(true)
  expect(_.isError(new TypeError())).toBe(true)
  expect(_.isError({})).toBe(false)
})

test('isMap', () => {
  expect(_.isMap(new Map())).toBe(true)
  expect(_.isMap(new WeakMap())).toBe(false)
})

test('isSet', () => {
  expect(_.isSet(new Set())).toBe(true)
  expect(_.isSet(new WeakSet())).toBe(false)
})

test('isWeakMap', () => {
  expect(_.isWeakMap(new WeakMap())).toBe(true)
  expect(_.isWeakMap(new Map())).toBe(false)
})

test('isWeakSet', () => {
  expect(_.isWeakSet(new WeakSet())).toBe(true)
  expect(_.isWeakSet(new Set())).toBe(false)
})

test('isFunction', () => {
  expect(_.isFunction(noop)).toBe(true)
  expect(_.isFunction(class Klass {})).toBe(true)
  expect(_.isFunction(null)).toBe(false)
})

describe('isEmpty', () => {
  test('number', () => {
    expect(_.isEmpty(1)).toBe(true)
    expect(_.isEmpty(NaN)).toBe(true)
    expect(_.isEmpty(Infinity)).toBe(true)
  })

  test('boolean', () => {
    expect(_.isEmpty(true)).toBe(true)
    expect(_.isEmpty(false)).toBe(true)
  })

  test('symbol', () => {
    expect(_.isEmpty(Symbol())).toBe(true)
  })

  test('function', () => {
    expect(_.isEmpty(noop)).toBe(true)
    expect(_.isEmpty(class Klass {})).toBe(true)
  })

  test('undefined', () => {
    expect(_.isEmpty(undefined)).toBe(true)
  })

  test('string', () => {
    expect(_.isEmpty('')).toBe(true)
    expect(_.isEmpty('str')).toBe(false)
  })

  test('null', () => {
    expect(_.isEmpty(null)).toBe(true)
  })

  test('Array', () => {
    expect(_.isEmpty([1])).toBe(false)
    expect(_.isEmpty([])).toBe(true)
  })

  test('Map', () => {
    expect(_.isEmpty(new Map([['', 1]]))).toBe(false)
    expect(_.isEmpty(new Map())).toBe(true)
  })

  test('Set', () => {
    expect(_.isEmpty(new Set([1]))).toBe(false)
    expect(_.isEmpty(new Set([]))).toBe(true)
  })

  test('WeakMap', () => {
    const key = {}
    const map = new WeakMap()
    map.set(key, 1)
    expect(_.isEmpty(map)).toBe(true)
  })

  test('WeakSet', () => {
    const key = {}
    const set = new WeakSet()
    set.add(key)
    expect(_.isEmpty(set)).toBe(true)
  })

  test('PlainObject', () => {
    expect(_.isEmpty({ a: '' })).toBe(false)
    expect(_.isEmpty({})).toBe(true)
  })

  test('instance', () => {
    class K1 {
      prop = 'props'
      proto() {
        /*  */
      }
    }

    class K2 {
      proto() {
        /*  */
      }
    }

    expect(_.isEmpty(new K1())).toBe(false)
    expect(_.isEmpty(new K2())).toBe(true)
  })

  test('Date', () => {
    expect(_.isEmpty(new Date())).toBe(true)
  })
})
