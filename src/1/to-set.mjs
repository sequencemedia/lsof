import {
  PID,
  COMMAND,
  USER,
  getRows
} from './common.mjs'

/**
 *  @param {Map<string, string | number>} previous
 *  @param  {...Array<string | number>} args
 *  @returns {Array<Array<string | number>>}
 */
function toEntries (previous, ...args) {
  const pid = previous.get(PID)
  const command = previous.get(COMMAND)
  const user = previous.get(USER)

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
 *  @param {Set<Map<string, string | number>>} inner
 *  @returns {Set<Set<Map<string, string | number>>>}
 */
function map (inner) {
  return (
    new Set(inner.reduce(reduce, [new Map()]))
  )
}

/**
 *  @param {Array<Map<string, string | number>>} accumulator
 *  @param {Map<string, string | number>} current
 *  @returns {Array<Map<string, string | number>>}
 */
function reduce (accumulator, current) {
  const previous = accumulator[accumulator.length - 1] // ?? {}

  const [
    [
      key,
      value
    ]
  ] = Object.entries(current)

  if (previous.has(key)) {
    accumulator.push(new Map(toEntries(previous, [key, value])))
  } else {
    previous.set(key, value)
  }

  return accumulator
}

/**
 *  @param {string} value
 *  @returns {Set<Set<Map<string, string | number>>>}
 */
export default function toSet (value) {
  const outer = getRows(value)

  return (
    new Set(outer.map(map))
  )
}
