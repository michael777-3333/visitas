const http = require('http')
const express = require('express')
const socketio= require('socket.io')
const path = require('path');
const connectDB = require('./db.js')
const mongoose =require('mongoose')

const app = express()
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

const server = http.createServer(app)
const io = socketio(server)


const visitSchema = new mongoose.Schema({
    qrId: String,
    visitedAt: { type: Date, default: Date.now },
  });
  
const Visit = mongoose.model('Visit', visitSchema);

require ('./socket.js') (io)
app.get('/index/:qrId', async (req, res) => {
    const { qrId } = req.params;
    console.log(qrId);
  // Guarda la visita en la base de datos
  const newVisit = new Visit({ qrId });
  await newVisit.save();
    res.render('index',{ qrId}); 
});

app.get('/about/:qrId', async (req, res) => {
    const { qrId } = req.params;
    console.log(qrId);
  // Guarda la visita en la base de datos
    const newVisit = new Visit({ qrId });
    await newVisit.save();
    res.render('about.ejs'); 
});


connectDB()
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});