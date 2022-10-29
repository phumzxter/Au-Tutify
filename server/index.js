import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import tutorRoutes from "./routes/tutor-routers.js";
import tuteeRoutes from "./routes/tutee-routers.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Tutor from "./models/tutor.js";
import Tutee from "./models/tutee.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/tutor", tutorRoutes);
app.use("/tutee", tuteeRoutes);

app.get("/", (req, res) => {
  res.send("Hello to Memories API");
});

const PORT = process.env.PORT || 1001;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
