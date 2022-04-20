// https://github.com/ryepdx/gmp/blob/master/mini-gmp/mini-gmp.c

function nextPowerOfTwo (n) {
  if (n === 0) return 1
  n--
  n |= n >> 1
  n |= n >> 2
  n |= n >> 4
  n |= n >> 8
  n |= n >> 16
  return n+1
}

function countNumOnesInByte(byte) {
  return  ((byte>>3)&1)+((byte>>2)&1)+((byte>>1)&1)+(byte&1)
}

function powerOf2(v) {
  return v && !(v & (v - 1));
}

function countNumZeroesInByte(byte) {
  return countNumOnesInByte(~byte)
}

function countLeadingZeroes(uint32) {
  return Math.clz32(uint32)
}

function countLeadingOnes(int) {
  const chars = int.toString(2).split('')
  let i = 0
  while (chars[i] === '1') {
    i++
  }
  return i
}

function countOnes(n) {
  n = n - ((n >> 1) & 0x55555555)
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333)
  return ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24
}

function countZeroes(int) {
  return countOnes(~int)
}

function countTrailingOnes(int) {
  const chars = int.toString(2).split('').reverse()
  let i = 0
  while (chars[i] === '1') {
    i++
  }
  return i
}

function countTrailingZeroes(int) {
  const chars = int.toString(2).split('').reverse()
  let i = 0
  while (chars[i] === '0') {
    i++
  }
  return i
}

function reverseBits(int) {
  parseInt(int.toString(2).split('').reverse(), 2)
}

function swap16(val) {
  return ((val & 0xFF) << 8)
         | ((val >> 8) & 0xFF);
}

function swap32(val) {
  return ((val & 0xFF) << 24)
         | ((val & 0xFF00) << 8)
         | ((val >> 8) & 0xFF00)
         | ((val >> 24) & 0xFF);
}

function unsignedSwap16(num) {
  return (num>>8) | (num<<8);
}

function unsignedSwap32(num) {
  return ((num>>24)&0xff) | // move byte 3 to byte 0
  ((num<<8)&0xff0000) | // move byte 1 to byte 2
  ((num>>8)&0xff00) | // move byte 2 to byte 1
  ((num<<24)&0xff000000); // byte 0 to byte 3
}

function checkEndian() {
  var arrayBuffer = new ArrayBuffer(2);
  var uint8Array = new Uint8Array(arrayBuffer);
  var uint16array = new Uint16Array(arrayBuffer);
  uint8Array[0] = 0xAA; // set first byte
  uint8Array[1] = 0xBB; // set second byte
  if(uint16array[0] === 0xBBAA) return "little endian";
  if(uint16array[0] === 0xAABB) return "big endian";
  else throw new Error("Something crazy just happened");
}

function isBigEndian() {
  const array = new Uint8Array(4);
  const view = new Uint32Array(array.buffer);
  return !((view[0] = 1) & array[0]);
}

function nor(a, b) {
  return ~(a | b)
}

function nand(a, b) {
  return ~(a & b)
}

function xnor(a, b) {
  return ~(a ^ b)
}

/** round n down to nearest multiple of m */
long roundDown(long n, long m) {
  return n >= 0 ? (n / m) * m : ((n - m + 1) / m) * m;
}

/** round n up to nearest multiple of m */
long roundUp(long n, long m) {
  return n >= 0 ? ((n + m - 1) / m) * m : (n / m) * m;
}

const gcd = (a, b) => {
  if (b > a) b = a + (a = b) - b;
  while (true) {
      if (a % b == 0) return Math.abs(b);
      b = a % (a = b);
  }
};

const lcm = (a, b) => {
  return Math.abs(a / gcd(a, b) * b);
};

function multiple(int, multipleOf) {
  var remainder = int % multipleOf;
  if (remainder === 0) {
      return true;
  } else {
      return false;
  }
}

is_even
is_odd

function isEven(n) { return (n & 1) == 0 }


fn reverse_bits_fallback<P: PrimInt>(i: P) -> P {
  let rep_01: P = one_per_byte();
  let rep_03 = (rep_01 << 1) | rep_01;
  let rep_05 = (rep_01 << 2) | rep_01;
  let rep_0f = (rep_03 << 2) | rep_03;
  let rep_33 = (rep_03 << 4) | rep_03;
  let rep_55 = (rep_05 << 4) | rep_05;

  // code above only used to determine rep_0f, rep_33, rep_55;
  // optimizer should be able to do it in compile time
  let mut ret = i.swap_bytes();
  ret = ((ret & rep_0f) << 4) | ((ret >> 4) & rep_0f);
  ret = ((ret & rep_33) << 2) | ((ret >> 2) & rep_33);
  ret = ((ret & rep_55) << 1) | ((ret >> 1) & rep_55);
  ret
}

getFirstSetBitIndex
rotl(uint32_t a, uint8_t n) {
  return (a << n) | (a >> (32 - n));
}

int implication(int x, int y) {
 return (!x) | y;
}

/*
 * bitParity - returns 1 if x contains an odd number of 0's
 *   Examples: bitParity(5) = 0, bitParity(7) = 1
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 20
 *   Rating: 4
 */
int bitParity(int x) {
  //cuts the number into halves and xors them. repeats for 16, 8, 4, 2, and 1 bit chunks till it gets the final answer
  int mask = (0xFF << 8) | (0xFF);
  int x1 = x & mask;
  int x2 = (x >> 16) & mask;
  int answer = x1 ^ x2;
  x1 = answer & 0xFF;
  x2 = (answer >> 8) & 0xFF;
  answer = x1 ^ x2;
  x1 = answer & 0x0F;
  x2 = (answer >> 4) & 0x0F;
  answer = x1 ^ x2;
  x1 = answer & 0x03;
  x2 = (answer >> 2) & 0x03;
  answer = x1 ^ x2;
  x1 = answer & 0x01;
  x2 = (answer >> 1) & 0x01;
  return x1 ^ x2;
}

/*
 * sign - return 1 if positive, 0 if zero, and -1 if negative
 *  Examples: sign(130) = 1
 *            sign(-23) = -1
 *  Legal ops: ! ~ & ^ | + << >>
 *  Max ops: 10
 *  Rating: 2
 */
int sign(int x) {
  //creates a mask of tmax and another which is all the leading bit of x so either all 0s for positive or all 1s for negative.  returns either x and the tmax mask banged twice to return either 1 or 0 depending on if the number was 0 or some psotive value, or returns mask2 which would be -1 for a negative number or 0 for a positive or 0
  int mask = ~(1 << 31);
  int posOrOther = !!(x & mask);
  int mask2 = x >> 31;
  return (posOrOther | mask2);
}

/*
 * isEqual - return 1 if x == y, and 0 otherwise
 *   Examples: isEqual(5,5) = 1, isEqual(4,5) = 0
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 5
 *   Rating: 2
 */
int isEqual(int x, int y) {
  // two ints are equal if AND-ing one and the inverse
  // of the other produces zero.
  return ! (x ^ y);
}

/*
 * isNonZero - Check whether x is nonzero using
 *              the legal operators except !
 *   Examples: isNonZero(3) = 1, isNonZero(0) = 0
 *   Legal ops: ~ & ^ | + << >>
 *   Max ops: 10
 *   Rating: 4
 */
int isNonZero(int x) {
  // "replicate" any 1 to the least significant bit
  int y = x >> 16 | x;
  y = y >> 8 | y;
  y = y >> 4 | y;
  y = y >> 2 | y;
  y = y >> 1 | y;
  return y & 1;
}

/*
 * tc2sm - Convert from two's complement to sign-magnitude
 *   where the MSB is the sign bit
 *   You can assume that x > TMin
 *   Example: tc2sm(-5) = 0x80000005.
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 15
 *   Rating: 4
 */
int tc2sm(int x) {
  // just doing the reverse of two's complement --
  // subtract one and flip, applying the signbit
  // again if it existed to begin with.
  int sign = x>>31;

  int clean = (sign << 31); // clean the signbit

  int a = (sign ^ x);   // does nothing for positive numbers
  int b = (~sign + 1);  // for negative numbers makes 000..1
                        // for positive numbers makes 111..0

  return clean + a + b;
}


#define INT_BITS 32

/*Function to left rotate n by d bits*/
int leftRotate(int n, unsigned int d)
{
   /* In n<<d, last d bits are 0. To put first 3 bits of n at
     last, do bitwise or of n<<d with n >>(INT_BITS - d) */
   return (n << d)|(n >> (INT_BITS - d));
}

/*Function to right rotate n by d bits*/
int rightRotate(int n, unsigned int d)
{
   /* In n>>d, first d bits are 0. To put last 3 bits of at
     first, do bitwise or of n>>d with n <<(INT_BITS - d) */
   return (n >> d)|(n << (INT_BITS - d));
}


What is the ideal way to simulate overflowing functionality in JavaScript

For maximum performance, what is the ideal way of representing "overflowing" functionality in JavaScript? That is, Rust has 4 or 5 functions for each basic arithmetic operation:

1. `checked`
1. `unchecked`
1. `saturated`
1. `wrapped`
1. `overflowed`

How would you simulate these in JavaScript to maximize performance (in JavaScript)?

The reason for asking is, I am making a language like Rust compile to JavaScript, and so it will have the same uint API as the Rust-like language, for all environments it compiles to.

Here is how I originally thought of it, how would you improve on this? Assume we typecheck the inputs, so we know they are the appropriate size (8 bits, in this case). Because we are in JavaScript, and the number will just become however large it needs to be (up to `Number.MAX_VALUE`), we have certain choices/privileges in implementing this API.

function addUnchecked8(a, b) {
  const c = a + b
  if (c > 255) {
    throw new Error('Overflow')
  } else {
    return f
  }
}

function addChecked8(a, b) {
  const c = a + b
  if (c > 255) {
    return null
  } else {
    return c
  }
}

function addSaturated8(a, b) {
  const c = a + b
  if (c > 255) {
    return 255
  } else {
    return c
  }
}

function addWrapped8(a, b) {
  const c = a + b
  if (c > 255) {
    return c % 256
  } else {
    return c
  }
}

function addOverflowed8(a, b) {
  const c = a + b
  if (c > 255) {
    return [c, true]
  } else {
    return [c, false]
  }
}

function nextPow2(v) {
  v += v === 0;
  --v;
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v + 1;
}

//Rounds down to previous power of 2
function prevPow2(v) {
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v - (v>>>1);
}

// https://github.com/virtyaluk/Bit-Twiddling-Hacks#reverse-bits-in-word-by-lookup-table

// https://www.geeksforgeeks.org/write-an-efficient-c-program-to-reverse-bits-of-a-number/
// https://aticleworld.com/5-way-to-reverse-bits-of-an-integer/


function reverse(bits) {
  var  x=new Uint32Array(1); x[0]=bits;
  x[0] = ((x[0] & 0x0000ffff) << 16) | ((x[0] & 0xffff0000) >>> 16);
  x[0] = ((x[0] & 0x55555555) << 1) | ((x[0] & 0xAAAAAAAA) >>> 1);
  x[0] = ((x[0] & 0x33333333) << 2) | ((x[0] & 0xCCCCCCCC) >>> 2);
  x[0] = ((x[0] & 0x0F0F0F0F) << 4) | ((x[0] & 0xF0F0F0F0) >>> 4);
  x[0] = ((x[0] & 0x00FF00FF) << 8) | ((x[0] & 0xFF00FF00) >>> 8);
  return x[0];
}

// https://github.com/iponkan/leetcode-js/blob/master/problems/190.reverse-bits.md

const table = new Uint8Array([
  0x0, 0x8, 0x4, 0xc, 0x2, 0xa, 0x6, 0xe,
  0x1, 0x9, 0x5, 0xd, 0x3, 0xb, 0x7, 0xf,
]

function reverse(n) {
  // Reverse the top and bottom nibble then swap them.
  return (table[n&0b1111] << 4) | table[n>>4];
}

unsigned char reverse(unsigned char c) {
  int shift;
  unsigned char result = 0;
  for (shift = 0; shift < CHAR_BIT; shift++) {
     if (c & (0x01 << shift))
        result |= (0x80 >> shift);
  }
  return result;
}

function reverseBits8(n) {
  return BIT_REVERSAL_TABLE[n]
}

function reverseBits16(n) {
  return (BIT_REVERSAL_TABLE[(n >> 8) & 0xff] |
    BIT_REVERSAL_TABLE[n & 0xff] << 8)
}

function reverseBits32(n) {
  return (BIT_REVERSAL_TABLE[(n >> 24) & 0xff] |
    BIT_REVERSAL_TABLE[(n >> 16) & 0xff] << 8 |
    BIT_REVERSAL_TABLE[(n >> 8) & 0xff] << 16 |
    BIT_REVERSAL_TABLE[n & 0xff] << 24)
}


int countLeadingZeroes(uint32_t v) {
  if (v == 0) {
    return 32;
  }
#if __has_builtin(__builtin_clz) || defined(__GNUC__)
  return __builtin_clz(v);
#elif defined(_MSC_VER)
  unsigned long count;
  _BitScanReverse(&count, v);
  // BitScanReverse gives the bit position (0 for the LSB, then 1, etc.) of the
  // first bit that is 1, when looking from the MSB. To count leading zeros, we
  // need to adjust that.
  return 31 - int(count);
#else
  // See Stanford bithacks, find the log base 2 of an N-bit integer in
  // O(lg(N)) operations with multiply and lookup:
  // http://graphics.stanford.edu/~seander/bithacks.html#IntegerLogDeBruijn
  static const uint8_t tbl[32] = {31, 22, 30, 21, 18, 10, 29, 2,  20, 17, 15,
                                  13, 9,  6,  28, 1,  23, 19, 11, 3,  16, 14,
                                  7,  24, 12, 4,  8,  25, 5,  26, 27, 0};
  v = v | (v >> 1);
  v = v | (v >> 2);
  v = v | (v >> 4);
  v = v | (v >> 8);
  v = v | (v >> 16);
  return (int)tbl[((uint32_t)(v * 0x07C4ACDDU)) >> 27];
#endif
}

function countTrailingZeroes(x)
{

    // Map a bit value mod
    // 37 to its position
    let lookup = [ 32, 0, 1, 26, 2, 23,
                   27, 0, 3, 16, 24, 30,
                   28, 11, 0, 13, 4, 7,
                   17, 0, 25, 22, 31, 15,
                   29, 10, 12, 6, 0, 21,
                   14, 9, 5, 20, 8, 19, 18 ];

    // Only difference between
    // (x and -x) is the value
    // of signed magnitude
    // (leftmostbit) negative
    // numbers signed bit is 1
    return lookup[(-x & x) % 37];
}

function countTrailingOnes(x) {
  return countTrailingZeroes(~x)
}

// Map a bit value mod
// 37 to its position
const trailingZeroesTable = [ 32, 0, 1, 26, 2, 23,
  27, 0, 3, 16, 24, 30,
  28, 11, 0, 13, 4, 7,
  17, 0, 25, 22, 31, 15,
  29, 10, 12, 6, 0, 21,
  14, 9, 5, 20, 8, 19, 18
];

const leadingZeroesTable = {
  31, 22, 30, 21, 18, 10, 29, 2, 20, 17, 15, 13, 9, 6, 28, 1,
  23, 19, 11, 3, 16, 14, 7, 24, 12, 4, 8, 25, 5, 26, 27, 0
}

function countTrailingZeroes(x) {
  // Only difference between
  // (x and -x) is the value
  // of signed magnitude
  // (leftmostbit) negative
  // numbers signed bit is 1
  return trailingZeroesTable[(-x & x) % 37];
}

function countTrailingOnes(x) {
  return countTrailingZeroes(~x)
}

function count_leading_zeros_32(x) {
  x |= x >> 1;
  x |= x >> 2;
  x |= x >> 4;
  x |= x >> 8;
  x |= x >> 16;
  return leadingZeroesTable[((x * 0x07c4acdd) & 0xffffffff) >> 27];
}

function(v) {
  var c = 32
  v &= -v
  if (v) c--
  if (v & 0x0000FFFF) c -= 16
  if (v & 0x00FF00FF) c -= 8
  if (v & 0x0F0F0F0F) c -= 4
  if (v & 0x33333333) c -= 2
  if (v & 0x55555555) c -= 1
  return c
}

// https://github.com/llvm-mirror/llvm/blob/2c4ca6832fa6b306ee6a7010bfb80a3f2596f824/include/llvm/Support/MathExtras.h

/// Returns the next power of two (in 64-bits) that is strictly greater than A.
/// Returns zero on overflow.
inline uint64_t NextPowerOf2(uint64_t A) {
  A |= (A >> 1);
  A |= (A >> 2);
  A |= (A >> 4);
  A |= (A >> 8);
  A |= (A >> 16);
  A |= (A >> 32);
  return A + 1;
}

/// Returns the power of two which is less than or equal to the given value.
/// Essentially, it is a floor operation across the domain of powers of two.
inline uint64_t PowerOf2Floor(uint64_t A) {
  if (!A) return 0;
  return 1ull << (63 - countLeadingZeros(A, ZB_Undefined));
}

/// Returns the power of two which is greater than or equal to the given value.
/// Essentially, it is a ceil operation across the domain of powers of two.
inline uint64_t PowerOf2Ceil(uint64_t A) {
  if (!A)
    return 0;
  return NextPowerOf2(A - 1);
}

'use strict';

var ToUint32 = require('es-abstract/2021/ToUint32');
var Call = require('es-abstract/2021/Call');

var $Number = Number;
var LOG2E = Math.LOG2E;
var floor = Math.floor;
var log = Math.log;

var numberCLZ = $Number.prototype.clz; // // Safari 8 has Number#clz

module.exports = function clz32(value) {
	var x = $Number(value);
	var number = ToUint32(x);
	if (number === 0) {
		// eslint-disable-next-line no-magic-numbers
		return 32;
	}
	// eslint-disable-next-line no-magic-numbers
	return numberCLZ ? Call(numberCLZ, number) : 31 - floor(log(number + 0.5) * LOG2E);
};


function reverseBits32(n) {
  return (BIT_REVERSAL_TABLE[n & 0xff] * 2**24) +
    (BIT_REVERSAL_TABLE[(n >>> 8)  & 0xff] * 2 **16) +
    (BIT_REVERSAL_TABLE[(n >>> 16) & 0xff] * 2 **8) +
    BIT_REVERSAL_TABLE[(n >>> 24) & 0xff];
}


const leadingZeroesTable = [
  31, 22, 30, 21, 18, 10, 29, 2,
  20, 17, 15, 13, 9, 6, 28, 1,
  23, 19, 11, 3, 16, 14, 7, 24,
  12, 4, 8, 25, 5, 26, 27, 0
]

    const trailingZeroesTable = [
      32, 0, 1, 26, 2, 23, 27, 0, 3, 16, 24, 30,
      28, 11, 0, 13, 4, 7,
      17, 0, 25, 22, 31, 15,
      29, 10, 12, 6, 0, 21,
      14, 9, 5, 20, 8, 19, 18
    ]

    function countTrailingZeroes32(x) {
      // Only difference between
      // (x and -x) is the value
      // of signed magnitude
      // (leftmostbit) negative
      // numbers signed bit is 1
      return trailingZeroesTable[(-x & x) % 37];
    }

function countTrailingOnes32(x) {
  return countTrailingZeroes32(~x)
}

function countTrailingOnes16(x) {
  return countTrailingZeroes32(~x)
}

function countTrailingOnes8(x) {
  return countTrailingZeroes32(~x)
}

console.log('countTrailingOnes32', countTrailingOnes32(0b00000011000011110000110000011111))
console.log('countTrailingOnes16', countTrailingOnes16(0b0000001100001111))
console.log('countTrailingOnes8', countTrailingOnes8(0b00000011))

function countLeadingZeroes32(x) {
  x |= x >> 1;
  x |= x >> 2;
  x |= x >> 4;
  x |= x >> 8;
  x |= x >> 16;
  return leadingZeroesTable[((x * 0x07c4acdd) & 0xffffffff) >> 27];
}

function countBits64(x) {
  let y
  y = x * 0x0002000400080010;
  y = y & 0x1111111111111111;
  y = y * 0x1111111111111111;
  y = y >> 60;
  return y;
}

function pop32(n) {
  n = n - ((n >> 1) & 0x55555555);        // add panrs of bnts
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333);  // quads
  n = (n + (n >> 4)) & 0x0F0F0F0F;        // groups of 8
  return (n * 0x01010101) >> 24;          // horizontal sum of bytes
}

function countOnes8(n)
{
  const oneCounterTable = [
    0, 1, 1, 2, 1, 2, 2, 3,
    1, 2, 2, 3, 2, 3, 3, 4
  ]

  return oneCounterTable[n & 0x0F] + oneCounterTable[n >> 4];
}
// Macros to generate the lookup table (at compile-time)
#define B2(n) n, n + 1, n + 1, n + 2
#define B4(n) B2(n), B2(n + 1), B2(n + 1), B2(n + 2)
#define B6(n) B4(n), B4(n + 1), B4(n + 1), B4(n + 2)
#define COUNT_BITS B6(0), B6(1), B6(1), B6(2)

// Lookup table to store the total number of bits set for each index
// in the table. The macro `COUNT_BITS` generates the table.
unsigned int lookup[256] = { COUNT_BITS };

// Function to count the total number of set bits in `n` using a lookup table
int countSetBits(int n)
{
    // print lookup table (number of bits set for integer `i`)

    /*
    for (int i = 0; i < 256; i++) {
        cout << i << " has " << lookup[i] << " bits\n";
    }
    */

    // Assuming a 32–bit (4 bytes) integer, break the integer into 8–bit chunks.
    // Note that mask used `0xff` is `11111111` in binary

    int count = lookup[n & 0xff] +      // consider the first 8 bits
        lookup[(n >> 8) & 0xff] +       // consider the next 8 bits
        lookup[(n >> 16) & 0xff] +      // consider the next 8 bits
        lookup[(n >> 24) & 0xff];       // consider last 8 bits

    return count;
}


const COUNT_BITS_TABLE = makeLookupTable()

function makeLookupTable() {
  const table = new Uint8Array(256)
  // generate the lookup table
  for (let i = 0; i < 256; i++) {
    table[i] = (i & 1) + table[(i / 2) | 0];
  }
  return table
}

function countOneBits32(n) {
  return COUNT_BITS_TABLE[n & 0xff] +      // consider the first 8 bits
    COUNT_BITS_TABLE[(n >> 8) & 0xff] +       // consider the next 8 bits
    COUNT_BITS_TABLE[(n >> 16) & 0xff] +      // consider the next 8 bits
    COUNT_BITS_TABLE[(n >> 24) & 0xff];
}

function countOneBits16(n) {
  return COUNT_BITS_TABLE[n & 0xff] +      // consider the first 8 bits
    COUNT_BITS_TABLE[(n >> 8) & 0xff]
}

function countOneBits8(n) {
  return COUNT_BITS_TABLE[n & 0xff]
}

console.log('countOneBits32', countOneBits32(0b10101010000000001010101000000000))
console.log('countOneBits32', countOneBits32(0b10101011110000001010101000000000))
console.log('countOneBits16', countOneBits16(0b1010101000000000))
console.log('countOneBits8', countOneBits8(0b10000010))

// https://cs-fundamentals.com/tech-interview/c/c-program-to-count-number-of-ones-in-unsigned-integer

/// PropogateLowestBitDownward
	/// How to propogate the lowest 1 bit downward.
	/// Returns all bits set for an input of 0.
	/// Example:
	///     01011000 -> 01011111
	template <typename T>
	inline T PropogateLowestBitDownward(T x){
		return (T)(x | (x - 1));
	}

  /// TurnOffLowestContiguousBits
	/// How to turn off the lowest contiguous string of 1 bits.
	/// Returns 0 for an input of 0.
	/// Returns 0 for an input of all bits set.
	/// Example:
	///     01011000 -> 01000000
	template <typename T>
	inline T TurnOffLowestContiguousBits(T x){
		return (T)(((x | (x - 1)) + 1) & x);
	}

  //https://github.com/electronicarts/EAStdC/blob/master/include/EAStdC/EABitTricks.h

  template <typename T>
	EA_NO_UBSAN inline bool SignedAdditionWouldOverflow(T x, T y){
		const T temp = (T)(x + y);
		return (((temp ^ x) & (temp ^ y)) >> ((sizeof(T) * (T)8) - 1)) != 0;
	}

	template <typename T>
	inline bool SignedSubtractionWouldOverflow(T x, T y){
		const T tMin = (T)((T)1 << (T)((sizeof(T) * 8) - 1)); // This is not strictly portable.
		return (x >= 0) ? (y < (T)(x - (T)-(tMin + 1))) : (y > (T)(x - tMin));
	}

	template <typename T>
	inline bool UnsignedAdditionWouldOverflow(T x, T y){
		const T temp = (T)(x + y);
		return (temp < x) && (temp < y);
	}

	template <typename T>
	inline bool UnsignedSubtractionWouldOverflow(T x, T y){
		return y > x;
	}

  template <typename T>
	inline bool UnsignedMultiplyWouldOverflow(T x, T y){
		if(y)
			return (((x * y) / y) != x);
		return false;
	}

	inline bool SignedMultiplyWouldOverflow(int32_t x, int32_t y){
		if((y < 0) && (x == (int32_t)INT32_C(0x80000000)))
			return true;
		if(y)
			return (((x * y) / y) != x);
		return false;
	}

	inline bool SignedMultiplyWouldOverflow(int64_t x, int64_t y){
		if((y < 0) && (x == (int64_t)INT64_C(0x8000000000000000)))
			return true;
		if(y)
			return (((x * y) / y) != x);
		return false;
	}
  template <typename T>
	inline bool UnsignedDivisionWouldOverflow(T /*x*/, T y){
		return y == 0;
	}

	/// SignedDivisionWouldOverflow
	/// How to detect that a division will overflow.
	inline bool SignedDivisionWouldOverflow(int32_t x, int32_t y){
		return (y == 0) || ((x == (int32_t)INT32_C(0x80000000)) && (y == -1));
	}

	inline bool SignedDivisionWouldOverflow(int64_t x, int64_t y){
		return (y == 0) || ((x == (int64_t)INT64_C(0x8000000000000000)) && (y == -1));
	}

  inline int GetAverage(T x, T y){
		return (x & y) + ((x ^ y) >> 1); // Need to use '>> 1' instead of '/ 2'
	}

  inline int GetAverage_Ceiling(T x, T y){
		return (x | y) - ((x ^ y) >> 1); // Need to use '>> 1' instead of '/ 2'
	}

  inline int GetParity(uint32_t x){
		x ^= x >> 1;
		x ^= x >> 2;
		x = (x & UINT32_C(0x11111111)) * UINT32_C(0x11111111);
		return (int)((x >> 28) & 1);
	}

	inline int GetParity(uint64_t x){
		x ^= x >> 1;
		x ^= x >> 2;
		x = (x & UINT64_C(0x1111111111111111)) * UINT64_C(0x1111111111111111);
		return (int)((x >> 60) & 1);
	}

  inline bool GetIsBigEndian(){
		const int temp = 1;
		return ((char*)&temp)[0] == 0;
	}

  inline T ToggleBetweenIntegers(T x, T a, T b){
		return (T)(x ^ a ^ b);
	}

  inline bool IsTwosComplement(){
		return ((-2 | -3) == -1);
	}

	inline bool IsOnesComplement(){
		return ((-1 & -2) == -3);
	}

  static uint8_t clzlut[256] = {
    8,7,6,6,5,5,5,5,
    4,4,4,4,4,4,4,4,
    3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,
    2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,
    1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0
  };

  uint32_t clz(uint32_t val)
  {
    uint32_t accum = 0;

    accum += clzlut[val >> 24];
    accum += (accum == 8 ) ? clzlut[(val >> 16) & 0xFF] : 0;
    accum += (accum == 16) ? clzlut[(val >>  8) & 0xFF] : 0;
    accum += (accum == 24) ? clzlut[ val        & 0xFF] : 0;

    return accum;
  }

  if (!Math.clz32) Math.clz32 = (function(log, LN2){
    return function(x) {
      // Let n be ToUint32(x).
      // Let p be the number of leading zero bits in
      // the 32-bit binary representation of n.
      // Return p.
      var asUint = x >>> 0;
      if (asUint === 0) {
        return 32;
      }
      return 31 - (log(asUint) / LN2 | 0) |0; // the "| 0" acts like math.floor
    };
  })(Math.log, Math.LN2);

  function _bitCount(i) {
    // See "Hacker's Delight", section 5-1, "Counting 1-Bits".

    // The basic strategy is to use "divide and conquer" to
    // add pairs (then quads, etc.) of bits together to obtain
    // sub-counts.
    //
    // A straightforward approach would look like:
    //
    // i = (i & 0x55555555) + ((i >>  1) & 0x55555555);
    // i = (i & 0x33333333) + ((i >>  2) & 0x33333333);
    // i = (i & 0x0F0F0F0F) + ((i >>  4) & 0x0F0F0F0F);
    // i = (i & 0x00FF00FF) + ((i >>  8) & 0x00FF00FF);
    // i = (i & 0x0000FFFF) + ((i >> 16) & 0x0000FFFF);
    //
    // The code below removes unnecessary &'s and uses a
    // trick to remove one instruction in the first line.

    i -= (i >> 1) & 0x55555555;
    i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
    i = (i + (i >> 4)) & 0x0F0F0F0F;
    i += i >> 8;
    i += i >> 16;
    return i & 0x0000003F;
  }

  // Assumes i is <= 32-bit
  function _numberOfLeadingZeros(i) {
    i |= i >> 1;
    i |= i >> 2;
    i |= i >> 4;
    i |= i >> 8;
    i |= i >> 16;
    return _bitCount(~i);
  }

  console.log('_numberOfLeadingZeros', _numberOfLeadingZeros(0b00101010000000001010101000000000))
  console.log('_numberOfLeadingZeros', _numberOfLeadingZeros(0b00000111110000001010101000000000))
  console.log('_numberOfLeadingZeros', _numberOfLeadingZeros(0b1))

  // https://cs-fundamentals.com/tech-interview/c/c-program-to-count-number-of-ones-in-unsigned-integer

  function numberOfLeadingZeros(int i) {
    // HD, Figure 5-6
    if (i == 0)
        return 32;
    int n = 1;
    if (i >>> 16 == 0) { n += 16; i <<= 16; }
    if (i >>> 24 == 0) { n +=  8; i <<=  8; }
    if (i >>> 28 == 0) { n +=  4; i <<=  4; }
    if (i >>> 30 == 0) { n +=  2; i <<=  2; }
    n -= i >>> 31;
    return n;
}

public boolean fastGet(long index) {
  assert index >= 0 && index < numBits;
  int i = (int)(index >> 6);               // div 64
  long bitmask = 1L << index;
  return (bits[i] & bitmask) != 0;
}

public void fastSet(int index) {
  assert index >= 0 && index < numBits;
  int wordNum = index >> 6;      // div 64
  long bitmask = 1L << index;
  bits[wordNum] |= bitmask;
}
public void fastSet(long index) {
  assert index >= 0 && index < numBits;
  int wordNum = (int)(index >> 6);
  long bitmask = 1L << index;
  bits[wordNum] |= bitmask;
}

public void fastClear(int index) {
  assert index >= 0 && index < numBits;
  int wordNum = index >> 6;
  long bitmask = 1L << index;
  bits[wordNum] &= ~bitmask;
  // hmmm, it takes one more instruction to clear than it does to set... any
  // way to work around this?  If there were only 63 bits per word, we could
  // use a right shift of 10111111...111 in binary to position the 0 in the
  // correct place (using sign extension).
  // Could also use Long.rotateRight() or rotateLeft() *if* they were converted
  // by the JVM into a native instruction.
  // bits[word] &= Long.rotateLeft(0xfffffffe,bit);
}

/** clears a bit.
 * The index should be less than the OpenBitSet size.
 */
public void fastClear(long index) {
  assert index >= 0 && index < numBits;
  int wordNum = (int)(index >> 6); // div 64
  long bitmask = 1L << index;
  bits[wordNum] &= ~bitmask;
}

// https://github.com/yintaoxue/read-open-source-code/blob/master/solr-4.10.4/src/org/apache/lucene/util/OpenBitSet.java

const LEADING_ZERO_BIT_TABLE = makeLeadingZeroTable()

function makeLeadingZeroTable() {
  let i = 0
  const table = new Uint8Array(256)
  while (i < 256) {
    let count = 8
    let index = i
    while (index > 0) {
      index = (index / 2) | 0
      count--
    }
    table[i] = count
    i++
  }
  return table
}
// https://cs-fundamentals.com/tech-interview/c/c-program-to-count-number-of-ones-in-unsigned-integer


function clz1(n)
{
  let accum = 0;

  accum += LEADING_ZERO_BIT_TABLE[n >> 24];
  accum += (accum == 8 ) ? LEADING_ZERO_BIT_TABLE[(n >> 16) & 0xFF] : 0;
  accum += (accum == 16) ? LEADING_ZERO_BIT_TABLE[(n >>  8) & 0xFF] : 0;
  accum += (accum == 24) ? LEADING_ZERO_BIT_TABLE[ n        & 0xFF] : 0;

  return accum;
}


function clz2(n)
{
  let accum = LEADING_ZERO_BIT_TABLE[n >> 24];

  if (accum === 8) {
    accum += LEADING_ZERO_BIT_TABLE[(n >> 16) & 0xFF]
  }
  if (accum === 16) {
    accum += LEADING_ZERO_BIT_TABLE[(n >>  8) & 0xFF]
  }
  if (accum === 24) {
    accum += LEADING_ZERO_BIT_TABLE[ n        & 0xFF]
  }

  return accum;
}

function countLeadingZeroes32JS(n)
{
  let accum = LEADING_ZERO_BIT_TABLE[n >> 24];

  if (accum === 8) {
    accum += LEADING_ZERO_BIT_TABLE[(n >> 16) & 0xFF]
  }
  if (accum === 16) {
    accum += LEADING_ZERO_BIT_TABLE[(n >>  8) & 0xFF]
  }
  if (accum === 24) {
    accum += LEADING_ZERO_BIT_TABLE[ n        & 0xFF]
  }

  return accum;
}

function countLeadingZeroes16JS(n)
{
  let accum = LEADING_ZERO_BIT_TABLE[(n >> 16) & 0xFF]

  if (accum === 8) {
    accum += LEADING_ZERO_BIT_TABLE[(n >>  8) & 0xFF]
  }

  return accum;
}

console.log('clz1', clz1(0b00100010001000100010001000100010))
console.log('clz1', clz1(0b00000010001000100010001000100010))

console.log('clz2', clz2(0b00100010001000100010001000100010))
console.log('clz2', clz2(0b00000010001000100010001000100010))

console.log('countLeadingZeroes16JS', countLeadingZeroes16JS(0b0010001000100010))
console.log('countLeadingZeroes16JS', countLeadingZeroes16JS(0b0000001000100010))

const LEADING_ZERO_BIT_TABLE = makeLeadingZeroTable()

function makeLeadingZeroTable() {
  let i = 0
  const table = new Uint8Array(256).fill(0)
  while (i < 256) {
    let count = 8
    let index = i
    while (index > 0) {
      index = (index / 2) | 0
      count--
    }
    table[i] = count
    i++
  }
  return table
}
// https://cs-fundamentals.com/tech-interview/c/c-program-to-count-number-of-ones-in-unsigned-integer


function clz1(n)
{
  let accum = 0;

  accum += LEADING_ZERO_BIT_TABLE[n >> 24];
  accum += (accum == 8 ) ? LEADING_ZERO_BIT_TABLE[(n >> 16) & 0xFF] : 0;
  accum += (accum == 16) ? LEADING_ZERO_BIT_TABLE[(n >>  8) & 0xFF] : 0;
  accum += (accum == 24) ? LEADING_ZERO_BIT_TABLE[ n        & 0xFF] : 0;

  return accum;
}

console.log('clz1', clz1(0b00100010001000100010001000100010))
console.log('clz1', clz1(0b00000010001000100010001000100010))

function countLeadingZeroes32JS(n)
{
  let accum = LEADING_ZERO_BIT_TABLE[n >> 24];

  if (accum === 8) {
    accum += LEADING_ZERO_BIT_TABLE[(n >> 16)]
  }
  if (accum === 16) {
    accum += LEADING_ZERO_BIT_TABLE[(n >>  8)]
  }
  if (accum === 24) {
    accum += LEADING_ZERO_BIT_TABLE[ n       ]
  }

  return accum;
}

function countLeadingZeroes16JS(n)
{
  let accum = LEADING_ZERO_BIT_TABLE[n >> 8]

  if (accum === 8) {
    accum += LEADING_ZERO_BIT_TABLE[n]
  }

  return accum;
}

function countLeadingZeroes8JS(n)
{
  return LEADING_ZERO_BIT_TABLE[n]
}

console.log('countLeadingZeroes32JS', countLeadingZeroes32JS(0b10100010001000100010001000100010))
console.log('countLeadingZeroes32JS', countLeadingZeroes32JS(0b00100010001000100010001000100010))
console.log('countLeadingZeroes32JS', countLeadingZeroes32JS(0b00000010001000100010001000100010))
console.log('countLeadingZeroes16JS', countLeadingZeroes16JS(0b1010001000100010))
console.log('countLeadingZeroes16JS', countLeadingZeroes16JS(0b0010001000100010))
console.log('countLeadingZeroes16JS', countLeadingZeroes16JS(0b0000001000100010))
console.log('countLeadingZeroes16JS', countLeadingZeroes16JS(0b0000000000100010))
console.log('countLeadingZeroes8JS', countLeadingZeroes8JS(0b10100010))
console.log('countLeadingZeroes8JS', countLeadingZeroes8JS(0b00100010))
console.log('countLeadingZeroes8JS', countLeadingZeroes8JS(0b00000010))

function countLeadingOnes32JS(n) {
  return countLeadingZeroes32JS(~n)
}

function countLeadingOnes16JS(n) {
  return countLeadingZeroes32JS(~n)
}

function countLeadingOnes8JS(n) {
  return countLeadingZeroes32JS(~n)
}

// console.log('countLeadingOnes32JS', countLeadingZeroes32JS(0b00100010001000100010001000100010))
// console.log('countLeadingOnes32JS', countLeadingZeroes32JS(0b11100010001000100010001000100010))
// console.log('countLeadingOnes32JS', countLeadingZeroes32JS(0b11111100001000100010001000100010))
// console.log('countLeadingOnes16JS', countLeadingZeroes16JS(0b0100001000100010))
// console.log('countLeadingOnes16JS', countLeadingZeroes16JS(0b1100001000100010))
// console.log('countLeadingOnes16JS', countLeadingZeroes16JS(0b1111110000100010))
// console.log('countLeadingOnes16JS', countLeadingZeroes16JS(0b1111111111000010))
// console.log('countLeadingOnes8JS', countLeadingZeroes8JS(0b01000010))
// console.log('countLeadingOnes8JS', countLeadingZeroes8JS(0b11000010))
// console.log('countLeadingOnes8JS', countLeadingZeroes8JS(0b11111100))

public static int unsignedShift(int amt, int val) {
    int mask = (1 << (32 - amt)) - 1;
    return (val >> amt) & mask;
}


const LEADING_ZERO_BIT_TABLE = makeLeadingZeroTable()

function makeLeadingZeroTable() {
  let i = 0
  const table = new Uint8Array(256).fill(0)
  while (i < 256) {
    let count = 8
    let index = i
    while (index > 0) {
      index = (index / 2) | 0
      count--
    }
    table[i] = count
    i++
  }
  return table
}

function countLeadingZeroes32JS(n)
{
  let accum = LEADING_ZERO_BIT_TABLE[n >>> 24];

  if (accum === 8) {
    accum += LEADING_ZERO_BIT_TABLE[(n >>> 16)]
  }

  if (accum === 16) {
    accum += LEADING_ZERO_BIT_TABLE[(n >>>  8)]
  }

  if (accum === 24) {
    accum += LEADING_ZERO_BIT_TABLE[ n       ]
  }

  return accum;
}

function countLeadingZeroes16JS(n)
{
  let accum = LEADING_ZERO_BIT_TABLE[n >>> 8]

  if (accum === 8) {
    accum += LEADING_ZERO_BIT_TABLE[n]
  }

  return accum;
}

function countLeadingZeroes8JS(n)
{
  return LEADING_ZERO_BIT_TABLE[n]
}

console.log('countLeadingZeroes32JS', countLeadingZeroes32JS(0b10100010001000100010001000100010))
console.log('countLeadingZeroes32JS', countLeadingZeroes32JS(0b00100010001000100010001000100010))
console.log('countLeadingZeroes32JS', countLeadingZeroes32JS(0b00000010001000100010001000100010))
console.log('countLeadingZeroes16JS', countLeadingZeroes16JS(0b1010001000100010))
console.log('countLeadingZeroes16JS', countLeadingZeroes16JS(0b0010001000100010))
console.log('countLeadingZeroes16JS', countLeadingZeroes16JS(0b0000001000100010))
console.log('countLeadingZeroes16JS', countLeadingZeroes16JS(0b0000000000100010))
console.log('countLeadingZeroes8JS', countLeadingZeroes8JS(0b10100010))
console.log('countLeadingZeroes8JS', countLeadingZeroes8JS(0b00100010))
console.log('countLeadingZeroes8JS', countLeadingZeroes8JS(0b00000010))

function countLeadingOnes32JS(n) {
  return countLeadingZeroes32JS(~n >>> 0 & 0xffffffff)
}

function countLeadingOnes16JS(n) {
  return countLeadingZeroes16JS(~n >>> 0 & 0xffff)
}

function countLeadingOnes8JS(n) {
  return countLeadingZeroes8JS(~n >>> 0 & 0xff)
}

function urs32(n, amount) {
  const mask = (2 ** (32 - amount)) - 1
  return (n >> amount) & mask
}

function flip32(n) {
  const mask = (2 ** 32) - 1
  return ~n & mask
}

console.log('ones')
console.log('countLeadingOnes32JS', countLeadingOnes32JS(0b00100010001000100010001000100010))
console.log('countLeadingOnes32JS', countLeadingOnes32JS(0b11100010001000100010001000100010))
console.log('countLeadingOnes32JS', countLeadingOnes32JS(0b11111100001000100010001000100010))
console.log('countLeadingOnes16JS', countLeadingOnes16JS(0b0100001000100010))
console.log('countLeadingOnes16JS', countLeadingOnes16JS(0b1111110000100010))
console.log('countLeadingOnes16JS', countLeadingOnes16JS(0b1111111111000010))
console.log('countLeadingOnes8JS', countLeadingOnes8JS(0b01000010))
console.log('countLeadingOnes8JS', countLeadingOnes8JS(0b11000010))
console.log('countLeadingOnes8JS', countLeadingOnes8JS(0b11111100))

// int clz(uint32_t x)
// {
//     static const char debruijn32[32] = {
//         0, 31, 9, 30, 3, 8, 13, 29, 2, 5, 7, 21, 12, 24, 28, 19,
//         1, 10, 4, 14, 6, 22, 25, 20, 11, 15, 23, 26, 16, 27, 17, 18
//     };
//     x |= x>>1;
//     x |= x>>2;
//     x |= x>>4;
//     x |= x>>8;
//     x |= x>>16;
//     x++;
//     return debruijn32[x*0x076be629>>27];
// }

// https://gist.github.com/mburbea/c9a71ac1b1a25762c38c9fee7de0ddc2#file-bits-cs-L180


inline std::size_t floor_log2 (std::size_t v, integer<std::size_t, 32>)
{
   static const int MultiplyDeBruijnBitPosition[32] =
   {
      0, 9, 1, 10, 13, 21, 2, 29, 11, 14, 16, 18, 22, 25, 3, 30,
      8, 12, 20, 28, 15, 17, 24, 7, 19, 27, 23, 6, 26, 5, 4, 31
   };

   v |= v >> 1;
   v |= v >> 2;
   v |= v >> 4;
   v |= v >> 8;
   v |= v >> 16;

   return MultiplyDeBruijnBitPosition[(std::size_t)(v * 0x07C4ACDDU) >> 27];
}

inline std::size_t floor_log2 (std::size_t v, integer<std::size_t, 64>)
{
   static const std::size_t MultiplyDeBruijnBitPosition[64] = {
   63,  0, 58,  1, 59, 47, 53,  2,
   60, 39, 48, 27, 54, 33, 42,  3,
   61, 51, 37, 40, 49, 18, 28, 20,
   55, 30, 34, 11, 43, 14, 22,  4,
   62, 57, 46, 52, 38, 26, 32, 41,
   50, 36, 17, 19, 29, 10, 13, 21,
   56, 45, 25, 31, 35, 16,  9, 12,
   44, 24, 15,  8, 23,  7,  6,  5};

   v |= v >> 1;
   v |= v >> 2;
   v |= v >> 4;
   v |= v >> 8;
   v |= v >> 16;
   v |= v >> 32;
   return MultiplyDeBruijnBitPosition[((std::size_t)((v - (v >> 1))*0x07EDD5E59A4E28C2ULL)) >> 58];
}


const TABLE = [
  0, 1, 28, 2, 29, 14, 24, 3, 30, 22, 20, 15, 25, 17, 4, 8,
  31, 27, 13, 23, 21, 19, 16, 7, 26, 12, 18, 6, 11, 5, 10, 9
]

function countTrailingZeroes32(n) {
  return TABLE[((n & -n) * 0x077cb531) >>> 27];
}

function countTrailingZeroes16(n) {
  return countTrailingZeroes32(n)
}

function countTrailingZeroes8(n) {
  return countTrailingZeroes32(n)
}

function countTrailingOnes32(x) {
  return countTrailingZeroes32(~x >>> 0)
}

function countTrailingOnes16(x) {
  return countTrailingZeroes32(~x >>> 0)
}

function countTrailingOnes8(x) {
  return countTrailingZeroes32(~x >>> 0)
}

console.log('countTrailingZeroes32', countTrailingZeroes32(0b11001100110011001100110011000000))
console.log('countTrailingZeroes16', countTrailingZeroes16(0b0000001100001100))
console.log('countTrailingZeroes8', countTrailingZeroes8(0b00000010))
console.log('countTrailingOnes32', countTrailingOnes32(0b00000011000011110000110000011111))
console.log('countTrailingOnes16', countTrailingOnes16(0b0000001100001111))
console.log('countTrailingOnes8', countTrailingOnes8(0b00000011))
