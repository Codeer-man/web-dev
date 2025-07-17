
const {ApolloServer}= require("@apollo/server")
const {startStandaloneServer}= require("@apollo/server/standalone")
const typesDefs = require("./graphql/schema")
const resolvers = require("./graphql/resulver")

async function startServer() {
    const server = new ApolloServer({
        typesDefs,
        resolvers
    })

   const {url} = await startStandaloneServer(server,{
    listen:{port:4000}
   })
   console.log(`server running on ${url}`);
   
}
startServer()