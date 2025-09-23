package io.github.salomax.neotool.example.api

import io.micronaut.http.annotation.*
import jakarta.inject.Singleton
import javax.sql.DataSource
import java.time.LocalDate
import kotlin.random.Random

data class DashboardSummary(
    val totalProducts: Long,
    val totalCustomers: Long,
    val activeCustomers: Long,
    val inventoryValueCents: Long
)

data class Point(val date: String, val value: Long)

@Singleton
class DashboardDAO(private val dataSource: DataSource) {
    fun summary(): DashboardSummary {
        dataSource.connection.use { conn ->
            fun ql(sql: String): Long {
                conn.createStatement().use { st ->
                    st.executeQuery(sql).use { rs -> rs.next(); return rs.getLong(1) }
                }
            }
            val totalProducts = ql("SELECT COUNT(*) FROM products")
            val totalCustomers = ql("SELECT COUNT(*) FROM customers")
            val activeCustomers = ql("SELECT COUNT(*) FROM customers WHERE status='ACTIVE'")
            val inventoryValueCents = ql("SELECT COALESCE(SUM(price_cents*stock),0) FROM products")
            return DashboardSummary(totalProducts, totalCustomers, activeCustomers, inventoryValueCents)
        }
    }

    fun timeseries(days: Int): List<Point> {
        // Demo data only; replace with real metric if needed
        val end = LocalDate.now()
        return (0 until days).map {
            val d = end.minusDays((days-1 - it).toLong())
            Point(d.toString(), Random.nextInt(0, 15).toLong())
        }
    }
}

@Controller("/api/dashboard")
class DashboardController(private val dao: DashboardDAO) {

    @Get("/summary")
    fun summary(): DashboardSummary = dao.summary()

    @Get("/timeseries{?days}")
    fun timeseries(@QueryValue(defaultValue="30") days: Int): List<Point> = dao.timeseries(days.coerceIn(7, 90))
}
