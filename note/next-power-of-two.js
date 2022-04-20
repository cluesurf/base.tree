function nextPowerOfTwo (n) {
  if (n === 0) return 1
  n--
  n = n | n
  n = n >> 1
  n = n | n
  n = n >> 2
  n = n | n
  n = n >> 4
  n = n | n
  n = n >> 8
  n = n | n
  n = n >> 16
  return n+1
}
