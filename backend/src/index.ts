import express, { Express } from "express";
import dotenv from 'dotenv';
import connectToDatabase from "./database";
import loanRoutes from "./routes/Loan";
import cors from 'cors';

dotenv.config();

const app: Express = express();
app.use(express.json());
// Configure CORS options
const corsOptions = {
  origin: "https://credit-sea-assignment-three.vercel.app", // Allow only this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
  credentials: true, // Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions)); // Use CORS with specified options

app.use('/api', loanRoutes);

// Use the PORT from environment variables or default to 4000
const PORT = process.env.PORT || 4500;

// Connect to MongoDB
connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
