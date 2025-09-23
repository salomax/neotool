package io.github.salomax.neotool.example.domain

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "products")
data class Product(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    @Column(nullable = false)
    var name: String,
    @Column(nullable = false, unique = true)
    var sku: String,
    @Column(name = "price_cents", nullable = false)
    var priceCents: Long = 0,
    @Column(nullable = false)
    var stock: Int = 0,
    @Column(name = "created_at", nullable = false)
    var createdAt: LocalDateTime = LocalDateTime.now(),
    @Column(name = "updated_at", nullable = false)
    var updatedAt: LocalDateTime = LocalDateTime.now(),
)

@Entity
@Table(name = "customers")
data class Customer(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    @Column(nullable = false)
    var name: String,
    @Column(nullable = false, unique = true)
    var email: String,
    @Column(nullable = false)
    var status: String = "ACTIVE",
    @Column(name = "created_at", nullable = false)
    var createdAt: LocalDateTime = LocalDateTime.now(),
    @Column(name = "updated_at", nullable = false)
    var updatedAt: LocalDateTime = LocalDateTime.now(),
)
