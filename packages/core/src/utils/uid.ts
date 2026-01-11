import { randomBytes } from 'crypto'

export function uid(length = 11) {
  if (length <= 0) return ''

  // We need `length` hex characters, which is `length / 2` bytes (rounded up).
  const byteLength = Math.ceil(length / 2)

  let bytes: Uint8Array
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    // Browser or runtime with Web Crypto API
    bytes = crypto.getRandomValues(new Uint8Array(byteLength))
  } else {
    // Node.js fallback
    bytes = randomBytes(byteLength)
  }

  let hex = ''
  for (let i = 0; i < bytes.length; i++) {
    const byteHex = bytes[i].toString(16).padStart(2, '0')
    hex += byteHex
  }

  return hex.slice(0, length)
}
