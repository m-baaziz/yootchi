import fs from "fs";
import path from "path";
import { buildSchema } from "graphql";
import * as preferencesResovler from "./resolvers/preferences";

const SCHEMA_PATH = path.join(process.cwd(), "schema.graphql");
console.log("path = ", __dirname, SCHEMA_PATH);

export const schema = buildSchema(fs.readFileSync(SCHEMA_PATH, "utf-8"));

// load user using header authorization token then resolve preferences
export const resolvers = {
  hello: () => "hello world",
  preferences: preferencesResovler.get,
  updatePreferences: preferencesResovler.update,
};
