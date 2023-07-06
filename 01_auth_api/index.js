import express from 'express';
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use("/auth", authRouter)
app.use(userRouter)

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
   } catch (e) {
    console.log(e);
  }
};

start();
