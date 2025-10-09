package io.github.salomax.neotool.example.graphql.dto

import io.micronaut.core.annotation.Introspected
import io.micronaut.serde.annotation.Serdeable
import jakarta.validation.constraints.*

/**
 * DTOs used for GraphQL inputs. Bean Validation annotations ensure proper constraints.
 */
@Introspected
@Serdeable
data class ProductInputDTO(
    @field:NotBlank(message = "name must not be blank")
    var name: String = "",
    @field:NotBlank(message = "sku must not be blank")
    var sku: String = "",
    @field:Min(value = 0, message = "priceCents must be >= 0")
    var priceCents: Long = 0,
    @field:Min(value = 0, message = "stock must be >= 0")
    var stock: Int = 0
)

@Introspected
@Serdeable
data class CustomerInputDTO(
    @field:NotBlank(message = "name must not be blank")
    var name: String = "",
    @field:Email(message = "email must be a valid email")
    var email: String = "",
    @field:Pattern(regexp = "ACTIVE|INACTIVE", message = "status must be ACTIVE or INACTIVE")
    var status: String = "ACTIVE"
)
