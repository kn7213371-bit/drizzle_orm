import { eq ,ilike,sql , or } from "drizzle-orm";
import { db } from "../db.js";
import { todos } from "../schema.js";

export async function getAll() {
  return await db.select().from(todos);
}

export async function getById(id) {
  const data = await db.select({
    id: todos.id,
    title: todos.title,
    body: todos.body,
    createdAt: todos.createdAt,
    done: todos.done,
  })
  .from(todos)
  .where(eq(todos.id, Number(id))).limit(1);

  return data[0];
}


export async function created({title,body,done=false}){
   const data=await db.insert(todos).values({title,body,done}).returning();
   return data[0];
}

export async function update(id,{title , body }){
  const data =await db.update(todos).set({title , body }).where(eq(todos.id,Number(id))).returning();

  return data[0];
}


export async function toggoDone(id) {
  const date = await db.update(todos).set({done : sql `NOT ${(todos.done)}`}).where(eq(todos.id,Number(id))).returning();

  return date[0];
}

export async function deleted(id) {
  const data = await db.delete(todos).where(eq(todos.id , Number(id))).returning();

  return data[0];
}

export async function searchTodo(search) {
  const data = await db.select().from(todos).where(
    or(
      ilike(todos.title,`%${search}`),
      ilike(todos.body,`%${search}`),
    ) 
  )

  return data;
}