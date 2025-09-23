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

class GraphQLExamplesTest {

    private fun buildGraphQLWithFakes(): GraphQL {
        val products = mutableListOf<Product>()
        val customers = mutableListOf<Customer>()
        var nextPid = 1L
        var nextCid = 1L

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

        val customerFns = CustomerFns(
            list = { customers.toList() },
            get = { id -> customers.find { it.id == id } },
            create = { c -> val created = c.copy(id = nextCid++); customers += created; created },
            update = { id, c ->
                val idx = customers.indexOfFirst { it.id == id }
                if (idx < 0) null else { val updated = c.copy(id = id); customers[idx] = updated; updated }
            },
            delete = { id -> customers.removeIf { it.id == id } }
        )

        // No-op validators for this test
        val validateProduct: (ProductInputDTO) -> Unit = { _ -> }
        val validateCustomer: (CustomerInputDTO) -> Unit = { _ -> }

        val sdlStream = this::class.java.classLoader.getResourceAsStream("graphql/schema.graphqls")
            ?: error("graphql/schema.graphqls not found for tests")
        val typeRegistry = sdlStream.use { SchemaParser().parse(InputStreamReader(it)) }

        val wiring = GraphQLWiring.build(productFns, customerFns, validateProduct, validateCustomer)
        val schema = SchemaGenerator().makeExecutableSchema(typeRegistry, wiring)
        return GraphQL.newGraphQL(schema).build()
    }

    @Test
    fun `should create and fetch products via GraphQL`() {
        val graphQL = buildGraphQLWithFakes()

        val create = """
        mutation {
          p1: createProduct(input: { name:"USB-C", sku:"SKU-USB", priceCents:4900, stock:10 }) { id name sku priceCents stock }
          p2: createProduct(input: { name:"Mouse",  sku:"SKU-MOUSE", priceCents:15900, stock:5 }) { id name }
        }
        """.trimIndent()

        val exec1 = graphQL.execute(create)
        assertTrue(exec1.errors.isEmpty(), "No execution errors")
        val data1 = exec1.getData<Map<String, Any?>>()
        val p1 = (data1["p1"] as Map<*, *>)
        assertEquals("USB-C", p1["name"])

        val query = "{ products { id name sku priceCents stock } }"
        val exec2 = graphQL.execute(query)
        assertTrue(exec2.errors.isEmpty())
        val data2 = exec2.getData<Map<String, Any?>>()
        val list = data2["products"] as List<*>
        assertEquals(2, list.size)
    }

    @Test
    fun `should update and delete a customer via GraphQL`() {
        val graphQL = buildGraphQLWithFakes()

        val create = """
        mutation {
          c1: createCustomer(input: { name:"Alice", email:"alice@example.com", status:"ACTIVE" }) { id name }
        }
        """.trimIndent()
        val r1 = graphQL.execute(create)
        assertTrue(r1.errors.isEmpty())
        val id = ((r1.getData<Map<String, Any?>>()["c1"] as Map<*, *>)["id"] as String)

        val update = """
        mutation {
          updateCustomer(id:"%s", input: { name:"Alice A.", email:"alice@example.com", status:"ACTIVE" }) { id name }
        }
        """.trimIndent().format(id)
        val r2 = graphQL.execute(update)
        assertTrue(r2.errors.isEmpty())
        val upd = (r2.getData<Map<String, Any?>>()["updateCustomer"] as Map<*, *>)
        assertEquals("Alice A.", upd["name"])

        val del = """mutation { deleteCustomer(id:"%s") }""".format(id)
        val r3 = graphQL.execute(del)
        assertTrue(r3.errors.isEmpty())
        assertEquals(true, r3.getData<Map<String, Any?>>()["deleteCustomer"])
    }
}
