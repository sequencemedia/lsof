import {
  PID,
  COMMAND,
  USER,
  getSet
} from './common.mjs'

/**
 *  @param {Map<string, string | number>} map
 *  @param  {...Array<string | number>} args
 *  @returns {Array<Array<string | number>>}
 */
function toEntries (map, ...args) {
  const pid = map.get(PID)
  const command = map.get(COMMAND)
  const user = map.get(USER)

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
    new Set(Array.from(inner).reduce(reduce, [new Map()]))
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
  const outer = getSet(value)

  return (
    new Set(Array.from(outer).map(map))
  )
}
