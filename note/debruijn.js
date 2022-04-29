
const fs = require('fs')
const sequences = fs.createWriteStream('note/debruijn-sequences.3.20.csv', { flags: 'a+' })

exports.isDeBruijnSequence = isDeBruijnSequence

walkEveryDeBruijnSequence(3, 20, s => {
  if (!isDeBruijnSequence(s)) {
    throw new Error(s)
  }
  s = '#b' + s
  sequences.write(`${s}\n`)
  console.log(s)
})

function isDeBruijnSequence(string, spanSizeInBits) {
  let bits = string.split('').reverse()
  let i = 0
  const totalElementSize = 2 ** spanSizeInBits
  const chunksVisited = new Uint8ClampedArray(totalElementSize)
  while (i < bits.length) {
    const chunk = bits.slice(i, i + spanSizeInBits)
    if (chunk.length < spanSizeInBits) {
      const diff = bits.slice(0, spanSizeInBits - chunk.length)
      chunk.push(...diff)
    }
    const string = chunk.reverse().join('')
    const number = parseInt(string, 2)
    if (chunksVisited[number] == 1) {
      return false
    }
    chunksVisited[number] = 1
    i++
  }
  return true
}

function walkEveryDeBruijnSequence(spanSizeInBits, maxSizeInBits, hook) {
  const maxSize = 2 ** maxSizeInBits
  const totalElementSize = 2 ** spanSizeInBits
  const chunksVisited = new Uint8ClampedArray(totalElementSize)

  let i = 0

  let lastMax = -1

  sizeLoop:
  while (i < maxSize) {
    const bits = i.toString(2).padStart(maxSizeInBits, 0).split('').reverse()

    resetNumberArray(chunksVisited)

    i++

    let r = getRightIndex(bits, x => x === '1')

    if (r < spanSizeInBits - 1) {
      continue sizeLoop
    }

    const sequence = []

    let k = 0

    bitLoop:
    while (k < r) {
      const chunk = getChunk(bits, k, r, spanSizeInBits)

      if (process(chunksVisited, chunk)) {
        break bitLoop
      }

      const bit = bits[k]
      sequence.push(bit)

      k++
    }

    const final = getLastChunk(bits, k, r, spanSizeInBits)
    sequence.push(...final)

    const output = sequence.reverse().join('')
    if (output.length >= spanSizeInBits) {
      const number = parseInt(output, 2)
      if (number > lastMax) {
        lastMax = number
        hook(output)
      }
    }
  }
}

function resetNumberArray(array) {
  let n = array.length
  let i = 0
  while (i < n) {
    array[i++] = 0
  }
}

function process(visited, chunk) {
  const string = chunk.reverse().join('')
  const number = parseInt(string, 2)
  if (visited[number] == 1) {
    return true
  }
  visited[number] = 1
  return false
}

function getChunk(bits, k, r, spanSizeInBits) {
  const chunk = new Array(spanSizeInBits)
  let i = 0

  while (k < r && i < spanSizeInBits) {
    chunk[i++] = bits[k++]
  }

  return chunk
}

function getLastChunk(bits, k, r, spanSizeInBits) {
  const chunk = new Array(spanSizeInBits - 1)
  let i = 1

  while (k < r && i < spanSizeInBits) {
    chunk[i++] = bits[k++]
  }

  return chunk
}

function getRightIndex(array, call) {
  let i = array.length - 1
  while (i) {
    let item = array[i]
    if (call(item)) {
      return i
    }
    i--
  }
  return -1
}
