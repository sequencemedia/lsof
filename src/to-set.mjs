import {
  getSet
} from './common.mjs'

export function toSet (value) {
  const outer = getSet(value)

  return (
    new Set(
      Array
        .from(outer)
        .map((inner) => (
          new Set(
            Array
              .from(inner)
              .reduce((accumulator, current) => {
                const map = accumulator[accumulator.length - 1] // ?? {}

                const [
                  [
                    key,
                    value
                  ]
                ] = Object.entries(current)

                if (map.has(key)) {
                  const process = map.get('PROCESS')
                  const command = map.get('COMMAND')
                  const user = map.get('USER')

                  accumulator.push(
                    new Map([
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
                  map.set(key, value)
                }

                return accumulator
              }, [new Map()])
          )
        ))
    )
  )
}
