package io.github.salomax.neotool.framework.graphql

import graphql.GraphQL
import graphql.schema.idl.SchemaGenerator
import graphql.schema.idl.SchemaParser
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import java.io.InputStreamReader
import io.github.salomax.neotool.example.domain.Product
import io.github.salomax.neotool.example.domain.Customer
import io.github.salomax.neotool.example.graphql.dto.ProductInputDTO
import io.github.salomax.neotool.example.graphql.dto.CustomerInputDTO
import io.github.salomax.neotool.example.graphql.GraphQLWiring
import io.github.salomax.neotool.example.graphql.ProductFns
import io.github.salomax.neotool.example.graphql.CustomerFns

class GraphQLValidationTest {

    private fun buildGraphQLWithValidators(): GraphQL {
        val products = mutableListOf<Product>()
        var nextPid = 1L

        val productFns = ProductFns(
            list = { products.toList() },
            get = { id -> products.find { it.id == id } },
            create = { p -> val created = p.copy(id = nextPid++); products += created; created },
            update = { id, p ->
                val idx = products.indexOfFirst { it.id == id }
                if (idx < 0) null else { val updated = p.copy(id = id); products[idx] = updated; updated }
            },
            delete = { id -> products.removeIf { it.id == id } }
        )

        // Strict validators simulating Bean Validation rules
        val validateProduct: (ProductInputDTO) -> Unit = { dto ->
            require(dto.name.isNotBlank()) { "name must not be blank" }
            require(dto.sku.isNotBlank()) { "sku must not be blank" }
            require(dto.priceCents >= 0) { "priceCents must be >= 0" }
            require(dto.stock >= 0) { "stock must be >= 0" }
        }
        val validateCustomer: (CustomerInputDTO) -> Unit = { _ -> } // not used here

        val sdlStream = this::class.java.classLoader.getResourceAsStream("graphql/schema.graphqls")
            ?: error("graphql/schema.graphqls not found for tests")
        val typeRegistry = sdlStream.use { SchemaParser().parse(InputStreamReader(it)) }

        val wiring = GraphQLWiring.build(productFns, CustomerFns(
            list = { emptyList() },
            get = { _ -> null },
            create = { it -> it },
            update = { _, it -> it },
            delete = { _ -> true }
        ), validateProduct, validateCustomer)

        val schema = SchemaGenerator().makeExecutableSchema(typeRegistry, wiring)
        return GraphQL.newGraphQL(schema).build()
    }

    @Test
    fun `should update product successfully`() {
        val g = buildGraphQLWithValidators()

        val create = """
        mutation {
          p1: createProduct(input: { name:"KB", sku:"SKU-KB", priceCents:39900, stock:5 }) { id name }
        }
        """.trimIndent()
        val r1 = g.execute(create)
        assertTrue(r1.errors.isEmpty())
        val id = ((r1.getData<Map<String, Any?>>()["p1"] as Map<*, *>)["id"] as String)

        val update = """
        mutation {
          updateProduct(id:"%s", input:{ name:"Keyboard Pro", sku:"SKU-KB", priceCents:42900, stock:7 }) { id name priceCents stock }
        }
        """.trimIndent().format(id)
        val r2 = g.execute(update)
        assertTrue(r2.errors.isEmpty())
        val upd = (r2.getData<Map<String, Any?>>()["updateProduct"] as Map<*, *>)
        assertEquals("Keyboard Pro", upd["name"])
        assertEquals(42900, (upd["priceCents"] as Int))
        assertEquals(7, (upd["stock"] as Int))
    }

    @Test
    fun `should fail on negative priceCents`() {
        val g = buildGraphQLWithValidators()

        val bad = """
        mutation {
          createProduct(input: { name:"X", sku:"SKU-X", priceCents:-1, stock:1 }) { id name }
        }
        """.trimIndent()
        val r = g.execute(bad)
        assertTrue(r.errors.isNotEmpty(), "Expected validation error")
        // Data should be null for the failing field
        val data = r.getData<Map<String, Any?>>()
        // Depending on GraphQLJava behavior, field may be absent or null; we accept either
        assertTrue(data == null || data.isEmpty() || data["createProduct"] == null)
    }
}
