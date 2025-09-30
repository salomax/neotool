
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
    implementation(platform("io.micronaut.platform:micronaut-platform"))
    implementation("io.micronaut.kotlin:micronaut-kotlin-runtime")
    implementation("jakarta.annotation:jakarta.annotation-api")
    implementation("jakarta.persistence:jakarta.persistence-api:3.1.0")

    ksp("io.micronaut:micronaut-inject-kotlin")
    kspTest("io.micronaut:micronaut-inject-kotlin")

    implementation("org.hibernate.orm:hibernate-core:6.5.2.Final")
    implementation("io.micronaut.sql:micronaut-hibernate-jpa:5.5.0")

    implementation("org.flywaydb:flyway-core:10.15.2")

    runtimeOnly("org.postgresql:postgresql:42.7.4")

    api("io.micronaut.security:micronaut-security-jwt")
}
