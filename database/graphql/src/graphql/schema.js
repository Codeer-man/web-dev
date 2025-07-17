const gql = require("graphql-tag");
// import gql from "graphql-tag"

const typeDefs = gql`
  type Data {
    id: ID!
    name: String!
    category: Float;
    instock: Boolean!
  }
    type Query {
    products: [Data!]!
    product(id: ID!): Data
    }
`;

module.exports= typeDefs

    