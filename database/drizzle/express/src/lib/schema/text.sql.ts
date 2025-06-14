import { pgTable, text, varchar } from "drizzle-orm/pg-core";


export const character = pgTable("Character",{
    
    text: text() ,// text has unlimited character length
    varchar : varchar({length:256})
})

// create table if not exists text(
//     text text
// varchar varchar(256)
// )