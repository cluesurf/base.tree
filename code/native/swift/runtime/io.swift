import Foundation

enum io {
    static func fileRead(_ path: String) -> String {
        return (try? String(contentsOfFile: path, encoding: .utf8)) ?? ""
    }
    static func fileWrite(_ path: String, _ data: String) {
        try? data.write(toFile: path, atomically: true, encoding: .utf8)
    }
    static func fileAppend(_ path: String, _ data: String) {
        let existing = (try? String(contentsOfFile: path, encoding: .utf8)) ?? ""
        try? (existing + data).write(toFile: path, atomically: true, encoding: .utf8)
    }
    static func fileRemove(_ path: String) {
        try? FileManager.default.removeItem(atPath: path)
    }
    static func fileCopy(_ from: String, _ to: String) {
        try? FileManager.default.copyItem(atPath: from, toPath: to)
    }
    static func fileMove(_ from: String, _ to: String) {
        try? FileManager.default.moveItem(atPath: from, toPath: to)
    }
    static func fileExists(_ path: String) -> Bool {
        return FileManager.default.fileExists(atPath: path)
    }
}
