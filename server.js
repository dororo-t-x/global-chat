import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Ensure messages.json exists
if (!fs.existsSync("./data/messages.json")) {
  fs.writeFileSync("./data/messages.json", "[]");
}

// Get all messages
app.get("/api/messages", (req, res) => {
  const data = fs.readFileSync("./data/messages.json");
  res.json(JSON.parse(data));
});

// Post a new message
app.post("/api/messages", (req, res) => {
  const { username, text } = req.body;

  if (!username || !text) {
    return res.status(400).json({ error: "Username and message required" });
  }

  const data = JSON.parse(fs.readFileSync("./data/messages.json"));
  const newMessage = { username, text, time: new Date().toISOString() };

  data.push(newMessage);

  fs.writeFileSync("./data/messages.json", JSON.stringify(data, null, 2));
  res.json({ success: true, message: newMessage });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
