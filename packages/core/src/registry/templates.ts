export type RegionKind = "page" | "menu" | "panel" | "slot";
export interface TemplateManifest {
  id: string; label: string; regions: Array<{ id: string; kind: RegionKind }>; propsSchema?: object; entry?: string;
}
export class TemplateRegistry {
  private templates = new Map<string, TemplateManifest>();
  register(t: TemplateManifest) { this.templates.set(t.id, t); }
  get(id: string) { return this.templates.get(id); }
  list() { return Array.from(this.templates.values()); }
}
