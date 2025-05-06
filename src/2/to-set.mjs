import {
  getArray,
  toObject
} from './common.mjs'

/**
 *  @param {string} value
 *  @returns {Map<string, string | number>}
 */
function mapMap (value) {
  return (
    new Map(Object.entries(toObject(value)))
  )
}

/**
 *  @param {string} value
 *  @returns {Set<Map<string, string | number>>}
 */
export default function toSet (value) {
  const array = getArray(value)

  return (
    new Set(array.map(mapMap))
  )
}
