package io.github.salomax.neotool.example.entity

import io.github.salomax.neotool.example.domain.Product
import jakarta.persistence.*
import java.time.Instant
import java.util.UUID

@Entity
@Table(name = "products")
data class ProductEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "uuid")
    val id: UUID?,

  @Column(nullable = false)
    var name: String,

  @Column(nullable = false, unique = true)
    var sku: String,

  @Column(name = "price_cents", nullable = false)
    var priceCents: Long = 0,

  @Column(nullable = false)
    var stock: Int = 0,

  @Column(name = "created_at", nullable = false)
    var createdAt: Instant = Instant.now(),

  @Column(name = "updated_at", nullable = false)
    var updatedAt: Instant = Instant.now(),

  @Version
  var version: Long?
) {
    fun toDomain(): Product {
        return Product(
            id = this.id,
            name = this.name,
            sku = this.sku,
            priceCents = this.priceCents,
            stock = this.stock,
            createdAt = this.createdAt,
            updatedAt = this.updatedAt,
            version = this.version
        )
    }
}
