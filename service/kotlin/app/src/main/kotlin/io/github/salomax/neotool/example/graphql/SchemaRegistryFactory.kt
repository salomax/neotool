package io.github.salomax.neotool.example.graphql

import graphql.schema.idl.SchemaParser
import graphql.schema.idl.TypeDefinitionRegistry
import io.micronaut.context.annotation.Factory
import jakarta.inject.Singleton
import java.io.InputStreamReader

@Factory
class SchemaRegistryFactory {

  @Singleton
  fun typeRegistry(): TypeDefinitionRegistry =
    javaClass.classLoader.getResourceAsStream("graphql/schema.graphqls")
      ?.use { SchemaParser().parse(InputStreamReader(it)) }
      ?: error("graphql/schema.graphqls not found")
}
