const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Notes = require("../models/Notes");

// ROUTE 1 :get all the notes using :GET "/api/auth/fetchallnotes" Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.rootUser._id });
  res.json(notes);
});

// ROUTE 2 :Add a new notes using :POST "/api/auth/addnote" Login required
router.post("/addnote", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const note = await Notes.create({
      title,
      description,
      tag,
      user: req.userId,
    });
    res.json(note);
  } catch (error) {
    res
      .status(404)
      .json({ error: "internal server error", message: error.message });
  }
});

// ROUTE 3 :Update an existing notes using :PUT "/api/notes/updatenote" Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //creating a new object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // find the note to updated and update it
    const noteId = req.params.id;
    let note = await Notes.findById(noteId);
    // Check if the note exists
    if (!note) {
      return res.status(404).send("Note not found");
    }
    if (note.user.toString() !== req.userId) {
      return res.status(401).send("not allow");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.status(200).json(note);
  } catch (error) {
    res
      .status(404)
      .json({ error: "internal server error", message: error.message });
  }
});

// ROUTE 4 :Delete an existing notes using :DELETE "/api/notes/deletenotes" Login required

router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  try {
    // const { title, description, tag } = req.body;
    // Finding the note for delete.
    const noteId = req.params.id;
    let note = await Notes.findById(noteId);
    // Check if the note exists
    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Verifying the user
    if (note.user.toString() !== req.userId) {
      return res.status(401).send("Not allowed to delete this note");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "your note is deleted successfully", note: note });
  } catch (error) {
    res
      .status(404)
      .json({ error: "internal server error", message: error.message });
  }
});

module.exports = router;
