package io.github.salomax.neotool.example.graphql

import graphql.schema.idl.RuntimeWiring
import io.github.salomax.neotool.example.service.CustomerService
import io.github.salomax.neotool.example.service.ProductService
import io.github.salomax.neotool.framework.graphql.GraphQLWiringFactory
import io.github.salomax.neotool.framework.graphql.InputValidator
import jakarta.inject.Singleton

@Singleton
class AppWiring(
  val productService: ProductService,
  val customerService: CustomerService,
  val validator: InputValidator
) : GraphQLWiringFactory {
  override fun build(): RuntimeWiring = GraphQLWiring.build(
    productFns = ProductFns(
      list = { productService.list() },
      get = { id -> productService.get(id) },
      create = { p -> productService.create(p) },
      update = { p -> productService.update(p) },
      delete = { id -> productService.delete(id) }
    ),
    customerFns = CustomerFns(
      list = { customerService.list() },
      get = { id -> customerService.get(id) },
      create = { c -> customerService.create(c) },
      update = { c -> customerService.update(c) },
      delete = { id -> customerService.delete(id) }
    ),
    validateProduct = { dto -> validator.validate(dto) },
    validateCustomer = { dto -> validator.validate(dto) }
  )
}
