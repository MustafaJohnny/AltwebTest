import e from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import compression from "compression";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors"; // Add this at the top with other imports

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => console.log("MongoDb is connected"))
.catch((err) => console.log(err));

const app = e();
const corsOptions = {
  origin: [
    'https://altwebtest-1.onrender.com', 
    'http://localhost:5173' // For local development
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions)); // Add this before other middleware

app.use(e.json());
app.use(cookieParser())
app.use(compression())

const port = process.env.PORT ?? 3000;

app.listen(port, '0.0.0.0', () => {
  console.log("server is running on port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
