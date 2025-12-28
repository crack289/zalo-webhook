const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// Webhook Zalo
app.post("/zalo/webhook", (req, res) => {
    console.log("Zalo gửi về:", JSON.stringify(req.body, null, 2));
    res.status(200).send("OK");
});

// Route test
app.get("/", (req, res) => {
    res.send("Zalo Webhook Running");
});

// Render dùng PORT môi trường
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
