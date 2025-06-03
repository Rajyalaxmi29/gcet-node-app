import express from "express";
import mongoose from "mongoose";  
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/gcet")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Error:", err));

// SCHEMAS
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number
});

// MODELS
const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

// ROUTES
app.get("/", (req, res) => res.send("good morning"));

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const result = await User.create({ name, email, password });
  res.json(result);
});

app.post("/login", async (req, res) => {
  const { name, email, password } = req.body;
  const result = await User.findOne({ name, email, password });
  if (result) {
    return res.json({ status: "accepted", result });
  } else {
    return res.json({ status: "error", error: "Invalid credentials" });
  }
});

// ✅ View products — now as a GET route
app.get("/products", async (req, res) => {
  const allProducts = await Product.find();
  res.json(allProducts);
});

// ✅ Optional: Add new product
app.post("/products", async (req, res) => {
  const { name, price } = req.body;
  const result = await Product.create({ name, price });
  res.json(result);
});

app.get("/greet", (req, res) => res.send("Hello World"));
app.get("/weather", (req, res) => res.send("31degrees"));

// Start server (Note: this port won't matter on Vercel)
app.listen(8080, () => {
  console.log("Server running");
});
