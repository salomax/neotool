package io.github.salomax.neotool.example.graphql.resolvers

import io.github.salomax.neotool.example.domain.Customer
import io.github.salomax.neotool.example.domain.CustomerStatus
import io.github.salomax.neotool.example.graphql.dto.CustomerInputDTO
import io.github.salomax.neotool.example.service.CustomerService
import io.github.salomax.neotool.graphql.CrudResolver
import io.github.salomax.neotool.graphql.CrudService
import jakarta.inject.Singleton
import jakarta.validation.Validator
import java.util.*

/**
 * Customer resolver implementing the standard CRUD pattern
 */
@Singleton
class CustomerResolver(
  customerService: CustomerService,
  override val validator: Validator
) : CrudResolver<Customer, CustomerInputDTO, UUID>() {

  override val service: CrudService<Customer, UUID> = CustomerCrudService(customerService)
    
    override fun mapToInputDTO(input: Map<String, Any?>): CustomerInputDTO {
        return CustomerInputDTO(
            name = extractField(input, "name"),
            email = extractField(input, "email"),
            status = extractField(input, "status", "ACTIVE")
        )
    }
    
    override fun mapToEntity(dto: CustomerInputDTO, id: UUID?): Customer {
        return Customer(
            id = id,
            name = dto.name,
            email = dto.email,
            status = try {
                CustomerStatus.valueOf(dto.status)
            } catch (e: IllegalArgumentException) {
                throw IllegalArgumentException("Invalid status: ${dto.status}. Must be one of: ${CustomerStatus.values().joinToString(", ")}")
            }
        )
    }
    
    /**
     * Extract field with type safety and default values
     */
    private fun <T> extractField(input: Map<String, Any?>, name: String, defaultValue: T? = null): T {
        @Suppress("UNCHECKED_CAST")
        return input[name] as? T ?: defaultValue ?: throw IllegalArgumentException("Field '$name' is required")
    }
}

/**
 * Adapter to make CustomerService compatible with CrudService interface
 */
class CustomerCrudService(private val customerService: CustomerService) : CrudService<Customer, UUID> {
    
    override fun create(entity: Customer): Customer = customerService.create(entity)
    
    override fun update(entity: Customer): Customer? = customerService.update(entity)
    
    override fun delete(id: UUID): Boolean {
        customerService.delete(id)
        return true
    }
    
    override fun getById(id: UUID): Customer? = customerService.get(id)
    
    override fun list(): List<Customer> = customerService.list()
}
