const express = require("express");
const mysql = require("mysql");

const app = express();
const PORT = process.env.PORT || 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shantanu1",
  database: "react",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.use(express.json());

app.post("/api/todos", (req, res) => {
  const { value } = req.body;

  if (!value) {
    return res.status(400).json({ error: "Value cannot be empty" });
  }

  const sql = "INSERT INTO todos (value) VALUES (?)";
  db.query(sql, [value], (err, result) => {
    if (err) {
      console.error("Error inserting into database:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Todo added successfully" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
