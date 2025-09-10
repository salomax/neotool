
plugins {
    id("org.jetbrains.kotlin.jvm") version "2.2.10" apply false
    id("io.micronaut.application") version "4.5.4" apply false
    id("io.micronaut.aot") version "4.5.4" apply false
    id("io.micronaut.library") version "4.5.4" apply false
    id("com.gradleup.shadow") version "8.3.6"  apply false
}

allprojects {
    repositories { mavenCentral() }
}
