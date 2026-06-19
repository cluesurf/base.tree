import Foundation

enum environment {
    static func currentDirectory() -> String { return FileManager.default.currentDirectoryPath }
}
