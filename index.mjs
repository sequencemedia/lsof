import {
  getLsof
} from './src/common.mjs'

import {
  toSet
} from './src/to-set.mjs'

import {
  toArray
} from './src/to-array.mjs'

export {
  getLsof
}

export {
  toSet
}

export {
  toArray
}

export async function getLsofSet () {
  return (
    toSet(
      await getLsof()
    )
  )
}

export async function getLsofArray () {
  return (
    toArray(
      await getLsof()
    )
  )
}
