const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.get("/", (req, res) => {
    console.log("GET /", PORT);
    res.json({
        service: "nodejs-api",
        version: process.env.APP_VERSION || "local",
        environment: NODE_ENV,
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`API running on port ${PORT}`);
});
