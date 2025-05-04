import {
  getArray
} from './common.mjs'

export function toArray (value) {
  const outer = getArray(value)

  return (
    outer
      .map((inner) => (
        inner
          .reduce((accumulator, current) => {
            const previous = accumulator[accumulator.length - 1] // ?? {}

            const [
              [
                key,
                value
              ]
            ] = Object.entries(current)

            if (key in previous) {
              const {
                PROCESS: process,
                COMMAND: command,
                USER: user
              } = previous

              accumulator.push(
                Object.fromEntries([
                  [
                    'PROCESS',
                    process
                  ],
                  [
                    'COMMAND',
                    command
                  ],
                  [
                    'USER',
                    user
                  ],
                  [
                    key,
                    value
                  ]
                ])
              )
            } else {
              previous[key] = value
            }

            return accumulator
          }, [{}])
      ))
  )
}
