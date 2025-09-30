rootProject.name = "neotool-service"
include(":app", ":framework", ":security", ":test")

pluginManagement {
  repositories {
    gradlePluginPortal();
    mavenCentral();
    google()
  }
}

dependencyResolutionManagement {
  repositories {
    mavenCentral();
    google()
  }
}

include("test")
