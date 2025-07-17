const Data = require("../data/data")


const resolvers= {
    Query : {
        data: () => Data
    }
}

moduel.exports =resolvers