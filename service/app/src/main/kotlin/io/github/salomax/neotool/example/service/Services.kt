package io.github.salomax.neotool.example.service

import io.github.salomax.neotool.example.domain.*
import io.github.salomax.neotool.example.repo.*
import io.github.salomax.neotool.framework.events.*
import jakarta.inject.Singleton
import jakarta.transaction.Transactional

@Singleton
class ProductService(
    private val repo: ProductRepository,
    private val eventLog: EventLogService
) {
    fun list(): List<Product> = repo.findAll()
    fun get(id: Long): Product? = repo.findById(id).orElse(null)

    @Transactional
    fun create(p: Product): Product {
        val saved = repo.save(p)
        eventLog.log(DomainEvent("Product", saved.id, "CREATED", saved))
        return saved
    }

    @Transactional
    fun update(id: Long, input: Product): Product? {
        val existing = get(id) ?: return null
        existing.name = input.name
        existing.sku = input.sku
        existing.priceCents = input.priceCents
        existing.stock = input.stock
        val saved = repo.update(existing)
        eventLog.log(DomainEvent("Product", saved.id, "UPDATED", saved))
        return saved
    }

    @Transactional
    fun delete(id: Long): Boolean {
        val found = get(id) ?: return false
        repo.delete(found)
        eventLog.log(DomainEvent("Product", id, "DELETED", mapOf("id" to id)))
        return true
    }
}

@Singleton
class CustomerService(
    private val repo: CustomerRepository,
    private val eventLog: EventLogService
) {
    fun list(): List<Customer> = repo.findAll()
    fun get(id: Long): Customer? = repo.findById(id).orElse(null)

    @Transactional
    fun create(c: Customer): Customer {
        val saved = repo.save(c)
        eventLog.log(DomainEvent("Customer", saved.id, "CREATED", saved))
        return saved
    }

    @Transactional
    fun update(id: Long, input: Customer): Customer? {
        val existing = get(id) ?: return null
        existing.name = input.name
        existing.email = input.email
        existing.status = input.status
        val saved = repo.update(existing)
        eventLog.log(DomainEvent("Customer", saved.id, "UPDATED", saved))
        return saved
    }

    @Transactional
    fun delete(id: Long): Boolean {
        val found = get(id) ?: return false
        repo.delete(found)
        eventLog.log(DomainEvent("Customer", id, "DELETED", mapOf("id" to id)))
        return true
    }
}
