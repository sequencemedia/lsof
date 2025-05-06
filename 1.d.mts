export {
  getLsof
} from './src/1/common.mjs'

export {
  default as toSet
} from './src/1/to-set.mjs'

export {
  default as toArray
} from './src/1/to-array.mjs'

export function getLsofSet (): Promise<Set<Set<Map<string, string | number>>>>

export function getLsofArray (): Promise<Array<Array<Record<string, string | number>>>>
