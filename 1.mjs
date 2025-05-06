import {
  getLsof
} from './src/1/common.mjs'

import toSet from './src/1/to-set.mjs'

import toArray from './src/1/to-array.mjs'

export {
  getLsof
}

export {
  toSet
}

export {
  toArray
}

/**
 *  @returns {Promise<Set<Set<Map<string, string | number>>>>}
 */
export async function getLsofSet () {
  return (
    toSet(
      await getLsof()
    )
  )
}

/**
 *  @returns {Promise<Array<Array<Record<string, string | number>>>>}
 */
export async function getLsofArray () {
  return (
    toArray(
      await getLsof()
    )
  )
}
