object math {
    fun abs(v: Long): Long = kotlin.math.abs(v)
    fun min(a: Long, b: Long): Long = minOf(a, b)
    fun max(a: Long, b: Long): Long = maxOf(a, b)
    fun pow(base: Long, exponent: Long): Long = Math.pow(base.toDouble(), exponent.toDouble()).toLong()
    fun sign(v: Long): Long = v.compareTo(0L).toLong()
    fun sqrt(v: Long): Long = Math.sqrt(v.toDouble()).toLong()
    fun floor(v: Long): Long = v
    fun ceil(v: Long): Long = v
    fun round(v: Long): Long = v
}
