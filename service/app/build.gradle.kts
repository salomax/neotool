import java.time.Duration

plugins {
    id("org.jetbrains.kotlin.jvm")
    id("io.micronaut.application")
    id("io.micronaut.aot")
    id("org.jetbrains.kotlin.plugin.jpa")
    id("com.google.devtools.ksp")
}

micronaut {
    version("4.9.3")
    runtime("netty")
    testRuntime("junit5")
    processing {
        incremental(true)
        annotations("io.github.salomax.neotool.*")
    }
}

repositories { mavenCentral() }

dependencies {
    
    implementation(project(":framework"))
    implementation(project(":security"))
    testImplementation(project(":test"))

    implementation(platform("io.micronaut.platform:micronaut-platform:4.9.3"))
    implementation(platform("io.micronaut.micrometer:micronaut-micrometer-bom:5.12.0"))
    implementation(platform("io.micronaut.tracing:micronaut-tracing-bom:7.1.4"))
    implementation("io.micronaut.kotlin:micronaut-kotlin-runtime")
    implementation("io.micronaut:micronaut-runtime")
    implementation("io.micronaut:micronaut-http-server-netty")
    implementation("io.micronaut:micronaut-jackson-databind")

    ksp("io.micronaut:micronaut-inject-kotlin")
    kspTest("io.micronaut:micronaut-inject-kotlin")

    // Fix vulnerability:
    // https://www.mend.io/vulnerability-database/CVE-2025-48924?utm_source=JetBrains
    implementation("org.apache.commons:commons-lang3:3.18.0")

    // Min version 21.5
    // In order to fix vulnerability
    // https://www.mend.io/vulnerability-database/CVE-2024-40094?utm_source=JetBrains
    implementation("com.graphql-java:graphql-java:21.5")

    implementation("io.micronaut.security:micronaut-security-jwt")
    implementation("io.micronaut.security:micronaut-security-oauth2")

    implementation("io.micronaut.sql:micronaut-hibernate-jpa:5.5.0")
    implementation("io.micronaut.data:micronaut-data-hibernate-jpa:4.5.4")
    implementation("org.hibernate.orm:hibernate-core:6.5.2.Final")
    implementation("io.micronaut.flyway:micronaut-flyway")
    implementation("org.flywaydb:flyway-database-postgresql")
    implementation("io.micronaut.data:micronaut-data-tx-hibernate")
    implementation("io.micronaut.sql:micronaut-jdbc-hikari")

    runtimeOnly("org.postgresql:postgresql:42.7.4")
    runtimeOnly("org.yaml:snakeyaml")

    implementation("io.micronaut.redis:micronaut-redis-lettuce")
    implementation("io.micronaut.kafka:micronaut-kafka")

    implementation("io.micronaut.micrometer:micronaut-micrometer-observation")
    implementation("io.micronaut.micrometer:micronaut-micrometer-core")
        
    implementation("io.micronaut.validation:micronaut-validation")
    
    // Ensure Kotlin runtime is included
    implementation("org.jetbrains.kotlin:kotlin-stdlib")
    implementation("org.jetbrains.kotlin:kotlin-reflect")

    testImplementation("org.junit.jupiter:junit-jupiter:5.13.4")
    
    // Integration testing dependencies
    testImplementation("io.micronaut.test:micronaut-test-junit5:4.8.1")
    testImplementation("org.testcontainers:junit-jupiter:1.21.3")
    testImplementation("org.mockito.kotlin:mockito-kotlin:3.2.0")
    testImplementation("org.testcontainers:postgresql:1.21.3")
    testImplementation("org.testcontainers:testcontainers:1.21.3")
    
    // HTTP client for testing
    testImplementation("io.micronaut:micronaut-http-client:4.8.1")
    testImplementation("io.micronaut.serde:micronaut-serde-jackson")
    ksp("io.micronaut.serde:micronaut-serde-processor")

    // Test utilities
    testImplementation("org.assertj:assertj-core:3.25.3")
    testImplementation("com.fasterxml.jackson.module:jackson-module-kotlin")

}

application {
    mainClass.set("io.github.salomax.neotool.example.Application")
}

// Configure JAR task for executable JAR creation
tasks.jar {
    dependsOn(":security:jar")
    manifest {
        attributes(
            "Main-Class" to "io.github.salomax.neotool.example.Application"
        )
    }
}

// Registers a new Gradle task named "shadowJar" that produces a single JAR containing
// your compiled classes PLUS all runtime dependencies ("uber"/"fat" JAR).
tasks.register<Jar>("shadowJar") {

    // Ensures these tasks run before this one:
    // - Runs the default "jar" task for the current project (so classes/resources exist)
    dependsOn(":framework:jar", ":security:jar", "jar")

    // Groups this task under the "build" category in Gradle task listings
    group = "build"

    // Short description shown in "gradle tasks"
    description = "Creates a fat JAR with all dependencies"

    // Suffix appended to the artifact file name
    archiveClassifier.set("all")

    // Adds all runtime dependencies to the JAR content.
    // For directories, include them directly; for .jar files, "explode" them with zipTree
    // so their classes/resources are merged into this fat JAR.
    from(configurations.runtimeClasspath.get().map { if (it.isDirectory) it else zipTree(it) })

    // Adds the compiled classes and resources from the main source set into the JAR.
    from(sourceSets.main.get().output)

    // Writes the JAR manifest. "Main-Class" tells the JVM which class contains
    // the entry point (i.e., a Kotlin `fun main()` or Java `public static void main`).
    manifest {
        attributes(
            "Main-Class" to "io.github.salomax.neotool.example.Application"
        )
    }

    // When two files with the same path are found while merging dependencies,
    // exclude duplicates to avoid build failures (e.g., META-INF files).
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
}


java {
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}

tasks.test { 
    useJUnitPlatform()
    
    // Integration test configuration
    testLogging {
        events("passed", "skipped", "failed")
        showStandardStreams = true
        showCauses = true
        showExceptions = true
        showStackTraces = true
    }
    
    // Ensure tests have enough time to complete
    timeout = Duration.ofMinutes(10)
    
    // Run tests in parallel for better performance
    maxParallelForks = Runtime.getRuntime().availableProcessors().div(2).coerceAtLeast(1)
}

// Task to run only integration tests
tasks.register<Test>("integrationTest") {
    group = "verification"
    description = "Runs integration tests using Testcontainers"
    
    useJUnitPlatform {
        includeEngines("junit-jupiter")
        includeTags("integration")
    }
    
    testLogging {
        events("passed", "skipped", "failed")
        showStandardStreams = true
    }
    
    // Ensure Docker is available
    doFirst {
        try {
            val process = ProcessBuilder("docker", "version").start()
            val exitCode = process.waitFor()
            if (exitCode != 0) {
                throw GradleException("Docker is required for integration tests but not available")
            }
        } catch (e: Exception) {
            throw GradleException("Docker is required for integration tests but not available: ${e.message}")
        }
    }
}

// Task to run integration tests
tasks.register<Test>("testIntegration") {
    group = "verification"
    description = "Runs integration tests using Testcontainers"
    
    useJUnitPlatform {
        includeEngines("junit-jupiter")
        includeTags("integration")
    }
    
    testLogging {
        events("passed", "skipped", "failed")
        showStandardStreams = true
    }
    
    // Ensure Docker is available
    doFirst {
        try {
            val process = ProcessBuilder("docker", "version").start()
            val exitCode = process.waitFor()
            if (exitCode != 0) {
                throw GradleException("Docker is required for integration tests but not available")
            }
        } catch (e: Exception) {
            throw GradleException("Docker is required for integration tests but not available: ${e.message}")
        }
    }
}
