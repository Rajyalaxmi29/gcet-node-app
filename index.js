import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import todoRouter from "./routes/todoRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// const DBUSER = encodeURIComponent(process.env.DBUSER);
// const DBPASS = encodeURIComponent(process.env.DBPASS);
// const MONGODB_URI = `mongodb+srv://${DBUSER}:${DBPASS}cluster0.h09ht.mongodb.net/gcet?retryWrites=true&w=majority&appName=Cluster0


const MONGODB_URI=process.env.MONGODB_URI 


app.use("/users", userRouter);

app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/todo", todoRouter);

// app.listen(8080, () => {
//   mongoose.connect(`${MONGODB_URI}`);
//   console.log("Server Started");
// });
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(8080, () => {
      console.log("Server Started on port 8080");
    });
  })
  .catch((error) => {
    console.log(error);
  });