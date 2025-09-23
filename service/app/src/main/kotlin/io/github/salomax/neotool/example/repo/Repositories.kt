package io.github.salomax.neotool.example.repo

import io.github.salomax.neotool.example.domain.*
import io.micronaut.data.annotation.Repository
import io.micronaut.data.jpa.repository.JpaRepository

@Repository
interface ProductRepository : JpaRepository<Product, Long> {
    fun findBySku(sku: String): Product?
}

@Repository
interface CustomerRepository : JpaRepository<Customer, Long> {
    fun findByEmail(email: String): Customer?
}
