import express from 'express';
import { connectDB } from './config/db';
import { setUserRoutes } from './routes/userRoutes';
import morgan from 'morgan';
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();

setUserRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});