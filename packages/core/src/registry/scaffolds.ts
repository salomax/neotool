export type ScaffoldTarget = "ui" | "api" | "data" | "infra" | "ci";
export interface GeneratedFile { path: string; content: string; mode?: "644" | "755"; }
export interface ScaffoldContext { app: any; feature?: any; blueprints: { ui?: any; api?: any; data?: any }; helpers?: Record<string, any>; }
export interface Scaffold { id: string; appliesTo: ScaffoldTarget; render(ctx: ScaffoldContext): Promise<GeneratedFile[]>; }
export class ScaffoldRegistry {
  private scaffolds = new Map<string, Scaffold>();
  register(s: Scaffold) { this.scaffolds.set(s.id, s); }
  get(id: string) { return this.scaffolds.get(id); }
  list() { return Array.from(this.scaffolds.values()); }
}
