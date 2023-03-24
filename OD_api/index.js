require('dotenv').config();
const express = require ('express')
const cors = require ('cors')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const dbConnect = require('./config/dbConfig')

const PORT = process.env.PORT || 5000

dbConnect()
const app = express()
app.use(cors({origin: ["https://order&delivery-mgmt.onrender.com", "http://localhost:3000"],}))
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development', //when NODE_ENV is equal to production, graphiql will be set to false.
    //or just use: "graphiql: true"
}))

app.listen(PORT, ()=>{
    console.log(`app running on port ${PORT}`)
})