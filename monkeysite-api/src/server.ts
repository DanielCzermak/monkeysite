import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db';
import seedDB from './db/seed';
import cors from "cors";
import routes from './routes';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app: Application = express();

app.use(cors());

// Body parser
app.use(express.json());

// Mount routers
app.use('/monkeys', routes);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  seedDB();
});