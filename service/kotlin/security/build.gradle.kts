
plugins {
    id("org.jetbrains.kotlin.jvm")
    id("io.micronaut.library")
    id("org.jetbrains.kotlin.plugin.jpa")
    id("com.google.devtools.ksp")
}

micronaut {
    version("4.9.3")
    processing {
        incremental(true)
        annotations("io.github.salomax.neotool.security.*")
    }
}

dependencies {
    // Project dependencies
    implementation(project(":common"))

    // Security-specific dependencies
    implementation("jakarta.annotation:jakarta.annotation-api")
    implementation("jakarta.persistence:jakarta.persistence-api:3.1.0")

    // KSP processors
    ksp("io.micronaut:micronaut-inject-kotlin")
    kspTest("io.micronaut:micronaut-inject-kotlin")

    // Security dependencies (commented out for now)
    // api("io.micronaut.security:micronaut-security-jwt")
    // api("io.micronaut.security:micronaut-security-oauth2")
}
