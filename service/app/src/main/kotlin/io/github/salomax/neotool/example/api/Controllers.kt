package io.github.salomax.neotool.example.api

import io.github.salomax.neotool.example.domain.*
import io.github.salomax.neotool.example.service.*
import io.micronaut.http.HttpStatus
import io.micronaut.http.annotation.*

@Controller("/api/products")
class ProductController(private val service: ProductService) {

    @Get("/")
    fun list(): List<Product> = service.list()

    @Get("/<built-in function id>")
    fun get(@PathVariable id: Long): Product? = service.get(id)

    @Post("/")
    fun create(@Body input: Product): Product = service.create(input)

    @Put("/<built-in function id>")
    fun update(@PathVariable id: Long, @Body input: Product): Product? = service.update(id, input)

    @Delete("/<built-in function id>")
    fun delete(@PathVariable id: Long): Map<String, Any> =
        mapOf("deleted" to service.delete(id))
}

@Controller("/api/customers")
class CustomerController(private val service: CustomerService) {

    @Get("/")
    fun list(): List<Customer> = service.list()

    @Get("/<built-in function id>")
    fun get(@PathVariable id: Long): Customer? = service.get(id)

    @Post("/")
    fun create(@Body input: Customer): Customer = service.create(input)

    @Put("/<built-in function id>")
    fun update(@PathVariable id: Long, @Body input: Customer): Customer? = service.update(id, input)

    @Delete("/<built-in function id>")
    fun delete(@PathVariable id: Long): Map<String, Any> =
        mapOf("deleted" to service.delete(id))
}
