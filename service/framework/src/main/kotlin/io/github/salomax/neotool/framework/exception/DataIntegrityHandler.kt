package io.github.salomax.neotool.framework.exception

import io.micronaut.http.*
import io.micronaut.http.hateoas.JsonError
import io.micronaut.http.server.exceptions.ExceptionHandler
import io.micronaut.data.exceptions.DataAccessException
import jakarta.persistence.OptimisticLockException
import jakarta.inject.Singleton
import org.hibernate.StaleObjectStateException
import org.hibernate.exception.ConstraintViolationException
import org.postgresql.util.PSQLException

@Singleton
class DataAccessHandler :
  ExceptionHandler<DataAccessException, HttpResponse<JsonError>> {

  override fun handle(req: HttpRequest<*>, e: DataAccessException): HttpResponse<JsonError> {
    val cause = e.cause
    val (status, msg) = when {
      cause is ConstraintViolationException && cause.sqlState == "23505" -> // UNIQUE
        HttpStatus.CONFLICT to "Duplicate value"
      cause is PSQLException && cause.sqlState == "23505" ->
        HttpStatus.CONFLICT to "Duplicate value"
      cause is ConstraintViolationException && cause.sqlState == "23503" -> // FK
        HttpStatus.CONFLICT to "Foreign key violation"
      cause is PSQLException && cause.sqlState == "23502" -> // NOT NULL
        HttpStatus.BAD_REQUEST to "Null not allowed"
      else -> HttpStatus.BAD_REQUEST to "Data integrity violation"
    }
    return HttpResponse.status<JsonError>(status).body(JsonError(msg))
  }
}

@Singleton
class OptimisticLockHandler :
  ExceptionHandler<OptimisticLockException, HttpResponse<JsonError>> {

  override fun handle(req: HttpRequest<*>, e: OptimisticLockException): HttpResponse<JsonError> {
    val err = JsonError("The resource was modified by another process. Please reload and retry.")
    return HttpResponse.status<JsonError>(HttpStatus.CONFLICT).body(err) // 409
  }
}

@Singleton
class ConstraintViolationHandler :
  ExceptionHandler<ConstraintViolationException, HttpResponse<JsonError>> {

  override fun handle(req: HttpRequest<*>, e: ConstraintViolationException): HttpResponse<JsonError> {
    val err = JsonError("Duplicate key value violates unique constraint.")
    return HttpResponse.status<JsonError>(HttpStatus.CONFLICT).body(err) // 409
  }
}

@Singleton
class StaleObjectHandler :
  ExceptionHandler<StaleObjectStateException, HttpResponse<JsonError>> {

  override fun handle(req: HttpRequest<*>, e: StaleObjectStateException): HttpResponse<JsonError> {
    val err = JsonError("The resource was modified by another process. Please reload and retry.")
    return HttpResponse.status<JsonError>(HttpStatus.CONFLICT).body(err)
  }
}

