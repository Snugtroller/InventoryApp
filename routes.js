const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3000;

// MySQL database connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "SmeIsTheBest26",
  database: "ngo",
});

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request body

// Route to handle POST request to save QR code to database
app.post("/save-qr", (req, res) => {
  const qrText = req.body.qrText;
  if (!qrText) {
    return res
      .status(400)
      .json({ error: true, message: "QR Text is required" });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection failed:", err.stack);
      return res
        .status(500)
        .json({ error: true, message: "Database connection failed" });
    }

    const insertQuery = "INSERT INTO qr_code (ID, date_time) VALUES (?, NOW())";
    connection.query(insertQuery, [qrText], (error, results, fields) => {
      connection.release(); // Release connection

      if (error) {
        console.error("Failed to insert data:", error);
        return res
          .status(500)
          .json({ error: true, message: "Failed to insert data" });
      }

      res.json({
        error: false,
        message: "QR code has been saved successfully.",
        data: results,
      });
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
