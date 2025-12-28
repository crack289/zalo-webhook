const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// 🔑 DÁN ACCESS TOKEN OA CỦA BẠN VÀO ĐÂY
const ZALO_OA_ACCESS_TOKEN = "3825177517802329444:cimmUnNnISwrIQIpFRXNvdcYjUILnJfgfBLVyFLuqFszmGAVEczrNXcxaWkeapar";

// Webhook Zalo
app.post("/zalo/webhook", async (req, res) => {
    try {
        console.log("Zalo gửi về:", JSON.stringify(req.body, null, 2));

        const event = req.body.event_name;

        // ✅ ĐÚNG EVENT NAME THEO LOG
        if (event === "message.text.received") {
            const userId = req.body.message.from.id;
            const userMessage = req.body.message.text;

            const replyText = `🤖 Bot đã nhận: "${userMessage}"`;

            await axios.post(
                "https://openapi.zalo.me/v3.0/oa/message/cs",
                {
                    recipient: {
                        user_id: userId
                    },
                    message: {
                        text: replyText
                    }
                },
                {
                    headers: {
                        "access_token": ZALO_OA_ACCESS_TOKEN,
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        res.status(200).send("OK");
    } catch (err) {
        console.error("Webhook error:", err.response?.data || err.message);
        res.status(200).send("ERROR");
    }
});


// Route test
app.get("/", (req, res) => {
    res.send("Zalo Webhook Running");
});

// Render PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});

