import express from "express";
import mongoose from "mongoose";
import connectDB from "./mongodb/connect.js";
import * as dotenv from "dotenv";
import UserRoutes from "./routes/UserRoutes.js";
import PropertyRoutes from "./routes/PropertyRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());
app.use(
  bodyParser.raw({
    // type: 'image/png',
    limit: "50mb",
  })
);

app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello From Rently By Senior Software Engineer Rao Abdul Moiz");
});

app.use("/", UserRoutes);
app.use("/", PropertyRoutes);

const startServer = () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(5000, () =>
      console.log("Server is listening on port http://localhost:5000")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
