import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const SHEETS_API = "https://script.google.com/macros/s/AKfycbysVEwNJJs_CvEijTii2QavZM4ahfECpe58XU9RhzH3qXV1mxrQQCYnFW5en-PWOo6yYg/exec";

// Proxy GET -> Google Apps Script (lee totales de reacciones)
app.get("/reacciones", async (req, res) => {
  try {
    const r = await fetch(SHEETS_API);
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Sheets GET failed", detail: String(e) });
  }
});

// Proxy POST -> Google Apps Script (suma una reacción)
app.post("/reacciones", async (req, res) => {
  try {
    const r = await fetch(SHEETS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Sheets POST failed", detail: String(e) });
  }
});

export default app;
