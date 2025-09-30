plugins {
    id("org.jetbrains.kotlin.jvm")
    id("io.micronaut.library")
    id("com.google.devtools.ksp")
}

repositories { mavenCentral() }

micronaut {
    version("4.9.3")
    processing {
        incremental(true)
        annotations("io.github.salomax.neotool.framework.*")
    }
}

dependencies {
    api(platform("io.micronaut.platform:micronaut-platform:4.9.3"))
    api("io.micronaut:micronaut-inject")
    implementation("io.micronaut.validation:micronaut-validation")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("com.graphql-java:graphql-java:21.5")
    implementation("org.postgresql:postgresql:42.7.4")
    implementation("io.micronaut:micronaut-http")
    implementation("io.micronaut.data:micronaut-data-processor")
    implementation("io.micronaut.serde:micronaut-serde-jackson")
    implementation("io.micronaut:micronaut-http-server-netty")
    implementation("io.micronaut.data:micronaut-data-jdbc")
    implementation("org.hibernate.orm:hibernate-core:6.5.2.Final")
    implementation("io.micronaut.data:micronaut-data-hibernate-jpa")

    ksp("io.micronaut:micronaut-inject-kotlin")
    ksp("io.micronaut.serde:micronaut-serde-processor")

    kspTest("io.micronaut:micronaut-inject-kotlin")
}
