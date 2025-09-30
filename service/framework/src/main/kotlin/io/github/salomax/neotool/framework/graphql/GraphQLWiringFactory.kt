package io.github.salomax.neotool.framework.graphql

fun interface GraphQLWiringFactory {
  fun build(): graphql.schema.idl.RuntimeWiring
}
