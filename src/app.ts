import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes.js';
import path from 'path';
import { fileURLToPath } from "url";
import { ConnectMongo } from './config/db.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Manually define __dirname for ES modules

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Routes
app.use('/students', studentRoutes);

// MongoDB Connection
const connectMongo = new ConnectMongo();

connectMongo.connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(" Server startup failed:", error);
  });