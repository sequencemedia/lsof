import {
  getRows,
  toObject
} from './common.mjs'

/**
 *  @param {string} value
 *  @returns {Map<string, string | number>}
 */
function toMap (value) {
  const object = toObject(value)

  return (
    new Map(Object.entries(object))
  )
}

/**
 *  @param {string} value
 *  @returns {Set<Map<string, string | number>>}
 */
export default function toSet (value) {
  const array = getRows(value)

  return (
    new Set(array.map(toMap))
  )
}
