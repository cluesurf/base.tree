
class Iterator {
  constructor(k, n) {
    this.k = k // alphabetSize
    this.n = n // wordSize
    this.power = new Uint32Array(n + 1)
    this.power[0] = 1;
    for (let i = 1; i <= n; i++) {
      this.power[i] = k * this.power[i - 1];
    }
    this.trees = []
    this.current = 0
    this.max = k ** n
  }

  next() {
    if (this.current === this.max) {
      return
    }

    const tree = new Tree(this.current + 1, this)
    this.current++
    this.trees.push(tree)
    return tree
  }

  getSequences() {
    let sequences = []
    this.trees.forEach(tree => {
      sequences.push(...tree.getSequences())
    })
    const map = {}
    sequences.forEach(sequence => {
      map[sequence] = true
    })
    sequences = Object.keys(map)
    return sequences.sort((a, b) => {
      const diff = a.length - b.length
      if (diff) return diff
      return a.localeCompare(b)
    })
  }
}

class Tree {
  constructor(s, iterator) {
    this.iterator = iterator
    this.seed = s
    this.head = []
    this.branches = []
    this.path = []
  }

  next() {
    if (this.ended) {
      return
    }

    const branch = new Branch(this.branches.length + 1, this)
    this.branches.push(branch)
    return branch
  }

  end() {
    this.ended = true
  }

  getSequences() {
    const sequences = []
    this.branches.forEach(branch => {
      sequences.push(branch.sequence.join(''))
    })
    return sequences
  }
}

class Branch {
  constructor(i, tree) {
    this.index = i
    this.tree = tree
    this.current = tree
    this.aggregator = new Array(tree.iterator.n + 1)
    this.sequence = []
    this.visited = new Uint8Array(tree.iterator.power[tree.iterator.n])
  }

  next() {
    let i = 0
    while (i < 3) {
      let next = this.current.head[i]
      if (!next) {
        next = this.current.head[i] = new Node(i, this.current.path.concat(i), this.current)
      }
      if (!next.ended) {
        this.nextNode = next
        return next
      }
      i++
      //   this.current = next
      //   return next
      // } else {
      //   i++
      // }
    }
    // if (this.current.parent) {
    //   this.current = this.current.parent
    //   return this.next()
    // }
  }

  end() {
    this.nextNode.ended = true
    // this.current = this.tree
  }

  applySeed() {
    for (let i = 1; i <= this.tree.iterator.n; i++) {
      this.aggregator[i] = isBitSet(this.tree.seed, i - 1)
    }
  }

  shiftAggregator() {
    for (let i = 1; i < this.tree.iterator.n; i++) {
      this.aggregator[i] = this.aggregator[i + 1];
    }
  }

  getSubstringIndex() {
    let sum = 0

    for (let i = 1; i <= this.tree.iterator.n; i++) {
      sum += this.tree.iterator.power[i - 1] * this.aggregator[i];
    }

    return sum;
  }

  visit(v) {
    this.aggregator[this.tree.iterator.n] = v;

    const index = this.getSubstringIndex();

    if (this.visited[index] == 0) {
      this.visited[index] = 1;
      this.sequence.push(v)
      return true;
    }

    return false;
  }
}

class Node {
  constructor(technique, path, parent) {
    this.ended = false
    this.technique = technique
    this.head = []
    this.path = path
    this.parent = parent
  }
}

function generate(k, n) {
  const iterator = new Iterator(k, n)
  let tree

  loop_tree:
  while (tree = iterator.next()) {
    let branch

    loop_branch:
    while (branch = tree.next()) {
      branch.applySeed()

      console.log(`${k}^${n}(${tree.seed}, ${branch.index})`)

      loop_true:
      while (true) {
        let indexes = new Array(iterator.k)
        const last = branch.aggregator[branch.tree.iterator.n];
        branch.shiftAggregator()
        let k = 0
        while (k < iterator.k) {
          indexes[k] = k++
        }

        loop_indexes:
        while (indexes.length) {
          let node = branch.next()
          if (!node) {
            tree.end()
            break loop_branch
          }

          let i
          // * - jump to top
          // * - jump to bottom
          // * - mimic last
          // * - do the opposite of last
          switch (node.technique) {
            case 0: {// jump to top
              i = indexes.pop()
              break
            }
            case 1: {// jump to bottom
              i = indexes.shift()
              break
            }
            case 2: {// mimic last
              i = (last - indexes.shift() + branch.tree.iterator.k) % branch.tree.iterator.k
              break
            }
            case 3: {// do the opposite
              // TODO
              // const last = branch.aggregator[branch.tree.iterator.n];
              // branch.shiftAggregator()
              // i = indexes.pop()
              break
            }
          }

          if (branch.visit(i)) {
            break loop_indexes
          }

          if (!indexes.length) {
            branch.end()
            break loop_true
          }
        }
      }
    }
  }

  return iterator.getSequences()
}

// console.log(generate(2, 6))

function isBitSet(n, k) {
  // to shift the kth bit
  // at 1st position
  let new_num = n >> (k - 1);

  // Since, last bit is now
  // kth bit, so doing AND with 1
  // will give result.
  return (new_num & 1);
}
