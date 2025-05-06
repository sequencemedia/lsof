export {
  getLsof
} from './src/2/common.mjs'

export {
  default as toSet
} from './src/2/to-set.mjs'

export {
  default as toArray
} from './src/2/to-array.mjs'

export function getLsofSet (): Promise<Set<Map<string, string | number>>>

export function getLsofArray (): Promise<Array<Record<string, string | number>>>
