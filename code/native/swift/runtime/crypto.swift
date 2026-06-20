import Foundation
import CryptoKit

enum crypto {
    private static func hex<D: Sequence>(_ bytes: D) -> String where D.Element == UInt8 {
        return bytes.map { String(format: "%02x", $0) }.joined()
    }
    static func sha256(_ input: String) -> String { return hex(SHA256.hash(data: Data(input.utf8))) }
    static func sha512(_ input: String) -> String { return hex(SHA512.hash(data: Data(input.utf8))) }
    static func md5(_ input: String) -> String { return hex(Insecure.MD5.hash(data: Data(input.utf8))) }
    static func hmacSha256(_ key: String, _ data: String) -> String {
        let mac = HMAC<SHA256>.authenticationCode(for: Data(data.utf8), using: SymmetricKey(data: Data(key.utf8)))
        return hex(mac)
    }
    static func hmacSha512(_ key: String, _ data: String) -> String {
        let mac = HMAC<SHA512>.authenticationCode(for: Data(data.utf8), using: SymmetricKey(data: Data(key.utf8)))
        return hex(mac)
    }
    static func randomBytes(_ size: Int) -> String {
        var generator = SystemRandomNumberGenerator()
        var bytes = [UInt8]()
        for _ in 0..<size { bytes.append(UInt8.random(in: UInt8.min...UInt8.max, using: &generator)) }
        return hex(bytes)
    }
}
