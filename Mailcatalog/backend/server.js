const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Home Route
app.get("/", (req, res) => {
  res.send("MailCatalog Backend Running");
});

// Gmail Login Route
app.get("/auth/gmail", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/gmail.readonly",
    ],
  });

  res.redirect(url);
});

// Gmail Callback Route
app.get("/auth/callback", async (req, res) => {
  try {
    const code = req.query.code;

    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    res.send("Google Authentication Successful!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Authentication Failed");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`MailCatalog backend running on http://localhost:${PORT}`);
});