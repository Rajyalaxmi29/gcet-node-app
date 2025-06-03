import express from "express";
import mongoose from "mongoose";  
import cors from "cors";

const app = express();
app.use(cors());

app.listen(8080, () => {
  mongoose
    .connect("mongodb://localhost:27017/gcet");
  console.log("hi");

});
const userSchema = new mongoose.Schema({
  name: {type:String},
  
});
const user = mongoose.model("User",userSchema);

app.get("/", async(req, res) => res.send("good morning"));

app.get("/register", async (req, res) => {
  const result=await user.insertOne({name:"jonh"})
  return res.json(result);
});
app.get("/greet", (req, res) => res.send("Hello World"));

app.get("/weather", (req, res) => res.send("31degrees"));

app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Smartphone", price: 20000 },
    { id: 3, name: "Headphones", price: 3000 }
  ]);
});