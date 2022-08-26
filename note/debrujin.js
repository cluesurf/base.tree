
const MAX = 100

function isZeroes(a, n) {
  for (let i = 1; i <= n; i++) {
    if (a[i] === 1) {
      return false;
    }
  }
  return true;
}

function isNecklace(beads, size) {
  let p = 1;

  for (let i = 2; i <= size; i++) {
    if (beads[i - p] > beads[i]) {
      return false;
    }

    if (beads[i - p] < beads[i]) {
      p = i;
    }
  }

  if (size % p != 0) {
    return false;
  }

  return true;
}

function Granddaddy(a, n) {
  let i, j, b = new Array(MAX)

  j = 2;

  while (j <= n && a[j] == 1) {
    j++;
  }

  for (i = j; i <= n; i++) {
    b[i - j + 1] = a[i];
  }

  b[n - j + 2] = 0;

  for (i = 2; i < j; i++) {
    b[n - j + i + 1] = a[i]
  }

  if (isNecklace(b, n)) {
    return 1 - a[1];
  }

  return a[1];
}
// -------------------------------
function Grandmama(a, n) {
  let b = new Array(MAX)

  let j = 1;

  while (j < n && a[n - j + 1] == 0) {
    b[j++] = 0;
  }

  b[j] = 1;

  let k = 2;

  for (let i = j + 1; i <= n; i++) {
    b[i] = a[k++];
  }

  if (isNecklace(b, n)) {
    return 1 - a[1];
  }

  return a[1];
}

function PCR3(a, n) {
  const b = new Array(MAX)

  for (let i = 1; i < n; i++) {
    b[i] = a[i + 1];
  }

  b[n] = 1;

  if (isNecklace(b, n)) {
    return 1 - a[1];
  }

  return a[1];
}

function PCR4(a, n) {
  let i, b = new Array(MAX);

  b[1] = 0;

  for (i = 2; i <= n; i++) {
    b[i] = a[i];
  }

  if (isNecklace(b, n)) {
    return 1 - a[1];
  }

  return a[1];
}
// ===========================================
// Co-necklace Successor Rules
// ===========================================
function CCR1(a, n) {
  let i, j, b = new Array(MAX), c = 1;

  for (i = 2; i <= n; i++) {
    if (a[i] == 0) {
      break;
    }
  }

  for (j = i; j <= n; j++) {
    b[c++] = a[j];
  }

  b[c++] = 1;

  for (j = 2; j < i; j++) {
    b[c++] = 1 - a[j];
  }

  for (i = 1; i <= n; i++) {
    b[n + i] = 1 - b[i];
  }

  if (isNecklace(b, 2 * n)) {
    return a[1];
  }

  return 1 - a[1];
}
// -------------------------------
function CCR2(a, n) {
  let i, j, b = new Array(MAX), c = 1;

  i = n;
  while (a[i] == 0 && i >= 1) {
    i--;
  }

  if (i == 0) {
    i = n;
  }

  for (j = i + 1; j <= n; j++) {
    b[c++] = 0;
  }

  b[c++] = 1;

  for (j = 2; j <= i; j++) {
    b[c++] = 1 - a[j];
  }

  for (j = 1; j <= n; j++) {
    b[n + j] = 1 - b[j];
  }

  if (isNecklace(b, 2 *n)) {
    return a[1];
  }

  return 1 - a[1];
}
// -------------------------------
function CCR3(a, n) {
  let i, b = new Array(MAX);

  for (i = 1; i < n; i++) {
    b[i] = a[i + 1];
  }

  b[n] = 0;

  for (i = 1; i <= n; i++) {
    b[n + i] = 1 - b[i];
  }

  if (isNecklace(b, 2 *n) && !isZeroes(b, n)) {
    return a[1];
  }

  return 1 - a[1];
}
// =====================================================================
// Generate de Bruijn sequences by iteratively applying a successor rule
// =====================================================================
function DB(rule, n) {
  let new_bit, a = new Array(MAX)

  for (let i = 1; i <= n; i++) {
    a[i] = 1;  // First n bits
  }

  const sequence = []

  do {
    sequence.push(String(a[1]));
    switch (rule) {
      case 1:
        new_bit = Granddaddy(a, n);
        break;
      case 2:
        new_bit = Grandmama(a, n);
        break;
      case 3:
        new_bit = PCR3(a, n);
        break;
      case 4:
        new_bit = PCR4(a, n);
        break;
      case 5:
        new_bit = CCR1(a, n);
        break;
      case 6:
        new_bit = CCR2(a, n);
        break;
      case 7:
        new_bit = CCR3(a, n);
        break;
      default:
        break;
    }
    for (i = 1; i <= n; i++) {
      a[i] = a[i + 1];
    }
    a[n] = new_bit;
  } while (!isZeroes(a, n));
  return sequence.join('')
}

function getCodes(sequence, size) {
  const str = sequence.split('')
  const codes = new Array(str.length)
  let i = 0
  while (i < str.length) {
    let code = str.slice(i, i + size).join('')
    if (code.length < size) {
      const diff = size - code.length
      const start = str.slice(0, diff).join('')
      code = code + start
    }
    codes[i] = code
    i++
  }
  return codes
}

// let I = 4
// while (I < 6) {
//   let J = 1
//   while (J < 8) {
//     const sequence = DB(J, I)
//     console.log(sequence)
//     console.log(`  => #x${parseInt(sequence, 2).toString(16)}`)
//     J++
//     // const codes = getCodes(sequence)
//   }
//   I++
// }
const sequence = DB(3, 5)
console.log(sequence)
console.log(`  => #x${parseInt(sequence, 2).toString(16)}`)
// console.log(code, '#x' + parseInt(code, 2).toString(16).padStart(2, 0))
// console.log(code, '#x' + parseInt(code, 2).toString(16).padStart(2, 0))

// console.log(DB(1, 5), parseInt(DB(1, 5), 2).toString(16))

// function chunkStr(str, size) {
//   const numChunks = Math.ceil(str.length / size)
//   const chunks = new Array(numChunks)

//   for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
//     chunks[i] = str.substr(o, size)
//   }

//   return chunks
// }

