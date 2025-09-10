
plugins {
    id("org.jetbrains.kotlin.jvm") version "2.2.10"
    id("io.micronaut.application") version "4.5.4"
    id("io.micronaut.aot") version "4.5.4"
    id("org.jetbrains.kotlin.plugin.jpa") version "2.2.10"
    id("com.gradleup.shadow") version "8.3.6" 
}

micronaut {
    version("4.9.3")
    runtime("netty")
    testRuntime("junit5")
    processing {
        incremental(true)
        annotations("com.neotool.*")
    }
}

repositories { mavenCentral() }

dependencies {
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
    implementation("org.hibernate.orm:hibernate-core:6.5.2.Final")
    implementation("io.micronaut.flyway:micronaut-flyway")

    runtimeOnly("org.postgresql:postgresql:42.7.4")
    runtimeOnly("org.yaml:snakeyaml")

    implementation("io.micronaut.redis:micronaut-redis-lettuce")
    implementation("io.micronaut.kafka:micronaut-kafka")

    implementation("io.micronaut.micrometer:micronaut-micrometer-observation")
    implementation("io.micronaut.micrometer:micronaut-micrometer-core")
        
    implementation("io.micronaut.validation:micronaut-validation")

    testImplementation("org.junit.jupiter:junit-jupiter:5.10.3")
}

application {
    mainClass.set("com.neotool.Application")
}

// Ensure the security module is built before the app module
tasks.jar {
    dependsOn(":security:jar")
}

java {
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}

tasks.test { useJUnitPlatform() }
