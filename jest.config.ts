import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node", // use "jsdom" if you're testing browser/React code
  testMatch: ["**/*.test.ts", "**/*.spec.ts"],
  clearMocks: true,
};

export default config;