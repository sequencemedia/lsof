import {
  getArray
} from './common.mjs'

/**
 *  @param {Record<string, string | number>} previous
 *  @param {...Array<string | number>} args
 *  @returns {Array<Array<string | number>>}
 */
function toEntries ({ PROCESS, COMMAND, USER }, ...args) {
  return [
    [
      'PROCESS',
      PROCESS
    ],
    [
      'COMMAND',
      COMMAND
    ],
    [
      'USER',
      USER
    ],
    ...args
  ]
}

/**
 *  @param {Array<Record<string, string | number>>} accumulator
 *  @param {Record<string, string | number>} current
 *  @returns {Array<Record<string, string | number>>}
 */
function reduce (accumulator, current) {
  const previous = accumulator[accumulator.length - 1] // ?? {}

  const [
    [
      key,
      value
    ]
  ] = Object.entries(current)

  if (key in previous) {
    accumulator.push(Object.fromEntries(toEntries(previous, [key, value])))
  } else {
    previous[key] = value
  }

  return accumulator
}

/**
 *  @param {string} value
 *  @returns {Array<Array<Record<string, string | number>>>}
 */
export function toArray (value) {
  const outer = getArray(value)

  return (
    outer.map((inner) => inner.reduce(reduce, [{}]))
  )
}
