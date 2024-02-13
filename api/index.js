import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieparser from "cookie-parser";
import jwt from "jsonwebtoken";
import User from "./models/users.js";
import bcrypt from "bcrypt";

const app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  }); // connect to the database

app.use(express.json()); // it will parse the incoming request body into JSON
app.use(cookieparser()); // cookie parser middleware to parse incoming cookies from the request headers
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
); // cors middleware to allow cross-origin requests from the client

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  const { userName, password } = req.body;
  // console.log({ userName, password });
  const isPresent = await User.findOne({ userName });
  if (isPresent) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ userName, password: hashedPassword });

  const token = jwt.sign({ userName }, "secret");
  // console.log(token);

  res.cookie("token", token).json({ success: true, userName });
});

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ userName }, "secret");
  res.cookie("token", token).json({ success: true, userName });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json({ message: "Logged out successfully" });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
