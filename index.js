const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

app.post("/api/upload", async (req, res) => {
  const { phoneNumber, imageBase64 } = req.body;

  if (!phoneNumber || !imageBase64) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const browser = await puppeteer.launch({
      headless: false, // 🔥 For debug, set true on Render
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto("https://web.whatsapp.com/", { waitUntil: "networkidle2" });

    // You would simulate login via pairing code here
    // Note: You may need to use Baileys or a cookie-based session system for actual auth

    console.log("Pairing simulated for:", phoneNumber);

    // Upload DP logic placeholder
    // e.g., Go to profile settings, click edit, upload imageBase64, confirm

    await browser.close();
    res.json({ success: true, message: "DP will be set shortly (simulated)." });

  } catch (error) {
    console.error("Puppeteer error:", error);
    res.status(500).json({ error: "Internal error" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
