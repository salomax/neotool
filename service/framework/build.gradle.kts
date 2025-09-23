plugins {
    id("org.jetbrains.kotlin.jvm")
    id("io.micronaut.library")
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
    implementation("com.graphql-java:graphql-java:21.0")
}
