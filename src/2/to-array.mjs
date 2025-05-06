import {
  getArray,
  toObject
} from './common.mjs'

/**
 *  @param {string} value
 *  @returns {Array<Record<string, string | number>>}
 */
export default function toArray (value) {
  const array = getArray(value)

  return (
    array.map(toObject)
  )
}
