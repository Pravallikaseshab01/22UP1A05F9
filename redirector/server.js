const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let urlHistory = [];

function generateShortId() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

const SHORT_DOMAIN = `http://localhost:${PORT}`;

app.post("/shorten", (req, res) => {
  const { originalUrl, customAlias, validUntil } = req.body;
  if (!originalUrl) return res.status(400).json({ error: "originalUrl is required" });

  const shortId = customAlias || generateShortId();
  const shortUrl = `${SHORT_DOMAIN}/${shortId}`;

  // Default to 30 minutes if not provided
  const expiresAt = validUntil
    ? new Date(validUntil).toISOString()
    : new Date(Date.now() + 30 * 60 * 1000).toISOString();

  const urlData = {
    id: Date.now(),
    originalUrl,
    shortUrl,
    alias: shortId,
    createdAt: new Date().toISOString(),
    validUntil: expiresAt,
    clicks: 0,
  };

  urlHistory.push(urlData);
  res.json(urlData);
});

app.get("/history", (req, res) => {
  res.json(urlHistory);
});

app.delete("/history/:id", (req, res) => {
  const id = parseInt(req.params.id);
  urlHistory = urlHistory.filter((u) => u.id !== id);
  res.json({ success: true });
});

app.get("/:alias", (req, res) => {
  const alias = req.params.alias;
  const urlItem = urlHistory.find((u) => u.alias === alias);
  if (!urlItem) return res.status(404).send("URL not found");

  if (urlItem.validUntil && new Date(urlItem.validUntil) < new Date()) {
    return res.status(410).send("URL expired");
  }

  urlItem.clicks += 1;
  res.redirect(urlItem.originalUrl);
});

app.listen(PORT, () => console.log(`Server running at ${SHORT_DOMAIN}`));
