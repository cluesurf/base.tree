
// https://gist.github.com/dvberkel/1950267
console.log(deBruijnSequence(2, 5))

function *lengthLimitedLyndonWords(s,n) {
  const w = [-1]
  while (w.length) {
    w[w.length - 1] += 1
    yield w
    const m = w.length
    while (w.length < n) {
      w.push(w[w.length - m])
    }
    while (w && w[w.length - 1] == s - 1) {
      w.pop()
    }
  }
}

function *lyndonWordsWithLength(s,n) {
  if (n == 0) {
    const array = []
    yield array
  }
  for (w of lengthLimitedLyndonWords(s,n)) {
    if (w.length == n) {
      yield w
    }
  }
}

function *lyndonWords(s) {
  let n = 0
  while (true) {
    for (w of lyndonWordsWithLength(s,n)) {
      yield w
    }
    n += 1
  }
}

function deBruijnSequence(s,n) {
  const output = []
  for (w of lengthLimitedLyndonWords(s,n)) {
    if (n % w.length == 0) {
      output.push(...w)
    }
  }
  return output.join('')
}
