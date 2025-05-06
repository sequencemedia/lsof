import {
  getLsof
} from './src/2/common.mjs'

import toSet from './src/2/to-set.mjs'

import toArray from './src/2/to-array.mjs'

export {
  getLsof
}

export {
  toSet
}

export {
  toArray
}

export async function getLsofArray () {
  return (
    toArray(
      await getLsof()
    )
  )
}

export async function getLsofSet () {
  return (
    toSet(
      await getLsof()
    )
  )
}
