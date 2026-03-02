
// https://github.com/xa1d3n/JavaScript-DataStructures

/*
 * Hash Table - Quadratic Probing
*/

function HashEntry(key, value) {
  this.key = key;
  this.value = value;
}

function HashTable(size) {
  this.list = new Array(size);
  this.size = 0;
}

HashTable.prototype.isFull= function() {
  return this.list.length === this.size;
}

HashTable.prototype.isEmpty= function() {
  return this.list.length === 0;
}

HashTable.prototype.set = function(key, value) {
  var i = base = hash(key)

  var step = 1;

  while (this.list[i]) {
    i = hash(base+step*step)
    step++;
  }

  this.list[i] = new HashEntry(key, value);
  this.size++;
}

HashTable.prototype.find = function(key) {
  // get hash index
  var i = base = hash(key)

  var step = 1;
  while(true) {
    if (!this.list[i]) {
      return
    } else if (this.list[i].key === key) {
      return this.list[i].value;
    } else {
      i = hash(base+step*step)
    }
    step++;
  }
}

HashTable.prototype.remove = function(key) {
  var i = base = hash(key)

  var step = 1;
  while(true) {
    if (!this.list[i]) {
      return
    } else if (this.list[i].key === key) {
      this.list[i] = null;
      this.size--;
      break;
    } else {
      i = hash(base+step*step)
    }
    step++;
  }
}
