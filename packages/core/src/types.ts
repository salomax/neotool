export type Workload = "REST" | "GraphQL";
export interface AppSpec {
  metadata: { name: string; owner: string; description?: string };
  platform: { frontend: "react-ts"; workload: Workload; database: "postgres"; containers: "docker" };
  auth: string[];
  ui: {
    designSystem: { name: string; version?: string; source?: string };
    theme: { name: string; css?: string; notes?: string };
    templates: Array<{ id: string; label: string; path: string; regions?: Array<{ id: string; kind: "page"|"panel"|"menu"|"slot" }> }>;
  };
  ci?: { provider?: "github-actions" | "none" };
}
