const express = require("express");
const cors = require("cors");
require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Alitas Express API Running" });
});

app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});