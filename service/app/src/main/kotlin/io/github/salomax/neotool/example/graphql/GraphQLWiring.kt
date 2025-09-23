package io.github.salomax.neotool.example.graphql

import graphql.schema.DataFetcher
import graphql.schema.DataFetchingEnvironment
import graphql.schema.idl.RuntimeWiring
import io.github.salomax.neotool.example.domain.Customer
import io.github.salomax.neotool.example.domain.Product
import io.github.salomax.neotool.example.graphql.dto.ProductInputDTO
import io.github.salomax.neotool.example.graphql.dto.CustomerInputDTO

/**
 * Function-bags to decouple GraphQL wiring from actual services.
 * Validators are passed-in to allow Bean Validation or custom rules.
 */
data class ProductFns(
    val list: () -> List<Product>,
    val get: (Long) -> Product?,
    val create: (Product) -> Product,
    val update: (Long, Product) -> Product?,
    val delete: (Long) -> Boolean
)

data class CustomerFns(
    val list: () -> List<Customer>,
    val get: (Long) -> Customer?,
    val create: (Customer) -> Customer,
    val update: (Long, Customer) -> Customer?,
    val delete: (Long) -> Boolean
)


// --- injected by patch_graphql_inputs_nullable.py ---
private inline fun <reified T> arg(env: DataFetchingEnvironment, name: String): T =
    env.getArgument<T>(name) ?: throw IllegalArgumentException("Missing argument '$name'")

private inline fun <reified T> field(map: Map<String, Any?>, name: String): T =
    (map[name] as? T) ?: throw IllegalArgumentException("Field '$name' is required")

object GraphQLWiring {
    fun build(
        productFns: ProductFns,
        customerFns: CustomerFns,
        validateProduct: (ProductInputDTO) -> Unit,
        validateCustomer: (CustomerInputDTO) -> Unit
    ): RuntimeWiring {
        return RuntimeWiring.newRuntimeWiring()
            .type("Query") { type ->
                type
                    .dataFetcher("hello", DataFetcher { "world" })
                    .dataFetcher("currentUser", DataFetcher { null })
                    .dataFetcher("products", DataFetcher { productFns.list() })
                    .dataFetcher("product", DataFetcher { env ->
                        val id = arg<String>(env, "id").toLong()
                        productFns.get(id)
                    })
                    .dataFetcher("customers", DataFetcher { customerFns.list() })
                    .dataFetcher("customer", DataFetcher { env ->
                        val id = arg<String>(env, "id").toLong()
                        customerFns.get(id)
                    })
            }
            .type("Mutation") { type ->
                type
                    .dataFetcher("createProduct", DataFetcher { env ->
                        val input = arg<Map<String, Any?>>(env, "input")
                        val dto = ProductInputDTO(
                            name = field<String>(input, "name"),
                            sku = field<String>(input, "sku"),
                            priceCents = field<Number>(input, "priceCents").toLong(),
                            stock = field<Number>(input, "stock").toInt()
                        )
                        validateProduct(dto)
                        val p = Product(
                            name = dto.name,
                            sku = dto.sku,
                            priceCents = dto.priceCents,
                            stock = dto.stock
                        )
                        productFns.create(p)
                    })
                    .dataFetcher("updateProduct", DataFetcher { env ->
                        val id = arg<String>(env, "id").toLong()
                        val input = arg<Map<String, Any?>>(env, "input")
                        val dto = ProductInputDTO(
                            name = field<String>(input, "name"),
                            sku = field<String>(input, "sku"),
                            priceCents = field<Number>(input, "priceCents").toLong(),
                            stock = field<Number>(input, "stock").toInt()
                        )
                        validateProduct(dto)
                        val p = Product(
                            id = id,
                            name = dto.name,
                            sku = dto.sku,
                            priceCents = dto.priceCents,
                            stock = dto.stock
                        )
                        productFns.update(id, p)
                    })
                    .dataFetcher("deleteProduct", DataFetcher { env ->
                        val id = arg<String>(env, "id").toLong()
                        productFns.delete(id)
                    })
                    .dataFetcher("createCustomer", DataFetcher { env ->
                        val input = arg<Map<String, Any?>>(env, "input")
                        val dto = CustomerInputDTO(
                            name = field<String>(input, "name"),
                            email = field<String>(input, "email"),
                            status = field<String>(input, "status")
                        )
                        validateCustomer(dto)
                        val c = Customer(
                            name = dto.name,
                            email = dto.email,
                            status = dto.status
                        )
                        customerFns.create(c)
                    })
                    .dataFetcher("updateCustomer", DataFetcher { env ->
                        val id = arg<String>(env, "id").toLong()
                        val input = arg<Map<String, Any?>>(env, "input")
                        val dto = CustomerInputDTO(
                            name = field<String>(input, "name"),
                            email = field<String>(input, "email"),
                            status = field<String>(input, "status")
                        )
                        validateCustomer(dto)
                        val c = Customer(
                            id = id,
                            name = dto.name,
                            email = dto.email,
                            status = dto.status
                        )
                        customerFns.update(id, c)
                    })
                    .dataFetcher("deleteCustomer", DataFetcher { env ->
                        val id = arg<String>(env, "id").toLong()
                        customerFns.delete(id)
                    })
            }
            .build()
    }
}