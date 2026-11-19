import express from "express"
import dotenv from "dotenv"
dotenv.config()
import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { ChatGroq } from "@langchain/groq"
const app = express()

const port = process.env.PORT || 5000


app.use(express.json())


const client=new Client({
    name:"client",
    version:"1.0.0"
})
const ai=new ChatGroq({
    model:"openai/gpt-oss-120b"
})

async function start() {

const transport=new StdioClientTransport({
    command:process.execPath,
    args:["server.js"]
})

await client.connect(transport)

const {tools}=await client.listTools()

const modelwithTools=ai.bindTools(
    tools.map(t=>({
        type:"function",
        function:{
            name:t.name,
            description:t.description,
            parameters:t.inputSchema
        }
    }))
)




   app.post("/chat",async (req,res)=>{
    const {prompt}=req.body


    const response=await modelwithTools.invoke([
        {
            role:"human",
            content:prompt
        }
    ])
    
    if(response.tool_calls.length){
        const tool=response.tool_calls[0]
        const result=await client.callTool({
            name:tool.name,
            arguments:tool.args
        })

        return res.json(result.content[0].text)
    }

    return res.json(response.content)


})


app.listen(port, () => {
    console.log("server started at ", port)
}) 
}


start()


