package io.github.salomax.neotool.example.test

import io.github.salomax.neotool.test.assertions.shouldBeSuccessful
import io.github.salomax.neotool.test.http.exchangeAsString
import io.micronaut.test.extensions.junit5.annotation.MicronautTest
import io.micronaut.http.client.HttpClient
import io.micronaut.http.client.annotation.Client
import io.micronaut.http.HttpRequest
import io.micronaut.http.HttpStatus
import jakarta.inject.Inject
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Tag
import org.assertj.core.api.Assertions.assertThat

@MicronautTest
@DisplayName("Simple Micronaut Test")
@Tag("integration")
class SimpleMicronautTest {

    @Inject
    @field:Client("/")
    lateinit var httpClient: HttpClient

    @Test
    fun `health endpoint should be accessible`() {
      httpClient.exchangeAsString(
        HttpRequest.GET<Any>("/health")
      ).shouldBeSuccessful()
    }
}
