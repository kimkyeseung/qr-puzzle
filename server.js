const express = require('express')
const http = require('http')
const next = require('next')
const socketio = require('socket.io')

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

nextApp.prepare().then(async () => {
  const app = express()
  const server = http.createServer(app)
  const io = new socketio.Server()
  io.attach(server)

  io.on('connection', (socket) => {
    console.log('connection')
    socket.emit('status', 'Hello from Socket.io')

    socket.on('disconnect', () => {
      console.log('client disconnected')
    })
  })

  app.get('/hello', async (_, res) => {
    res.send('Hello World')
  })

  app.get('/api/start/:id', (req, res) => {
    io.emit('start', 1, 2, 3)

    res.send('start game')
  })

  app.all('*', (req, res) => nextHandler(req, res))

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})