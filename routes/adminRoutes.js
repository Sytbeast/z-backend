const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // console.log(process.env.ADMIN_USERNAME)
  // console.log(process.env.ADMIN_PASSWORD)

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    return res.status(200).json({
      message: "Login successful",
      token: token
    });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
