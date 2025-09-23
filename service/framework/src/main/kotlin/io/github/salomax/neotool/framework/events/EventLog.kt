package io.github.salomax.neotool.framework.events

import io.micronaut.context.annotation.Requires
import jakarta.inject.Singleton
import java.sql.Connection
import javax.sql.DataSource
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper

data class DomainEvent(
    val entity: String,
    val entityId: Long?,
    val eventType: String,
    val payload: Any?
)

@Singleton
class EventLogService(private val dataSource: DataSource) {
    private val mapper = jacksonObjectMapper()

    fun log(event: DomainEvent) {
        dataSource.connection.use { conn ->
            conn.prepareStatement(
                "INSERT INTO event_log (entity, entity_id, event_type, payload) VALUES (?, ?, ?, ?::jsonb)"
            ).use { ps ->
                ps.setString(1, event.entity)
                if (event.entityId == null) ps.setNull(2, java.sql.Types.BIGINT) else ps.setLong(2, event.entityId)
                ps.setString(3, event.eventType)
                ps.setString(4, mapper.writeValueAsString(event.payload ?: emptyMap<String, Any>()))
                ps.executeUpdate()
            }
        }
    }
}
