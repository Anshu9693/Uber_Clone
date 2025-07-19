const http = require("http")
const app = require("./app")
const port = process.env.PORT||300

const server = http.createServer(app)

server.listen(port,()=>{
    console.log(`the server is running ont the ${port}`)
})