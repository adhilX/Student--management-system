import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routers/studentRoutes.js';
import path from 'path';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serving static files (HTML, CSS, JS)
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
// Routes
app.use('/students', studentRoutes);
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
    .catch(err => console.error("MongoDB Connection Error:", err));
