import express from "express";
import routes from "./routes/index.js";
import errorHandler from "./middleware/error.middleware.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Rent & Flatmate Finder API is running",
  });
});

app.use(errorHandler);

export default app;