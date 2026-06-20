import java.security.MessageDigest
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec

object crypto {
    private fun hex(bytes: ByteArray): String = bytes.joinToString("") { "%02x".format(it) }
    private fun digest(algorithm: String, input: String): String = hex(MessageDigest.getInstance(algorithm).digest(input.toByteArray(Charsets.UTF_8)))
    fun sha256(input: String): String = digest("SHA-256", input)
    fun sha512(input: String): String = digest("SHA-512", input)
    fun md5(input: String): String = digest("MD5", input)
    private fun mac(algorithm: String, key: String, data: String): String {
        val instance = Mac.getInstance(algorithm)
        instance.init(SecretKeySpec(key.toByteArray(Charsets.UTF_8), algorithm))
        return hex(instance.doFinal(data.toByteArray(Charsets.UTF_8)))
    }
    fun hmacSha256(key: String, data: String): String = mac("HmacSHA256", key, data)
    fun hmacSha512(key: String, data: String): String = mac("HmacSHA512", key, data)
    fun randomBytes(size: Long): String {
        val bytes = ByteArray(size.toInt())
        java.security.SecureRandom().nextBytes(bytes)
        return hex(bytes)
    }
}
