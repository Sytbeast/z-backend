const express = require("express");
const Note = require("../models/Note");
const auth = require("../middleware/auth");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  res.json(await Note.find().sort({ createdAt: -1 }));
});

router.post("/", auth, upload.single("file"), async (req, res) => {
  await Note.create({
    title: req.body.title,
    subject: req.body.subject,
    file: req.file.filename
  });
  res.json({ message: "Note added" });
});

router.put("/:id", auth, upload.single("file"), async (req, res) => {
  const updateData = {
    title: req.body.title,
    subject: req.body.subject,
  };

  if (req.file) {
    updateData.file = req.file.filename;
  }

  await Note.findByIdAndUpdate(req.params.id, updateData);
  res.json({ message: "Note updated" });
});




router.delete("/:id", auth, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

module.exports = router;
