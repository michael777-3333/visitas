
import connectDB from './db.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import views from './routes/viwes.routes.js'
import qr from './routes/qr.routes.js'



const app = express();
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');
app.use(views)
app.use(qr)
connectDB();

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});


export {app};