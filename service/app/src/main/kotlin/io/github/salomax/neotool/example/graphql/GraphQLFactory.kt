package io.github.salomax.neotool.example.graphql

import graphql.analysis.MaxQueryComplexityInstrumentation
import graphql.analysis.MaxQueryDepthInstrumentation
import graphql.schema.idl.SchemaGenerator
import graphql.schema.idl.TypeDefinitionRegistry
import io.github.salomax.neotool.framework.graphql.GraphQLWiringFactory
import io.micronaut.context.annotation.Factory
import jakarta.inject.Singleton

@Factory
class GraphQLFactory(
  private val registry: TypeDefinitionRegistry,
  private val wiringFactory: GraphQLWiringFactory
) {
  @Singleton
  fun graphQL(): graphql.GraphQL {
    val schema = SchemaGenerator().makeExecutableSchema(registry, wiringFactory.build())
    return graphql.GraphQL.newGraphQL(schema)
      .instrumentation(MaxQueryComplexityInstrumentation(100))
      .instrumentation(MaxQueryDepthInstrumentation(10))
      .build()
  }
}
