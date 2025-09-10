
package com.neotool.graphql

import graphql.GraphQL
import graphql.schema.idl.SchemaParser
import graphql.schema.idl.RuntimeWiring
import graphql.schema.idl.TypeDefinitionRegistry
import graphql.schema.idl.SchemaGenerator
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.*
import jakarta.inject.Singleton
import java.io.InputStreamReader
import java.util.*

data class GraphQLRequest(val query: String, val variables: Map<String, Any?>? = null)

@Singleton
class GraphQLProvider {
    val graphQL: GraphQL

    init {
        val schemaStream = this::class.java.classLoader.getResourceAsStream("graphql/schema.graphqls")
            ?: error("graphql/schema.graphqls not found")
        val typeRegistry: TypeDefinitionRegistry = SchemaParser().parse(InputStreamReader(schemaStream))
        val wiring = RuntimeWiring.newRuntimeWiring()
            .type("Query") { typeWiring ->
                typeWiring.dataFetcher("hello") { "Hello from Micronaut GraphQL!" }
                typeWiring.dataFetcher("currentUser") {
                    mapOf("id" to UUID.randomUUID().toString(), "email" to "demo@neotool.com", "displayName" to "Demo User")
                }
            }
            .build()
        val schema = SchemaGenerator().makeExecutableSchema(typeRegistry, wiring)
        graphQL = GraphQL.newGraphQL(schema).build()
    }
}

@Controller("/graphql")
class GraphQLController(private val provider: GraphQLProvider) {

    @Post(consumes = [MediaType.APPLICATION_JSON], produces = [MediaType.APPLICATION_JSON])
    fun post(@Body request: GraphQLRequest): Map<String, Any?> {
        val execution = provider.graphQL.execute(request.query)
        return mapOf(
            "data" to execution.getData<Any>(),
            "errors" to (execution.errors.takeIf { it.isNotEmpty() })
        )
    }
}
