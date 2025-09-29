import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import memberRoutes from "./routes/member.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Default route
app.get("/", (req, res) => {
  res.send("✅ Gym Backend is running! Use /members to access the API.");
});

// Mount members API
app.use("/members", memberRoutes);

// Use Render/Heroku port or fallback to 3000 locally
const PORT = process.env.PORT || 3000;

// Connect MongoDB and start server
mongoose
  .connect("mongodb+srv://sivakumar:siva@cluster0.ufpyq.mongodb.net/gymdb")
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error(err));
