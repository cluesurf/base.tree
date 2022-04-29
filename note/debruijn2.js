
class Iterator {
  constructor(k, n, seed) {
    this.seed = seed
    this.k = k
    this.n = n
    this.power = new Uint32Array(n + 1)
    this.aggregator = new Array(n + 1)
    this.sequence = []

    this.power[0] = 1;
    for (let i = 1; i <= n; i++) {
      this.power[i] = k * this.power[i - 1];
    }

    this.visited = new Uint8Array(this.power[n])
  }
}

//------------------------------------------------------
function getSubstringIndex(iterator) {
  let sum = 0

  for (let i = 1; i <= iterator.n; i++) {
    sum += iterator.power[i - 1] * iterator.aggregator[i];
  }

  return sum;
}
//------------------------------------------------------
function Visit(v, iterator) {
  iterator.aggregator[iterator.n] = v;

  const index = getSubstringIndex(iterator);

  if (iterator.visited[index] == 0) {
    iterator.visited[index] = 1;
    iterator.sequence.push(v)
    return true;
  }

  return false;
}

function applySeed(iterator) {
  for (let i = 1; i <= iterator.n; i++) {
    iterator.aggregator[i] = isBitSet(iterator.seed, i - 1)
  }
}

function shiftAggregator(iterator) {
  for (let i = 1; i < iterator.n; i++) {
    iterator.aggregator[i] = iterator.aggregator[i + 1];
  }
}

//------------------------------------------------------
// Greedily add the LARGEST value possible
//------------------------------------------------------
function GreedyMax(iterator) {
  let i

  applySeed(iterator)

  while (true) {
    shiftAggregator(iterator)

    for (i = iterator.k - 1; i >= 0; i--) {
      if (Visit(i, iterator)) {
        break;
      }
    }

    if  (i < 0) {
      return;
    }
  }
}

// //------------------------------------------------------
// // Greedily add the SMALLEST value possible
// //------------------------------------------------------
function GreedyMin(iterator) {
  let i;

  applySeed(iterator)

  while (1) {
    shiftAggregator(iterator)

    for (i = 0; i <= iterator.k - 1; i++) {
      if (Visit(i, iterator)) {
        break;
      }
    }

    if  (i == iterator.k) {
      return;
    }
  }
}

// //---------------------------------------------------------------
// // Greedily try the SAME as the last bit then decrement (mod k)
// //---------------------------------------------------------------
function GreedySame(iterator) {
  let i

  // Seed string of sequence (very important). When k=3 seed is ...012012012
  iterator.aggregator[iterator.n] = iterator.k - 1;
  applySeed(iterator)

  // The last bit of the seed starts the sequence
  Visit(iterator.aggregator[iterator.n], iterator);

  while (1) {
    const last = iterator.aggregator[iterator.n];
    shiftAggregator(iterator)
    for (i = 0; i <= iterator.k - 1; i++) {
      const x = (last - i + iterator.k) % iterator.k
      if (Visit(x, iterator)) {
        break;
      }
    }

    if (i == iterator.k) {
      return;
    }
  }
}
// //------------------------------------------------------
// // Greedily increment the value of the last bit (mod k)
// // When binary, this is prefer OPPOSITE
// //------------------------------------------------------
// void GreedyOpposite(char *visited) {
//     int i,last,seen[k],same=1;

//     // Tracking for special case
//     for (i=1; i<k; i++) seen[i] = 0;

//     // Initial string of sequence 0^n (very important)
//     for (i=1; i<=n; i++) a[i] = 0;
//     Visit(a[n], visited);

//     while (1) {
//         last = a[n];
//         for (i=1; i<n; i++) a[i] = a[i+1];

//         // Special case when suffix is x^{n-1} where x > 0
//         if (last > 0 && same >= n-1 && seen[last] >= k-1) {
//             if (same == n-1) Visit(a[n], visited);
//             else Visit(last-1, visited);
//         }
//         else {
//             for(i=0; i<=k-1; i++) if (Visit((last + i+1) % k, visited)) break;
//             if (i == k) return;
//         }

//         // Track information for special case
//         if (a[n] == last) same++;
//         else same = 1;
//         if (same >= n-1) seen[a[n]]++;
//     }
// }
//------------------------------------------------------
function generate(k, n) {
  const sequences = {}
  const pow = 2 ** n
  for (let i = 0; i < pow; i++) {
    const iterator = new Iterator(k, n, i)
    GreedyMax(iterator);
    // if (option == 2) GreedyMin(visited);
    // if (option == 3) GreedyOpposite(visited);
    // if (option == 4) GreedySame(visited);
    sequences[iterator.sequence.join('')] = true

    const iterator2 = new Iterator(k, n, i)
    GreedyMin(iterator2);
    // if (option == 2) GreedyMin(visited);
    // if (option == 3) GreedyOpposite(visited);
    // if (option == 4) GreedySame(visited);
    sequences[iterator2.sequence.join('')] = true

    const iterator3 = new Iterator(k, n, i)
    GreedySame(iterator3);
    // if (option == 2) GreedyMin(visited);
    // if (option == 3) GreedyOpposite(visited);
    // if (option == 4) GreedySame(visited);
    sequences[iterator3.sequence.join('')] = true
  }
  return Object.keys(sequences).sort((a, b) => {
    const diff = a.length - b.length
    if (diff) return diff
    return a.localeCompare(b)
  })
}

console.log(generate(2, 5))

function swapArrayElements(arr, a, b) {
  const tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
};

function permute(arr) {
  const permutations = [];

  const c = new Array(arr.length).fill(0);
  permutations.push(arr.slice());

  let i = 0;
  while (i < arr.length) {
    if (c[i] < i) {
      swapArrayElements(arr, i, i % 2 ? c[i] : 0);
      permutations.push(arr.slice());

      c[i] += 1;
      i = 0;
    } else {
      c[i] = 0;
      i += 1;
    }
  }

  return permutations;
};

function isBitSet(n, k) {
  // to shift the kth bit
  // at 1st position
  let new_num = n >> (k - 1);

  // Since, last bit is now
  // kth bit, so doing AND with 1
  // will give result.
  return (new_num & 1);
}
