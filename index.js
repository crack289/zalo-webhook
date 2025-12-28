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

        if (req.body.event_name === "message.text.received") {
            const userId = req.body.message.chat.id;
            const userMessage = req.body.message.text;

            const replyText = `🤖 Bot đã nhận: "${userMessage}"`;

            // ✅ GỬI access_token QUA QUERY STRING
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
        }

        res.status(200).send("OK");
    } catch (err) {
        console.error(
          "Send message error:",
          err.response?.data || err.message
        );
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

