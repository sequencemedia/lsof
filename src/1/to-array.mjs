import {
  PID,
  COMMAND,
  USER,
  getRows
} from './common.mjs'

/**
 *  @param {Record<string, string | number>} previous
 *  @param {...Array<string | number>} args
 *  @returns {Array<Array<string | number>>}
 */
function toEntries (previous, ...args) {
  const {
    [PID]: pid,
    [COMMAND]: command,
    [USER]: user
  } = previous

  return [
    [
      PID,
      pid
    ],
    [
      COMMAND,
      command
    ],
    [
      USER,
      user
    ],
    ...args
  ]
}

/**
 *  @param {Record<string, string | number>[]} inner
 *  @returns {Array<Record<string, string | number>>}
 */
function map (inner) {
  return (
    inner.reduce(reduce, [{}])
  )
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
export default function toArray (value) {
  const outer = getRows(value)

  return (
    outer.map(map)
  )
}
