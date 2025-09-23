package io.github.salomax.neotool.example.api

import io.micronaut.http.annotation.*
import javax.sql.DataSource

data class EventRow(
    val id: Long,
    val entity: String,
    val entityId: Long?,
    val eventType: String,
    val payload: String?,
    val createdAt: String
)

@Controller("/api/events")
class EventsController(private val dataSource: DataSource) {
    @Get("/")
    fun list(
        @QueryValue(defaultValue = "") entity: String,
        @QueryValue(defaultValue = "") eventType: String,
        @QueryValue(defaultValue = "50") limit: Int
    ): List<EventRow> {
        val sql = StringBuilder("SELECT id, entity, entity_id, event_type, payload::text, to_char(created_at,'YYYY-MM-DD HH24:MI:SS') FROM event_log WHERE 1=1")
        val params = mutableListOf<String>()
        if (entity.isNotBlank()) { sql.append(" AND entity = ?"); params.add(entity) }
        if (eventType.isNotBlank()) { sql.append(" AND event_type = ?"); params.add(eventType) }
        sql.append(" ORDER BY id DESC LIMIT ?")
        dataSource.connection.use { conn ->
            conn.prepareStatement(sql.toString()).use { ps ->
                var idx = 1
                for (p in params) { ps.setString(idx++, p) }
                ps.setInt(idx, limit.coerceIn(1, 500))
                ps.executeQuery().use { rs ->
                    val out = mutableListOf<EventRow>()
                    while (rs.next()) {
                        out.add(EventRow(
                            id = rs.getLong(1),
                            entity = rs.getString(2),
                            entityId = rs.getLong(3).takeIf { !rs.wasNull() },
                            eventType = rs.getString(4),
                            payload = rs.getString(5),
                            createdAt = rs.getString(6)
                        ))
                    }
                    return out
                }
            }
        }
    }
}
