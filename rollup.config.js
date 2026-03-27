import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/main.ts",
  output: {
    file: "zs-better-scheduler-card.js",
    format: "es",
    sourcemap: true
  },
  plugins: [resolve(), typescript()]
};
