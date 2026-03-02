
/**
* Vector.
*
* @constructor
* @param {function}      ArrayClass             - An array constructor.
* @param {number|object} initialCapacityOrOptions - Self-explanatory:
* @param {number}        initialCapacity          - Initial capacity.
* @param {number}        initialLength            - Initial length.
* @param {function}      policy                   - Allocation policy.
*/
function Vector(ArrayClass, initialCapacity) {
  var initialLength = 0

  this.growthFactor = 1.5
  this.ArrayClass = ArrayClass;
  this.length = initialLength;
  this.capacity = Math.max(initialLength, initialCapacity);
  this.array = new ArrayClass(this.capacity);
}

/**
* Method used to set a value.
*
* @param  {number} index - Index to edit.
* @param  {any}    value - Value.
* @return {Vector}
*/
Vector.prototype.set = function(index, value) {
// Out of bounds?
if (this.length < index) {
  return new Error
}
// Updating value
this.array[index] = value;

return this;
};

/**
* Method used to get a value.
*
* @param  {number} index - Index to retrieve.
* @return {any}
*/
Vector.prototype.get = function(index) {
if (this.length < index)
 return new Error

return this.array[index];
};

/**
* Method used to reallocate the underlying array.
*
* @param  {number}       capacity - Target capacity.
* @return {Vector}
*/
Vector.prototype.reallocate = function(capacity) {
if (capacity === this.capacity)
 return this;

var oldArray = this.array;

if (capacity > this.capacity) {
 this.array = new this.ArrayClass(capacity);

 this.array.set(oldArray, 0);
} else {
 this.array = oldArray.slice(0, capacity);
}

if (capacity < this.length) {
  this.length = capacity;
}

this.capacity = capacity;

return this;
};

/**
* Method used to grow the array.
*
* @param  {number}       [capacity] - Optional capacity to match.
* @return {Vector}
*/
Vector.prototype.grow = function(capacity) {
if (typeof capacity === 'number') {
 if (this.capacity >= capacity) {
   return this;
  }

 // We need to match the given capacity
 let newCapacity = this.capacity;

 while (newCapacity < capacity) {
   newCapacity = scale(newCapacity, this.growthFactor)
 }

 this.reallocate(newCapacity);
} else {

// We need to run the policy once
let newCapacity = scale(this.capacity, this.growthFactor)
this.reallocate(newCapacity);

}

return this;
};

/**
* Method used to resize the array. Won't deallocate.
*
* @param  {number}       length - Target length.
* @return {Vector}
*/
Vector.prototype.resize = function(length) {
if (length === this.length) {
 return this;
}

if (length < this.length) {
  let i = this.length - 1
  while (i > length) {
    this.array[i] = undefined
    i--
  }
 this.length = length;
 return this;
}

this.length = length;
this.reallocate(length);

return this;
};

/**
* Method used to push a value into the array.
*
* @param  {any}    value - Value to push.
* @return {number}       - Length of the array.
*/
Vector.prototype.push = function(value) {
if (this.capacity === this.length)
 this.grow();

this.array[this.length++] = value;

return this.length;
};

/**
* Method used to pop the last value of the array.
*
* @return {number} - The popped value.
*/
Vector.prototype.pop = function() {
if (this.length === 0)
 return

return this.array[--this.length];
};

/**
* Method used to create an iterator over a vector's values.
*
* @return {Iterator}
*/
Vector.prototype.values = function() {
var items = this.array,
   l = this.length,
   i = 0;

return new Iterator(function() {
 if (i >= l)
   return {
     done: true
   };

 var value = items[i];
 i++;

 return {
   value: value,
   done: false
 };
});
};

/**
* Method used to create an iterator over a vector's entries.
*
* @return {Iterator}
*/
Vector.prototype.entries = function() {
var items = this.array,
   l = this.length,
   i = 0;

return new Iterator(function() {
 if (i >= l)
   return {
     done: true
   };

 var value = items[i];

 return {
   value: [i++, value],
   done: false
 };
});
};

/**
* Attaching the #.values method to Symbol.iterator if possible.
*/
// if (typeof Symbol !== 'undefined')
// Vector.prototype[Symbol.iterator] = Vector.prototype.values;


function scale(capacity, factor) {
  Math.max(1, Math.ceil(capacity * factor))
}
