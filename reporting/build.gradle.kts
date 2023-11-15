plugins {
    java
    id("io.quarkus")
    id("org.sonarqube") version "3.4.0.2513"
    id("io.freefair.lombok") version "6.5.0.3"
    id("org.kordamp.gradle.jandex") version "0.11.0"
}

sonarqube {
    properties {
        property("sonar.projectKey", "wucheplaner_reporting")
        property("sonar.projectName", "wucheplaner_reporting")
        property("sonar.organization", "andrinmeier")
        property("sonar.host.url", "https://sonarcloud.io")
    }
}

repositories {
    mavenCentral()
    mavenLocal()
}

val quarkusPlatformGroupId: String by project
val quarkusPlatformArtifactId: String by project
val quarkusPlatformVersion: String by project

dependencies {
    implementation("io.quarkus:quarkus-config-yaml")
    implementation(enforcedPlatform("${quarkusPlatformGroupId}:${quarkusPlatformArtifactId}:${quarkusPlatformVersion}"))
    implementation("io.quarkus:quarkus-resteasy-reactive")
    implementation("io.quarkus:quarkus-resteasy-reactive-jackson")
    implementation("io.quarkus:quarkus-grpc")
    implementation("io.quarkus:quarkus-arc")
    implementation("org.apache.poi:poi-ooxml:5.2.2")
    testImplementation("io.quarkus:quarkus-jacoco")
    testImplementation("io.quarkus:quarkus-junit5")
    testImplementation("io.rest-assured:rest-assured")
    testImplementation("org.assertj:assertj-core:3.11.1")
}

group = "ch.pricemeier.wucheplaner"
version = "1.0.0-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

tasks.withType<JavaCompile> {
    options.encoding = "UTF-8"
    options.compilerArgs.add("-parameters")
}
