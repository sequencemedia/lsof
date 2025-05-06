import {
  execFile
} from 'node:child_process'

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

/**
 *  @param {string} v
 *  @returns {string[]}
 */
export function getArray (v) {
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

  const pid = Number(PID)

  if (isNaN(pid)) throw new Error('Invalid pid.')

  const {
    groups: {
      command,
      user,
      fd: FD,
      type,
      device,
      sizeOff: SIZEOFF,
      node: NODE,
      name
    } = {}
  } = match

  const fd = Number(FD)
  const sizeOff = Number(SIZEOFF)
  const node = Number(NODE)

  return {
    pid,
    command,
    user,
    fd: isNaN(fd) ? FD.trim() : fd,
    type,
    device,
    sizeOff: isNaN(sizeOff) ? SIZEOFF.trim() : sizeOff,
    node: isNaN(node) ? NODE.trim() : node,
    name
  }
}

const OPTIONS = {
  maxBuffer: Infinity
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
