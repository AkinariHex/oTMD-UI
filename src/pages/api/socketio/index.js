import { Server } from 'socket.io'

const ioHandler = (req, res) => {
    if (!res.socket.server.io) {
      console.log('*First use, starting socket.io')
  
      const io = new Server(res.socket.server, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"]
        }
      })
  
      io.on('connection', socket => {
        socket.broadcast.emit('a user connected')
        socket.on('hello', msg => {
          socket.emit('hello', msg)
        })
      })
  
      res.socket.server.io = io
    } else {
      console.log('socket.io already running')
    }
    res.end()
  }
  
  export const config = {
    api: {
      bodyParser: false
    }
  }
  
  export default ioHandler