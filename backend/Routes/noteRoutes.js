const express = require("express");
const router = express.Router();
const noteController = require("../Controllers/noteControllers");

router.get("/", noteController.getNotes);
router.post("/", noteController.addNote);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

module.exports = router;
