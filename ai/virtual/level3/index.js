import express from "express"
import dotenv from "dotenv"
dotenv.config()
import { ChatGoogle } from "@langchain/google";
import { TavilySearch } from "@langchain/tavily";
import {context, createAgent, HumanMessage, tool} from "langchain"
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb";
import z from "zod";
import { ChatGroq } from "@langchain/groq"
import { MessagesAnnotation, messagesDeltaReducer, StateGraph,MemorySaver, StateSchema, interrupt, Command } from "@langchain/langgraph";
import { MongoClient } from "mongodb";
import {randomUUID} from "node:crypto"
const app = express()

const port = process.env.PORT || 5000



app.use(express.json())

const client=new MongoClient("add your db url")

const checkpointer=new MongoDBSaver({client})

// ai agent = llm + tools 

// const tool1=tool(
//     ({email,content})=>{

//        return `email sent successfully to ${email} with content ${content}`
//     },
//     {
//         name:"email_send_tool",
//         description:"use this tool to send email",
//         schema:z.object({
//             email:z.string().describe("sender email"),
//             content:z.string().describe("mail content for sending")
//         })
//     }
// )




//custom tool

// const tool2= tool(
//     ({a,b})=>{
//        return `addition of ${a} & ${b} is 7`
//     },{
//         name:"addition_tool",
//         description:"use this tool for addition for two numbers",
//         schema:z.object({
//             a:z.number(),
//             b:z.number()
//         })
//     }
// )



// const tools=[tool1,tool2]

// const model = new ChatGoogle("gemini-2.5-flash").bindTools(tools)

// const toolNode=new ToolNode(tools)

// const agent=async (state)=>{

//     const result=await model.invoke(
//        state.messages
//     )

//     return {
//         messages:[result]
//     }
    
// }


// const shouldContinue=async (state)=>{
//     console.log(state)
//     if(state.messages[state.messages.length-1].tool_calls.length>0){
//         return "tool_node"
//     }else{
//         return "__end__"
//     }
// }

// state=[
//     humanMessage:"",
//     AiMessage:"",
//     toolMessage:"",
//     AiMessages:""
// ]

// const graph=new StateGraph(MessagesAnnotation)
// .addNode("agent",agent)
// .addNode("tool_node",toolNode)
// .addEdge("__start__","agent")
// .addConditionalEdges("agent",shouldContinue)
// .addEdge("tool_node","agent")
// .compile({checkpointer})




// app.post("/chat", async (req, res) => {
//     const { prompt } = req.body
//     const result=await graph.invoke(
//         {
//         messages:[
//             {
//                 role:"user",
//                 content:prompt
//             }
//         ]
//     },

//     {
//         configurable:{thread_id:"1"}
//     }

// )

//     console.log(result.messages)
//     return res.json(result.messages[result.messages.length-1].content)
      
// })

const customState=new StateSchema({
    prompt:z.string(),
    approvalRequires:z.boolean(),
    aiResponse:z.string(),
    approved:z.boolean(),
    result:z.string()
})

const model=new ChatGroq({
     model: "openai/gpt-oss-120b"
})

const agent=async (state)=>{
   const result=await model.invoke([
    {
        role:"system",
        content:` You are a helpful assistant.

        If the user is greeting or asking a normal question,
        respond normally and set approvalRequires to false.

        If the request requires a sensitive external action,
        such as sending an email or deleting a file,
        set approvalRequires to true.

        Return JSON with:
        {
          "response": "your response",
          "approvalRequires": true or false
        }`
    },
    {
        role:"user",
        content:state.prompt
    }

   ])

const parsed=JSON.parse(result.content)

return {
    aiResponse:parsed.response,
    approvalRequires:parsed.approvalRequires
}


}

const approvalNode=async (state) => {
    const answer=interrupt({
        message:"Do you approve this action?",
        prompt:state.prompt,
        aiResponse:state.aiResponse
    })

    return{
        approved:String(answer).trim().toLowerCase()==="yes"
    }

}

const actionNode=async (state) => {
    if(state.approved){
        return {
            result:`action approved `
        }
    }

    return {
        result:"action reject by human"
    }
}

const shouldContinue=async (state) => {
    if(state.approvalRequires){
        return "approval"
    }

    return "__end__"
}

const graph=new StateGraph(customState)
.addNode("agent",agent)
.addNode("approval",approvalNode)
.addNode("action",actionNode)
.addEdge("__start__","agent")
.addConditionalEdges("agent",shouldContinue)
.addEdge("approval","action")
.addEdge("action","__end__")
.compile({checkpointer})


app.post("/chat",async (req,res)=>{
   const {prompt}=req.body
   const threadId=randomUUID()
   
   const result=await graph.invoke(
    {
     prompt
    },
    {
       configurable:{thread_id:threadId} 
    }
   )
  
   return res.json({
     threadId,
     result:result.result,
     ai:result.aiResponse
   })
})


app.post("/chat/resume",async (req,res)=>{
   const {threadId,answer}=req.body
   
   
   const result=await graph.invoke(
     new Command({
        resume:String(answer)
     })
     ,
     
       {
       configurable:{thread_id:threadId} 
    }  
     
   )
  
   return res.json({
     threadId,
     result:result.result
   })
})





app.listen(port, () => {
    console.log("server started at ", port)
})
