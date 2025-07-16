import e from "express";
import cors from  'cors'
import dotenv from "dotenv";
import mongoose from "mongoose";
import compression from "compression";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => console.log("MongoDb is connected"))
.catch((err) => console.log(err));

const app = e();

app.use(e.json());
app.use(cors());
app.use(compression())
app.use(cookieParser())

app.listen(3000, () => {
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
