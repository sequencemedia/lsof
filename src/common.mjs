import {
  exec
} from 'node:child_process'

export function toCamelCase (value) {
  return value.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, v) => v.toUpperCase())
}

export function fromTsv (string) {
  return (
    string.replace(/\r/g, '\n').split('\n')
      .map((l) => l.split('\t'))
      .reduce((a, c, i, [head]) => (i) ? a.concat(Object.fromEntries(c.map((val, col) => [head[col], val]))) : a, [])
  )
}

function getPid (s) {
  return {
    PROCESS: Number(s.slice(1))
  }
}

/*
p: will prefix the PID or (Process ID) column
c: will prefix the COMMAND or (Process Name) column
u: will prefix the User column that the process is running under
f: will prefix the File Descriptor column
t: will prefix the type column
D: will prefix the Device column
s: will prefix the SizeOff column
i: will prefix the Node column
n: will prefix the Name or (File Path)
*/

function getCol (s) {
  const key = s.charAt(0)
  const value = s.slice(1)

  switch (key) {
    case 'c': // will prefix the COMMAND or (Process Name) column
      return {
        COMMAND: value
      }

    case 'u': // will prefix the User column that the process is running under
      return {
        USER: value
      }

    case 'f': // will prefix the File Descriptor column
      return {
        'FILE DESCRIPTOR': value
      }

    case 't': // will prefix the type column
      return {
        TYPE: value
      }

    case 'D': // will prefix the Device column
      return {
        DEVICE: value
      }

    case 's': // will prefix the SizeOff column
      return {
        SIZE: Number(value)
      }

    case 'i': // will prefix the Node column
      return {
        NODE: Number(value)
      }

    case 'n': // will prefix the Name or (File Path)
      return {
        'FILE PATH': value
      }

    default:
      return {
        [key]: value
      }
  }
}

export function getSet (value = '') {
  const array = value.split('\n')

  const OUTER = new Set()
  let INNER

  array
    .forEach((s) => {
      if (s.charAt(0) === 'p') {
        OUTER.add((INNER = new Set([getPid(s)])))
      } else {
        INNER.add(getCol(s))
      }
    })

  INNER = null
  return OUTER
}

export function getArray (value = '') {
  const array = value.split('\n')

  const OUTER = []
  let INNER

  array
    .forEach((s) => {
      if (s.charAt(0) === 'p') {
        OUTER.push((INNER = [getPid(s)]))
      } else {
        INNER.push(getCol(s))
      }
    })

  INNER = null
  return OUTER
}

const OPTIONS = {
  maxBuffer: Infinity
}

export function getLsof () {
  return (
    new Promise((resolve, reject) => {
      exec('lsof -F pcuftDsin', OPTIONS, (e, v) => (!e) ? resolve(v.trim()) : reject(e))
    })
  )
}

export function lsof () {
  return (
    new Promise((resolve, reject) => {
      exec('lsof', OPTIONS, (e, v) => (!e) ? resolve(v.trim()) : reject(e))
    })
  )
}
