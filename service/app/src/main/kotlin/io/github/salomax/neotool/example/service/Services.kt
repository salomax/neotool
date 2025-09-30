package io.github.salomax.neotool.example.service

import io.github.salomax.neotool.example.domain.Customer
import io.github.salomax.neotool.example.domain.Product
import io.github.salomax.neotool.example.repo.CustomerRepository
import io.github.salomax.neotool.example.repo.ProductRepository
import io.micronaut.http.server.exceptions.NotFoundException
import jakarta.inject.Singleton
import jakarta.transaction.Transactional
import java.util.UUID

@Singleton
open class ProductService(
    private val repo: ProductRepository
) {
    fun list(): List<Product> {
        val entities = repo.findAll()
        return entities.map { it.toDomain() }
    }
    
    fun get(id: UUID): Product? {
        val entity = repo.findById(id).orElse(null) ?: return null
        return entity.toDomain()
    }

    @Transactional
    open fun create(product: Product): Product {
        val entity = product.toEntity()
        val saved = repo.save(entity)
        return saved.toDomain()
    }

    @Transactional
    open fun update(product: Product): Product {
        val updatedEntity = product.toEntity()
        val saved = repo.update(updatedEntity)
        return saved.toDomain()
    }

    @Transactional
    open fun delete(id: UUID) {
        val found = repo.findById(id).orElseThrow { NotFoundException() }
        repo.delete(found)
    }
}

@Singleton
open class CustomerService(
    private val repo: CustomerRepository
) {
    fun list(): List<Customer> {
        val entities = repo.findAll()
        return entities.map { it.toDomain() }
    }
    
    fun get(id: UUID): Customer? {
        val entity = repo.findById(id).orElse(null) ?: return null
        return entity.toDomain()
    }

    @Transactional
    open fun create(customer: Customer): Customer {
        val entity = customer.toEntity()
        val saved = repo.save(entity)
        return saved.toDomain()
    }

    @Transactional
    open fun update(customer: Customer): Customer {
        val updatedEntity = customer.toEntity()
        val saved = repo.update(updatedEntity)
        return saved.toDomain()
    }

    @Transactional
    open fun delete(id: UUID) {
        val found = repo.findById(id).orElseThrow { NotFoundException() }
        repo.delete(found)
    }
}
