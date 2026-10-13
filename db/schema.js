import * as p from "drizzle-orm/pg-core"


export const todos=p.pgTable("todos",{
    id:p.integer().primaryKey().generatedAlwaysAsIdentity(),
    title:p.varchar({length:255}).notNull(),
    body:p.varchar({length:255}),
    createdAt:p.timestamp().defaultNow(),
    done:p.boolean().default(false).notNull()
});

