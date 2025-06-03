import express from "express";
import mongoose from "mongoose";  
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Connect to MongoDB (use cloud MongoDB in production)
mongoose.connect("mongodb://localhost:27017/gcet", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB error:", err));

// Schemas and Models
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

// Routes
app.get("/", (req, res) => res.send("good morning"));

app.get("/greet", (req, res) => res.send("Hello World"));
app.get("/weather", (req, res) => res.send("31degrees"));

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const result = await User.create({ name, email, password });
  res.json(result);
});

app.post("/login", async (req, res) => {
  const { name, email, password } = req.body;
  const result = await User.findOne({ name, email, password });
  if (result) {
    res.json({ status: "accepted", result });
  } else {
    res.json({ status: "error", error: "Invalid credentials" });
  }
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const { name, price } = req.body;
  const result = await Product.create({ name, price });
  res.json(result);
});

// ❌ Remove app.listen()
// ✅ Instead, export the app for Vercel
export default app;
