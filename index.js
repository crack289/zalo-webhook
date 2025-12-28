const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const ZALO_OA_ACCESS_TOKEN = "3825177517802329444:cimmUnNnISwrIQIpFRXNvdcYjUILnJfgfBLVyFLuqFszmGAVEczrNXcxaWkeapar";

app.post("/zalo/webhook", async (req, res) => {
    console.log("Zalo gửi về:", JSON.stringify(req.body, null, 2));

    try {
        if (req.body.event_name === "message.text.received") {
            const userId = req.body.message.from.id;
            const userText = req.body.message.text;

            const replyText = `🤖 Bot đã nhận: "${userText}"`;

            await axios.post(
                `https://openapi.zalo.me/v3.0/oa/message/cs?access_token=${ZALO_OA_ACCESS_TOKEN}`,
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
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("✅ Đã gửi reply cho user:", userId);
        }
    } catch (err) {
        console.error("❌ Lỗi gửi tin:", err.response?.data || err.message);
    }

    // ⚠️ BẮT BUỘC trả 200 cho Zalo
    res.status(200).send("OK");
});

// Route test
app.get("/", (req, res) => {
    res.send("Zalo Webhook Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
