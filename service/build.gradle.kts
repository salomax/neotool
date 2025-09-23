
plugins {
    id("org.jetbrains.kotlin.jvm") version "2.2.10" apply false
    id("io.micronaut.application") version "4.5.4" apply false
    id("io.micronaut.aot") version "4.5.4" apply false
    id("io.micronaut.library") version "4.5.4" apply false
}

allprojects {
    group = "io.github.salomax.neotool"

    repositories { 
        mavenCentral() 
    }
    
    // Configure Kotlin compilation
    tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
        compilerOptions {
            jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17)
        }
    }
    
    // Configure Java compilation
    tasks.withType<JavaCompile> {
        sourceCompatibility = "17"
        targetCompatibility = "17"
    }
    
    // Configure test tasks
    tasks.withType<Test> {
        useJUnitPlatform()
        testLogging {
            events("passed", "skipped", "failed")
        }
    }
}

// Configure subprojects
subprojects {

  apply(plugin = "org.jetbrains.kotlin.jvm")

  dependencies {
    add("implementation", platform("io.micronaut.platform:micronaut-platform:4.9.3"))
    add("implementation", platform("org.jetbrains.kotlin:kotlin-bom:2.2.10"))
    add("testImplementation", "org.junit.jupiter:junit-jupiter:5.10.3")
  }
}
