// Base libraries the Seed stdlib's kotlin/JVM target wraps. java.security (MessageDigest, Mac), kotlin.text.Regex,
// java.net.http.HttpClient, and java.io.File are JDK builtins, so no external dependencies are required for the base
// runtime. (ktor / kotlinx.serialization would be added here only for the richer server / typed-json paths.)
plugins { kotlin("jvm") version "2.0.0" }
repositories { mavenCentral() }
dependencies { }
kotlin { jvmToolchain(17) }
