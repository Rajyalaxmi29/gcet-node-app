const express = require('express');
const cors = require('cors');
const app = express();

// Allow CORS from your frontend domain
app.use(cors({
  origin: 'https://gcet-react-bm6lwg64b-rajyalaxmis-projects-2681107e.vercel.app'
}));

// OR to allow from all origins (not recommended for production)
app.use(cors());

// other routes
app.get('/products', (req, res) => {
  res.json([...]);
});


/*import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.listen(8080, () => console.log("hi"));

app.get("/", (req, res) => res.send("Hello World"));
app.get("/weather", (req, res) => res.send("31degrees"));

app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Smartphone", price: 20000 },
    { id: 3, name: "Headphones", price: 3000 }
  ]);
});

/*import express from "express";
import cors from "cors";
const app = express();
app.listen(8080, () => {
  console.log("Server Started on port 8080");
});

app.use(express.json());
app.use(cors());
const users = [];

app.get("/", (req, res) => {
  return res.json(users);
});

app.post("/register", (req, res) => {
  const { name, email, pass } = req.body;
  users.push({ name, email, pass });
  return res.json(users);
});

app.post("/login", (req, res) => {
  const { email, pass } = req.body;
  const found = users.find(
    (value) => value.email === email && value.pass === pass
  );
  if (!found) {
    res.json({message:"User not found"})
  }
  res.json({...found,token:"123"});
});*/