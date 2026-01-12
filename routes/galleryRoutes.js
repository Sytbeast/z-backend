const express = require("express");
const Gallery = require("../models/Gallery");
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
  const { category } = req.query;
  const data = category
    ? await Gallery.find({ category })
    : await Gallery.find();
  res.json(data);
});

router.post("/", auth, upload.single("image"), async (req, res) => {
  await Gallery.create({
    title: req.body.title,
    category: req.body.category,
    image: req.file.filename
  });
  res.json({ message: "Image uploaded" });
});

router.delete("/:id", auth, async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ message: "Image deleted" });
});

module.exports = router;
