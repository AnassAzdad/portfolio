const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Database
const db = new sqlite3.Database("./events.db");
db.run("CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY, date TEXT, title TEXT)");

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jouwmail@gmail.com",
    pass: "jouw-app-password", 
  },
});

// Nieuwe afspraak
app.post("/events", (req, res) => {
  const { date, title, email } = req.body;
  db.run("INSERT INTO events (date, title) VALUES (?, ?)", [date, title]);

  // Mail sturen
  transporter.sendMail({
    from: "jouwmail@gmail.com",
    to: email,
    subject: `Nieuwe afspraak: ${title}`,
    text: `Afspraak gepland op ${date}: ${title}`,
  });

  res.json({ success: true });
});

// Ophalen afspraken
app.get("/events", (req, res) => {
  db.all("SELECT * FROM events", [], (err, rows) => {
    res.json(rows);
  });
});

app.listen(5000, () => console.log("Server draait op http://localhost:5000"));
