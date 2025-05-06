import {
  getRows,
  toObject
} from './common.mjs'

/**
 *  @param {string} value
 *  @returns {Array<Record<string, string | number>>}
 */
export default function toArray (value) {
  const array = getRows(value)

  return (
    array.map(toObject)
  )
}
