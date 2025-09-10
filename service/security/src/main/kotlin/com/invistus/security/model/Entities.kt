
package com.neotool.security.model

import jakarta.persistence.*
import java.util.UUID

@Entity @Table(name = "users")
data class User(
    @Id val id: UUID = UUID.randomUUID(),
    @Column(nullable = false, unique = true) val email: String,
    val displayName: String? = null
)

@Entity @Table(name = "roles")
data class Role(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Int? = null,
    @Column(nullable = false, unique = true) val name: String
)

@Entity @Table(name = "permissions")
data class Permission(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Int? = null,
    @Column(nullable = false, unique = true) val name: String
)
