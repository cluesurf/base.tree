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
