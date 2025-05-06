import {
  getSet
} from './common.mjs'

/**
 *  @param {string} value
 *  @returns {Set<Set<Map<string, string | number>>>}
 */
export default function toSet (value) {
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
                  const pid = map.get('pid')
                  const command = map.get('command')
                  const user = map.get('user')

                  accumulator.push(
                    new Map([
                      [
                        'pid',
                        pid
                      ],
                      [
                        'command',
                        command
                      ],
                      [
                        'user',
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
