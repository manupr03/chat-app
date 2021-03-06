const express = require('express')
const path = require('path')
const http = require('http')
const socket = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socket(server)

const port = process.env.PORT || 5000
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))


io.on('connection',(socket) => {
    console.log('a new websocket connection..')
    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message','a new user has joined')

    socket.on('sendMessage', (message) => {
    io.emit('message', message)
    })

    socket.on('disconnect', () => {
        io.emit('message', 'a user has left')
    })
})

server.listen(port,() => {
    console.log(`server is running on port ${port}!`)
})