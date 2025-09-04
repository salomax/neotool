export type StepKind = "Given" | "When" | "Then";
export type BlueprintHint =
  | { type: "ui.interaction"; on: string; action: string; params?: any }
  | { type: "ui.view.change"; path: string; value: any }
  | { type: "api.operation.add"; name: string; intent: "query" | "mutation"; input?: any; output?: any }
  | { type: "data.entity.add"; entity: any };
export interface StepDefinition { kind: StepKind; pattern: RegExp | string; toBlueprintHints(match: RegExpMatchArray): BlueprintHint[]; description?: string; }
export class StepRegistry {
  private steps: StepDefinition[] = [];
  register(s: StepDefinition) { this.steps.push(s); }
  list() { return [...this.steps]; }
}
