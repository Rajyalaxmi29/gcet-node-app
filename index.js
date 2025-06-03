import express from "express";
import mongoose from "mongoose";  
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.listen(8080, () => {
  mongoose
    .connect("mongodb://localhost:27017/gcet");
  console.log("hi");

});
const userSchema = new mongoose.Schema({
  name: {type:String},
 email: {type:String},
  password: {type:String},
  
});
const user = mongoose.model("User",userSchema);

app.get("/", async(req, res) => res.send("good morning"));

app.post("/register", async (req, res) => {

  const {name,email,password} = req.body;

  const result=await user.insertOne({name:name,email:email,password:password});
  
  return res.json(result);
});

app.post("/login", async (req, res) => {
  const {name,email,password} = req.body;

  const result = await user.findOne({ name:name,email: email, password: password });
  if (result) {
    return res.json({  status:"accepted",result });
  } else {
    return res.json({ status: "error", error: "Invalid credentials" });
  }
});

app.post("/products", async (req, res) => {
  const {name,price} = req.body;

  const result = await user.insertOne({ name:name,price:price});
  return res.json(result);
});


app.get("/greet", (req, res) => res.send("Hello World"));

app.get("/weather", (req, res) => res.send("31degrees"));

app.get("/product", (req, res) => {
  res.json([
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Smartphone", price: 20000 },
    { id: 3, name: "Headphones", price: 3000 }
  ]);
});