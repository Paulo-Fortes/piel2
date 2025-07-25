import dotenv from 'dotenv';
dotenv.config();
import connectToDatabase from './db.js';
import express from 'express';
import cors from 'cors';

// Rutas
import productRoutes from './routes/productRoutes.js';

connectToDatabase();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);

const port = 5000;

app.get('/', (req,res) => {
    res.send('La API está corriendo...');
});


app.listen(port, () => {
    console.log(`Server runs on port ${port}`);
});