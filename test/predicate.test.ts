import * as _ from '../src/predicate'

test('conforms', () => {
  const isRecord = _.conforms({
    a: _.isNumber,
    b: _.isString,
    c: _.conforms<{ d: number | string }>({
      d: _.or(_.isNumber, _.isString),
    }),
  })

  expect(isRecord({})).toBe(false)
  expect(isRecord(null)).toBe(false)
  expect(isRecord(undefined)).toBe(false)
  expect(isRecord({ a: 1, b: '' })).toBe(false)
  expect(isRecord({ a: 1, b: '', c: { d: 1 } })).toBe(true)
  expect(isRecord({ a: 1, b: '', c: { d: '' } })).toBe(true)
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

test('isUndef', () => {
  expect(_.isUndef(undefined)).toBe(true)
  expect(_.isUndef(null)).toBe(false)
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

test('isBool', () => {
  // tslint:disable:no-construct
  expect(_.isBool(true)).toBe(true)
  expect(_.isBool(false)).toBe(true)
  expect(_.isBool(Boolean())).toBe(true)
  expect(_.isBool(new Boolean())).toBe(false)
  expect(_.isBool(1)).toBe(false)
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

test('isPlain', () => {
  class Klass {}
  expect(_.isPlain({})).toBe(true)
  expect(_.isPlain(new Klass())).toBe(false)
  expect(_.isPlain('')).toBe(false)
})

test('isDate', () => {
  const date = new Date()
  expect(_.isDate(date)).toBe(true)
  expect(_.isDate(date.toString())).toBe(false)
})

test('isErr', () => {
  expect(_.isErr(new Error())).toBe(true)
  expect(_.isErr(new TypeError())).toBe(true)
  expect(_.isErr({})).toBe(false)
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

test('isFunc', () => {
  expect(_.isFunc(() => {})).toBe(true)
  expect(_.isFunc(class Klass {})).toBe(true)
  expect(_.isFunc(null)).toBe(false)
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
    expect(_.isEmpty(() => {})).toBe(true)
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
