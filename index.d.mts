export {
  getLsof
} from './src/common.mjs'

export {
  toSet
} from './src/to-set.mjs'

export {
  toArray
} from './src/to-array.mjs'

export function getLsofSet (): Promise<Set<Set<Map<string, string | number>>>>

export function getLsofArray (): Promise<Array<Array<Record<string, string | number>>>>
