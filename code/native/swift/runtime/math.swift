import Foundation

enum math {
    static func abs(_ v: Int) -> Int { return Swift.abs(v) }
    static func min(_ a: Int, _ b: Int) -> Int { return Swift.min(a, b) }
    static func max(_ a: Int, _ b: Int) -> Int { return Swift.max(a, b) }
    static func pow(_ base: Int, _ exponent: Int) -> Int { return Int(Foundation.pow(Double(base), Double(exponent))) }
    static func sign(_ v: Int) -> Int { return v > 0 ? 1 : (v < 0 ? -1 : 0) }
    static func sqrt(_ v: Int) -> Int { return Int(Double(v).squareRoot()) }
    static func floor(_ v: Int) -> Int { return v }
    static func ceil(_ v: Int) -> Int { return v }
    static func round(_ v: Int) -> Int { return v }
}
