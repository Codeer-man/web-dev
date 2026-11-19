import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";

const server=new McpServer({
    name:"calculator",
    version:"1.0.0"
})

server.registerTool(
    "addition",
    {
        description:"for adding two numbers",
        inputSchema:z.object({
            a:z.number(),
            b:z.number()
        })
    },
    async ({a,b})=>{

        return {
            content:[
                {
                    type:"text",
                    text:`sum using this mcp tool is ${a} & ${b} = ${a+b}`
                }
            ]
        }
    }
)



const transport=new StdioServerTransport()
server.connect(transport)