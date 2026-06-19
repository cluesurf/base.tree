const crypto = (() => {
  const hex = (buffer) => Array.from(new Uint8Array(buffer)).map((b) => b.toString(16).padStart(2, '0')).join('')
  const bytes = (text) => new TextEncoder().encode(text)
  const digest = async (algorithm, input) => hex(await globalThis.crypto.subtle.digest(algorithm, bytes(input)))
  const mac = async (algorithm, key, data) => {
    const cryptoKey = await globalThis.crypto.subtle.importKey('raw', bytes(key), { name: 'HMAC', hash: algorithm }, false, ['sign'])
    return hex(await globalThis.crypto.subtle.sign('HMAC', cryptoKey, bytes(data)))
  }
  return {
    sha256: (input) => digest('SHA-256', input),
    sha512: (input) => digest('SHA-512', input),
    md5: (input) => { throw new Error('MD5 is not available in the Web Crypto API') },
    hmacSha256: (key, data) => mac('SHA-256', key, data),
    hmacSha512: (key, data) => mac('SHA-512', key, data),
  }
})()
