function djb2_xor(str) {
  let len = str.length
  let h = 5381

  for (let i = 0; i < len; i++) {
    h = h * 33 ^ str[i]
  }
  return h >>> 0
}

function hash_buf_djb2_32(buf) {
  var hash = 5381;
  let view = new Uint8Array(buf);
  for (let num of view)
    hash = ((hash << 5) + hash + num) & 0xFFFFFFFF;
  return hash >>> 0;
}


function djb2Hash(str, seed) {
  for (var counter = 0, len = str.length; counter < len; counter++) {
      seed ^= (seed << 5);
      seed ^= str.charCodeAt(counter);
  }

  // We discard the sign-bit for compatibility with the DB implementation
  // and "always positive integers"
  return seed & ~(1 << 31);
}

// Explanation: https://stackoverflow.com/a/31621312/64949
const MAGIC_CONSTANT = 5381;

export default function djb2a(string) {
	let hash = MAGIC_CONSTANT;

	for (let index = 0; index < string.length; index++) {
		// Equivalent to: `hash * 33 ^ string.charCodeAt(i)`
		hash = ((hash << 5) + hash) ^ string.charCodeAt(index);
	}

	// Convert it to an unsigned 32-bit integer.
	return hash >>> 0;
}
