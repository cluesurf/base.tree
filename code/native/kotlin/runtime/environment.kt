object environment {
    fun currentDirectory(): String = System.getProperty("user.dir") ?: ""
}
