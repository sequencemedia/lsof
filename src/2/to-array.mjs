import {
  getArray,
  toObject
} from './common.mjs'

/**
 *  @param {string} value
 *  @returns {Record<string, string | number>}
 */
function mapObject (value) {
  return (
    toObject(value)
  )
}

/**
 *  @param {string} value
 *  @returns {Array<Record<string, string | number>>}
 */
export default function toArray (value) {
  const array = getArray(value)

  return (
    array.map(mapObject)
  )
}
