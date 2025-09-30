package io.github.salomax.neotool.example.graphql

import graphql.schema.DataFetcher
import graphql.schema.DataFetchingEnvironment
import graphql.schema.idl.RuntimeWiring
import io.github.salomax.neotool.example.domain.Customer
import io.github.salomax.neotool.example.domain.CustomerStatus
import io.github.salomax.neotool.example.domain.Product
import io.github.salomax.neotool.example.graphql.dto.ProductInputDTO
import io.github.salomax.neotool.example.graphql.dto.CustomerInputDTO
import java.util.UUID

/**
 * Function-bags to decouple GraphQL wiring from actual services.
 * Validators are passed-in to allow Bean Validation or custom rules.
 */
data class ProductFns(
    val list: () -> List<Product>,
    val get: (UUID) -> Product?,
    val create: (Product) -> Product,
    val update: (Product) -> Product?,
    val delete: (UUID) -> Unit
)

data class CustomerFns(
    val list: () -> List<Customer>,
    val get: (UUID) -> Customer?,
    val create: (Customer) -> Customer,
    val update: (Customer) -> Customer?,
    val delete: (UUID) -> Unit
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
                        val idValue = env.getArgument<Any>("id")
                        // Check if the argument is not a string (e.g., it's a number)
                        if (idValue !is String) {
                            throw IllegalArgumentException("ID must be a string, got ${idValue?.javaClass?.simpleName}")
                        }
                        try {
                            val id = UUID.fromString(idValue)
                            productFns.get(id)
                        } catch (e: IllegalArgumentException) {
                            // Invalid UUID format, return null instead of throwing error
                            null
                        }
                    })
                    .dataFetcher("customers", DataFetcher { customerFns.list() })
                    .dataFetcher("customer", DataFetcher { env ->
                        val idValue = env.getArgument<Any>("id")
                        // Check if the argument is not a string (e.g., it's a number)
                        if (idValue !is String) {
                            throw IllegalArgumentException("ID must be a string, got ${idValue?.javaClass?.simpleName}")
                        }
                        try {
                            val id = UUID.fromString(idValue)
                            customerFns.get(id)
                        } catch (e: IllegalArgumentException) {
                            // Invalid UUID format, return null instead of throwing error
                            null
                        }
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
                        val id = arg<String>(env, "id")
                        val input = arg<Map<String, Any?>>(env, "input")
                        val dto = ProductInputDTO(
                            name = field<String>(input, "name"),
                            sku = field<String>(input, "sku"),
                            priceCents = field<Number>(input, "priceCents").toLong(),
                            stock = field<Number>(input, "stock").toInt()
                        )
                        validateProduct(dto)
                        val p = Product(
                            id = id.let { UUID.fromString(id) },
                            name = dto.name,
                            sku = dto.sku,
                            priceCents = dto.priceCents,
                            stock = dto.stock
                        )
                        productFns.update( p)
                    })
                    .dataFetcher("deleteProduct", DataFetcher { env ->
                        val id: UUID = arg<UUID>(env, "id")
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
                            status = CustomerStatus.valueOf(dto.status)
                        )
                        customerFns.create(c)
                    })
                    .dataFetcher("updateCustomer", DataFetcher { env ->
                        val id = arg<String>(env, "id")
                        val input = arg<Map<String, Any?>>(env, "input")
                        val dto = CustomerInputDTO(
                            name = field<String>(input, "name"),
                            email = field<String>(input, "email"),
                            status = field<String>(input, "status")
                        )
                        validateCustomer(dto)
                        val c = Customer(
                            id = id.let { UUID.fromString(id) },
                            name = dto.name,
                            email = dto.email,
                            status = CustomerStatus.valueOf(dto.status)
                        )
                        customerFns.update(c)
                    })
                    .dataFetcher("deleteCustomer", DataFetcher { env ->
                        val id: UUID = arg<UUID>(env, "id")
                        customerFns.delete(id)
                    })
            }
            .type("Subscription") { type ->
                type
                    .dataFetcher("productUpdated", DataFetcher { env ->
                        // For now, return null as subscriptions require reactive streams
                        // In a real implementation, you'd return a Publisher<Product>
                        null
                    })
                    .dataFetcher("customerUpdated", DataFetcher { env ->
                        // For now, return null as subscriptions require reactive streams
                        // In a real implementation, you'd return a Publisher<Customer>
                        null
                    })
            }
            .build()
    }
}
