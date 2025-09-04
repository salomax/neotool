import type { TemplateManifest } from "@neotool/core";
import { TemplateRegistry, ScaffoldRegistry, type Scaffold } from "@neotool/core";
export function registerTemplates(reg: TemplateRegistry) {
  const manifest: TemplateManifest = require("./templates/Dashboard/manifest.json");
  reg.register(manifest);
}
export function registerScaffolds(reg: ScaffoldRegistry) {
  const reactPage: Scaffold = { id: "react-page", appliesTo: "ui", async render(ctx){ return [{ path: "app/web/src/pages/ExamplePage.tsx", content: "// generated page", mode: "644" }]; } };
  const reactDrawer: Scaffold = { ...reactPage, id: "react-drawer" };
  const restController: Scaffold = { id: "rest-controller", appliesTo: "api", async render(){ return [{ path: "app/service/src/controllers/example.ts", content: "// controller", mode: "644" }]; } };
  const sqlMigration: Scaffold = { id: "sql-migration", appliesTo: "data", async render(){ return [{ path: "infra/migrations/0001_init.sql", content: "-- migration", mode: "644" }]; } };
  reg.register(reactPage); reg.register(reactDrawer); reg.register(restController); reg.register(sqlMigration);
}
