const { Server } = require("@hocuspocus/server")

const server = new Server({
  port: 1234,
})

server.listen()

console.log("Server running on ws://localhost:1234")