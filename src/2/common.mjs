import {
  execFile
} from 'node:child_process'

export const PID = 'pid'
export const COMMAND = 'command'
export const USER = 'user'
export const FD = 'fd'
export const TYPE = 'type'
export const DEVICE = 'device'
export const SIZEOFF = 'sizeOff'
export const NODE = 'node'
export const NAME = 'name'

/**
 *  @typedef {{
 *    command: string,
 *    pid: number,
 *    user: string,
 *    fd: string | number,
 *    type: string,
 *    device: string,
 *    sizeOff: string | number,
 *    node: string | number,
 *    name: string
 *  }} LineType
 */

const PATTERN = /^\s*(?<command>[!-~]+)\s+(?<pid>\d+)\s+(?<user>\w+)\s+(?<fd>\s+|\w+)\s+(?<type>\s+|\w+)\s+(?<device>\s+|\d+,\d+|0x[\w\d]*)\s+(?<sizeOff>\s+|\w+|\d+)\s+(?<node>\s+|\d+)\s+(?<name>.*)/

const LF = '\n'

const OPTIONS = {
  maxBuffer: Infinity
}

/**
 *  @param {string} string
 *  @returns {number | string}
 */
function transform (string) {
  const s = string.trim()
  if (!s) return s

  const n = Number(s)
  return (
    isNaN(n)
      ? s
      : n
  )
}

/**
 *  @param {string} v
 *  @returns {string[]}
 */
export function getRows (v) {
  return v.trim().split(LF).slice(1)
}

/**
 *  @param {string} v
 *  @returns {Record<string, string | number>}
 */
export function toObject (v) {
  const match = PATTERN.exec(v)

  if (!match) throw new Error('Parsing failed.')

  const {
    groups: {
      pid: PID
    } = {}
  } = match

  const pid = transform(PID)

  if (typeof pid === 'string') throw new Error('Invalid pid.')

  const {
    groups: {
      [COMMAND]: command,
      [USER]: user,
      [FD]: fd,
      [TYPE]: type,
      [DEVICE]: device,
      [SIZEOFF]: sizeOff,
      [NODE]: node,
      [NAME]: name
    } = {}
  } = match

  return {
    pid,
    command,
    user,
    fd: transform(fd),
    type,
    device,
    sizeOff: transform(sizeOff),
    node: transform(node),
    name
  }
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

      execFile('lsof', OPTIONS, complete)
    })
  )
}
