import { randomBytes } from 'crypto'

const size = 256
let index = size
let buffer: string

export function uid(length = 11) {
  if (!buffer || index + length > size * 2) {
    buffer = ''
    index = 0
    const bytes = randomBytes(size)
    for (let i = 0; i < size; i++) {
      const hex = bytes[i].toString(16).padStart(2, '0')
      buffer += hex
    }
  }
  return buffer.substring(index, index++ + length)
}
