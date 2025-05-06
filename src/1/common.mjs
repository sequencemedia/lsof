import {
  execFile
} from 'node:child_process'

/*
p: will prefix the PID or (Process ID) column
c: will prefix the Command or (Process Name) column
u: will prefix the User column
f: will prefix the File Descriptor column
t: will prefix the Type column
D: will prefix the Device column
s: will prefix the SizeOff column
i: will prefix the Node column
n: will prefix the Name or (File Path)
*/

const PID_FLAG = 'p'
const COMMAND_FLAG = 'c'
const USER_FLAG = 'u'
const FD_FLAG = 'f'
const TYPE_FLAG = 't'
const DEVICE_FLAG = 'D'
const SIZEOFF_FLAG = 's'
const NODE_FLAG = 'i'
const NAME_FLAG = 'n'

export const PID = 'pid'
export const COMMAND = 'command'
export const USER = 'user'
export const FD = 'fd'
export const TYPE = 'type'
export const DEVICE = 'device'
export const SIZEOFF = 'sizeOff'
export const NODE = 'node'
export const NAME = 'name'

const LF = '\n'

const OPTIONS = {
  maxBuffer: Infinity
}

/*
export function toCamelCase (value) {
  return value.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, v) => v.toUpperCase())
}

export function fromTsv (string) {
  return (
    string.replace(/\r/g, LF).split(LF)
      .map((l) => l.split('\t'))
      .reduce((a, c, i, [head]) => (i) ? a.concat(Object.fromEntries(c.map((val, col) => [head[col], val]))) : a, [])
  )
}
*/

/**
 *  @param {string} s
 *  @returns {number | string}
 */
function transform (s) {
  if (!s) return s

  const n = Number(s)

  return (
    isNaN(n)
      ? s
      : n
  )
}

/**
 *  @param {string} s
 *  @returns {Record<string, number>}
 */
function getPid (s) {
  const pid = s.slice(1).trim()

  return {
    [PID]: Number(pid)
  }
}

/**
 *  @param {string} s
 *  @returns {Record<string, string | number>}
 */
function getCol (s) {
  const key = s.charAt(0)
  const value = s.slice(1).trim()

  switch (key) {
    case COMMAND_FLAG: // will prefix the Command or (Process Name) column
      return {
        [COMMAND]: value
      }

    case USER_FLAG: // will prefix the User column
      return {
        [USER]: value
      }

    case FD_FLAG: // will prefix the File Descriptor column
      return {
        [FD]: transform(value)
      }

    case TYPE_FLAG: // will prefix the Type column
      return {
        [TYPE]: value
      }

    case DEVICE_FLAG: // will prefix the Device column
      return {
        [DEVICE]: value
      }

    case SIZEOFF_FLAG: // will prefix the SizeOff column
      return {
        [SIZEOFF]: transform(value)
      }

    case NODE_FLAG: // will prefix the Node column
      return {
        [NODE]: transform(value)
      }

    case NAME_FLAG: // will prefix the Name or (File Path)
      return {
        [NAME]: value
      }

    default:
      return {
        [key]: transform(value)
      }
  }
}

/**
 *  @param {string} [value]
 *  @returns {Set<Set<Record<string, string | number>>>}
 */
export function getSet (value = '') {
  const array = value.split(LF)

  /**
   *  @type {Set<Set<Record<string, string | number>>>}
   */
  const OUTER = new Set()
  /**
   *  @type {Set<Record<string, string | number>>}
   */
  let INNER

  array
    .forEach((s) => {
      if (s.startsWith(PID_FLAG)) {
        OUTER.add((INNER = new Set([getPid(s)])))
      } else {
        INNER.add(getCol(s))
      }
    })

  return OUTER
}

/**
 *  @param {string} [value]
 *  @returns {Array<Array<Record<string, string | number>>>}
 */
export function getArray (value = '') {
  const array = value.split(LF)

  /**
   *  @type {Array<Array<Record<string, string | number>>>}
   */
  const OUTER = []
  /**
   *  @type {Array<Record<string, string | number>>}
   */
  let INNER

  array
    .forEach((s) => {
      if (s.startsWith(PID_FLAG)) {
        OUTER.push((INNER = [getPid(s)]))
      } else {
        INNER.push(getCol(s))
      }
    })

  return OUTER
}

/**
 *  @param {string} [value]
 *  @returns {Array<Array<Record<string, string | number>>>}
 */
export function getRows (value = '') {
  const array = value.split(LF)

  /**
   *  @type {Array<Array<Record<string, string | number>>>}
   */
  const OUTER = []
  /**
   *  @type {Array<Record<string, string | number>>}
   */
  let INNER

  array
    .forEach((s) => {
      if (s.startsWith(PID_FLAG)) {
        OUTER.push((INNER = [getPid(s)]))
      } else {
        INNER.push(getCol(s))
      }
    })

  return OUTER
}

/**
 *  @returns {Promise<string>}
 */
export function getLsof () {
  return (
    new Promise((resolve, reject) => {
      /**
       *  @param {any} [e]
       *  @param {string} [v]
       *  @returns {void}
       */
      function complete (e, v = '') {
        return (!e) ? resolve(v.trim()) : reject(e)
      }

      execFile('lsof', ['-F', 'pcuftDsin'], OPTIONS, complete)
    })
  )
}
