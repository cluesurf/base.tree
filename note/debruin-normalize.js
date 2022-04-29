
const fs = require('fs')

const inputSequences = fs.readFileSync('note/debruijn.graph.csv', 'utf-8').trim().split(/\n+/)
const outputSequencesMap = {}

inputSequences.forEach((seq, i) => {
  console.log(seq, i)
  const longest = rotateToLongest(seq)
  outputSequencesMap[longest] = true
})

fs.writeFileSync('note/debruijn.graph.out.csv', Object.keys(outputSequencesMap).sort().join('\n'))

function rotateToLongest(seq) {
  const sizes = {}
  let size
  let start
  let prev
  let leadingZeroes
  seq.split('').forEach((x, i) => {
    if (i === 0) {
      if (x === '0') {
        size = 1
        start = i
        leadingZeroes = 1
      }
    } else if (prev === '1') {
      if (x === '0') {
        size = 1
        start = i
      }
    } else if (prev === '0') {
      if (x === '1') {
        sizes[start] = size
        size = 0
        start = undefined
      } else {
        size++
        if (start === 0) {
          leadingZeroes++
        }
      }
    }
    prev = x
  })

  if (start != null) {
    if (leadingZeroes != null) {
      sizes[start] = size + leadingZeroes
    }
  }

  let largestSize = 0
  let largestIndex
  Object.keys(sizes).forEach(start => {
    const size = sizes[start]
    if (size > largestSize) {
      largestIndex = start
      largestSize = size
    }
  })

  let i = 0
  while (i < largestIndex) {
    seq = rol(seq)
    i++
  }

  return seq
}

function rol(n) {
  const bits = n.split('').reverse()
  const left = bits.pop()
  bits.unshift(left)
  const string = bits.reverse().join('')
  return string
}

function ror(n, size) {
  const bits = n.split('').reverse()
  const right = bits.shift()
  bits.push(right)
  const string = bits.reverse().join('')
  return string
}
