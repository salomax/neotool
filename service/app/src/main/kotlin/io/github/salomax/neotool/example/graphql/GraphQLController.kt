package io.github.salomax.neotool.example.graphql

import graphql.GraphQL
import graphql.schema.idl.SchemaGenerator
import graphql.schema.idl.SchemaParser
import graphql.schema.idl.TypeDefinitionRegistry
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.*
import jakarta.inject.Singleton
import io.github.salomax.neotool.framework.graphql.InputValidator
import java.io.InputStreamReader
import io.github.salomax.neotool.example.service.ProductService
import io.github.salomax.neotool.example.service.CustomerService
import io.github.salomax.neotool.example.graphql.dto.ProductInputDTO
import io.github.salomax.neotool.example.graphql.dto.CustomerInputDTO
import io.github.salomax.neotool.example.graphql.GraphQLWiring
import io.github.salomax.neotool.example.graphql.ProductFns
import io.github.salomax.neotool.example.graphql.CustomerFns

data class GraphQLRequest(val query: String, val variables: Map<String, Any?>? = null)

/**
 * Builds executable schema from 'graphql/schema.graphqls' and wires resolvers with validation.
 */
@Singleton
class GraphQLProvider(
    productService: ProductService,
    customerService: CustomerService,
    private val validator: InputValidator
) {
    val graphQL: GraphQL = build(productService, customerService)

    private fun build(productService: ProductService, customerService: CustomerService): GraphQL {
        val sdlStream = this::class.java.classLoader.getResourceAsStream("graphql/schema.graphqls")
            ?: error("graphql/schema.graphqls not found on classpath")
        val typeRegistry: TypeDefinitionRegistry = sdlStream.use { SchemaParser().parse(InputStreamReader(it)) }

        val wiring = GraphQLWiring.build(
            productFns = ProductFns(
                list = { productService.list() },
                get = { id -> productService.get(id) },
                create = { p -> productService.create(p) },
                update = { id, p -> productService.update(id, p) },
                delete = { id -> productService.delete(id) }
            ),
            customerFns = CustomerFns(
                list = { customerService.list() },
                get = { id -> customerService.get(id) },
                create = { c -> customerService.create(c) },
                update = { id, c -> customerService.update(id, c) },
                delete = { id -> customerService.delete(id) }
            ),
            validateProduct = { dto: ProductInputDTO -> validator.validate(dto) },
            validateCustomer = { dto: CustomerInputDTO -> validator.validate(dto) }
        )

        val schema = SchemaGenerator().makeExecutableSchema(typeRegistry, wiring)
        return GraphQL.newGraphQL(schema).build()
    }
}

/** Minimal HTTP endpoint: POST /graphql { "query": "..." } */
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
