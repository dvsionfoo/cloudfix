import com.moowork.gradle.node.npm.NpmTask

plugins {
    id("com.github.node-gradle.node")
}

node {
    version = "15.5.1"
    download = true
}

tasks {
    val buildReact = register<NpmTask>("buildReact") {
        (args as MutableList<String>).addAll(listOf("run", "build"))
        dependsOn(npmInstall)
    }
    register<NpmTask>("runReact") {
        (args as MutableList<String>).addAll(listOf("run", "start"))
        dependsOn(buildReact)
    }
    register<Delete>("clean") {
        delete(buildDir,
                projectDir.resolve(".gradle"),
                projectDir.resolve("node_modules"))
    }
}
