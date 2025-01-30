import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { authRouter } from './routes/users.js';
import cors from 'cors';
import { roleRouter } from './routes/role.js';
dotenv.config();

const app = express();
app.use(express.json());

// view engine setup
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/api/auth', authRouter)
app.use('/api/role', roleRouter)

app.use('/*', (req, res) => {
  res.end('Happy Hacking!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started at: http://localhost:${PORT}`)
  connectDB()
});