import java.io.File

object io {
    fun fileRead(path: String): String = try { File(path).readText() } catch (e: Exception) { "" }
    fun fileWrite(path: String, data: String) { try { File(path).writeText(data) } catch (e: Exception) {} }
    fun fileAppend(path: String, data: String) { try { File(path).appendText(data) } catch (e: Exception) {} }
    fun fileRemove(path: String) { try { File(path).delete() } catch (e: Exception) {} }
    fun fileCopy(from: String, to: String) { try { File(from).copyTo(File(to), overwrite = true) } catch (e: Exception) {} }
    fun fileMove(from: String, to: String) { try { File(from).copyTo(File(to), overwrite = true); File(from).delete() } catch (e: Exception) {} }
    fun fileExists(path: String): Boolean = File(path).exists()
    fun fileSize(path: String): Long = try { File(path).length() } catch (e: Exception) { 0L }
    fun isDirectory(path: String): Boolean = File(path).isDirectory
    fun isFile(path: String): Boolean = File(path).isFile
    fun dirMake(path: String) { try { File(path).mkdirs() } catch (e: Exception) {} }
    fun dirRemove(path: String) { try { File(path).deleteRecursively() } catch (e: Exception) {} }
}
