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
  implementation(platform("io.micronaut.platform:micronaut-platform"))
  implementation(kotlin("reflect"))

  api("io.micronaut.test:micronaut-test-junit5")
  api("org.junit.jupiter:junit-jupiter")
  api("org.assertj:assertj-core")
  api("org.testcontainers:junit-jupiter")
  api("org.testcontainers:postgresql")
  api("jakarta.inject:jakarta.inject-api")

  implementation("io.micronaut:micronaut-http-client")
  implementation("io.micronaut.serde:micronaut-serde-jackson")
  implementation("io.micronaut:micronaut-inject")

  implementation("io.micronaut:micronaut-http-client:4.8.1")

  ksp("io.micronaut:micronaut-inject-kotlin")
  ksp("io.micronaut.serde:micronaut-serde-processor")
  ksp("io.micronaut.data:micronaut-data-processor")
  kspTest("io.micronaut:micronaut-inject-kotlin")
}

tasks.test { useJUnitPlatform() }
