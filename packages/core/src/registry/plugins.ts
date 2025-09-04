export interface NeotoolPlugin {
  name: string;
  setup?(ctx: any): void | Promise<void>;
  preValidateApp?(app: unknown): void | Promise<void>;
  postValidateApp?(result: { ok: boolean; errors?: any[] }): void | Promise<void>;
  preCompileBlueprint?(ctx: any): void | Promise<void>;
  postCompileBlueprint?(ctx: any & { files?: any[] }): void | Promise<void>;
  preBuild?(ctx: any): void | Promise<void>;
  postBuild?(ctx: any & { files?: any[] }): void | Promise<void>;
}
export class PluginRegistry {
  private plugins: NeotoolPlugin[] = [];
  register(p: NeotoolPlugin) { this.plugins.push(p); }
  list() { return [...this.plugins]; }
}
