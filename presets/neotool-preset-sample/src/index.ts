export interface Preset { name: string; plugins: string[]; scaffoldMapping: Record<string, string>; }
const preset: Preset = { name: "sample", plugins: ["neotool-plugin-sample"], scaffoldMapping: {
  "ui.page": "react-page", "ui.drawer": "react-drawer", "api.query": "rest-controller", "api.mutation": "rest-controller", "data.entity": "sql-migration"
}};
export default preset;
