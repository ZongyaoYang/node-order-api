import express from "express";
import orderRoutes from "./routes/orderRoutes.js"

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Card Order API is running",
    });
});

app.use("/api/orders", orderRoutes);
export default app;