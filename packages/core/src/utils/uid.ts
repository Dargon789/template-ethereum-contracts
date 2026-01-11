const size = 256
let index = size
let buffer: string

function getSecureRandomBytes(byteLength: number): Uint8Array {
  if (typeof globalThis !== 'undefined' && (globalThis as any).crypto?.getRandomValues) {
    const array = new Uint8Array(byteLength)
    ;(globalThis as any).crypto.getRandomValues(array)
    return array
  }

  // Node.js fallback
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const nodeCrypto = require('crypto') as typeof import('crypto')
  return new Uint8Array(nodeCrypto.randomBytes(byteLength))
}

export function uid(length = 11) {
  if (!buffer || index + length > size * 2) {
    buffer = ''
    index = 0

    const bytes = getSecureRandomBytes(size)
    for (let i = 0; i < bytes.length; i++) {
      const hex = bytes[i].toString(16).padStart(2, '0')
      buffer += hex
    }
  }
  return buffer.substring(index, index++ + length)
}
