import { createInsertSchema, createUpdateSchema } from "drizzle-orm/zod";
import { todos } from "../db/schema.js";


export const todoInsert=createInsertSchema(todos);
export const todoUpdate=createUpdateSchema(todos);