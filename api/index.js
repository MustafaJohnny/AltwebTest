import e from "express";
import path from 'path';
import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from 'url';
import compression from "compression";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

const __dirname = path.dirname(__filename);
const __filename = fileURLToPath(import.meta.url);

if (process.env.NODE_ENV === 'production') {
  app.use(e.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => console.log("MongoDb is connected"))
.catch((err) => console.log(err));

const app = e();

app.use(e.json());
app.use(cookieParser())
app.use(compression())

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
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
