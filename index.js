const express = require("express")
const server = express()
const morgan = require("morgan")
//const {PORT=3000} = process.env
const PORT = 3000

server.use(morgan('dev'))
server.use(express.json())

const apiRouter = require('./api')
server.use('/api',apiRouter)

const client = require("./db/client")
client.connect()

server.use((error,req,res,next)=>{
    console.error("SERVER ERROR: ",error)
    res.send({
        name: error.name,
        message: error.message
    })
})

server.listen(PORT,()=>{
    console.log("the server is up on port",PORT)
})