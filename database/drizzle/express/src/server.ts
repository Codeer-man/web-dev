import dotenv from "dotenv"
import express from "express"
import { db } from "./lib/db";
import { authTable } from "./lib/schema/auth.sql";
import { del, insert, update } from "./controller/auth";
 
dotenv.config()

const app = express()
const PORT = 3000;


app.use(express.json())
app.post("/insert" ,insert)
app.put("/update" ,update)
app.delete("/delete" ,del)


app.listen(PORT,() =>{
    console.log("server running in 3000");
    
})
