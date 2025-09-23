plugins {
    id("org.jetbrains.kotlin.jvm") version "2.2.10"
    id("io.micronaut.application") version "4.5.4"
    id("io.micronaut.aot") version "4.5.4"
    id("org.jetbrains.kotlin.plugin.jpa") version "2.2.10"
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

    implementation(platform("io.micronaut.platform:micronaut-platform:4.9.3"))
    implementation(platform("io.micronaut.micrometer:micronaut-micrometer-bom:5.12.0"))
    implementation(platform("io.micronaut.tracing:micronaut-tracing-bom:7.1.4"))
    implementation("io.micronaut.kotlin:micronaut-kotlin-runtime")
    implementation("io.micronaut:micronaut-runtime")
    implementation("io.micronaut:micronaut-http-server-netty")
    implementation("io.micronaut:micronaut-jackson-databind")

    implementation("com.graphql-java:graphql-java:21.0")

    implementation("io.micronaut.security:micronaut-security-jwt")
    implementation("io.micronaut.security:micronaut-security-oauth2")

    implementation("io.micronaut.sql:micronaut-hibernate-jpa:5.5.0")
    implementation("io.micronaut.data:micronaut-data-hibernate-jpa:4.5.4")
    implementation("org.hibernate.orm:hibernate-core:6.5.2.Final")
    implementation("io.micronaut.flyway:micronaut-flyway")

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

    testImplementation("org.junit.jupiter:junit-jupiter:5.10.3")
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
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

tasks.test { useJUnitPlatform() }