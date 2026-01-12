const express = require("express");
const Faculty = require("../models/Faculty");
const auth = require("../middleware/auth");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  res.json(await Faculty.find());
});

router.post(
  "/",
  auth,
  upload.single("image"),
  async (req, res) => {

    const faculty = await Faculty.create({
      name: req.body.name,
      designation: req.body.designation,
      qualification: req.body.qualification,
      specialization: req.body.specialization,
      image: req.file?.filename,
    });

    res.json(faculty);
  }
);

router.delete("/:id", auth, async (req, res) => {
  await Faculty.findByIdAndDelete(req.params.id);
  res.json({ message: "Faculty deleted" });
});

module.exports = router;
