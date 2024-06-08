import express from 'express';
import * as path from 'path';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import bodyParser from 'body-parser';
import multer from 'multer';
import connectDB from './config/db';
import appRouting from './routes/app-routing';
import cors from 'cors';


// Connect to MongoDB
connectDB().then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Set up file upload
const upload = multer({ dest: 'uploads/' });

// Routes
app.use('/api', appRouting);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

// Socket.io setup
io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('file upload', (fileData) => {
    io.emit('file upload', fileData);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
