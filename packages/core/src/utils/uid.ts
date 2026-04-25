import { randomBytes } from 'node:crypto'

const size = 256
let index = size
let buffer: string

export function uid(length = 11) {
  if (!buffer || index + length > size * 2) {
    index = 0
    const bytes =
      typeof globalThis.crypto !== 'undefined' &&
      typeof globalThis.crypto.getRandomValues === 'function'
        ? globalThis.crypto.getRandomValues(new Uint8Array(size))
        : randomBytes(size)
    buffer = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join(
      '',
    )
  }
  return buffer.substring(index, index++ + length)
}
