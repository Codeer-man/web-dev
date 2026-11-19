import express from "express"
import dotenv from "dotenv"
dotenv.config()
import { GoogleGenAI } from "@google/genai";
import { ChatGoogle } from "@langchain/google";
import { ChatGroq } from "@langchain/groq"
const app = express()

const port = process.env.PORT || 5000


app.use(express.json())

// streaming
// const main=async ()=>{
//     const responseStream=await ai.models.generateContentStream({
//         model:"gemini-2.5-flash",
//         contents:"what is js"
//     })

//     for await (const chunk of responseStream) {
//         console.log(chunk.text)
//     }
// }

// main()

//by default
// const main=async ()=>{
//     const response=await ai.models.generateContent({
//         model:"gemini-2.5-flash",
//         contents:"what is js"
//     })

//     console.log(response.text)
// }

// main()

// const ai= new GoogleGenAI({
//     apiKey:process.env.GEMINI_API_KEY
// })

// project

// app.post("/chat",async (req,res)=>{
//     const {prompt}=req.body
//     const result=await ai.models.generateContent({
//         model:"gemini-3.5-flash",
//         contents:prompt
//     })

//     return res.json(result.text)

// })

//langchain

app.post("/chat",async (req,res)=>{
    const {prompt}=req.body
    const ai=new ChatGroq({
        model:"openai/gpt-oss-120b"
    })


    const result=await ai.invoke([
        {
            role:"system",
            content:"you are jarvis and my assistant"
        },
        {
            role:"human",
            content:prompt
        }
    ])
    return res.json(result.content)
})


app.listen(port, () => {
    console.log("server started at ", port)
})