# Grafana Alloy Configuration

This directory contains the Grafana Alloy configuration that replaces the deprecated Promtail.

## Migration from Promtail

Grafana Alloy is the next-generation agent from Grafana that replaces Promtail, Prometheus Agent, and other Grafana agents. It provides:

- Better performance and resource efficiency
- Unified configuration for logs, metrics, and traces
- More flexible pipeline processing
- Better error handling and observability

## Configuration

The `config.alloy` file contains:

1. **Docker Log Scraping**: Collects logs from Docker containers
2. **Workspace Log Scraping**: Collects logs from the workspace directory
3. **Log Processing**: Processes and enriches log entries
4. **Loki Integration**: Forwards processed logs to Loki

## Key Differences from Promtail

- Uses Alloy's component-based configuration syntax
- More flexible log processing pipeline
- Better error handling and retry mechanisms
- Unified agent for logs, metrics, and traces

## Access

- Alloy UI: http://localhost:12345
- Logs are forwarded to Loki at http://localhost:3100

## Troubleshooting

Check the Alloy container logs for any configuration issues:

```bash
docker logs neotool-alloy
```

The Alloy UI provides real-time status and metrics for all components.
