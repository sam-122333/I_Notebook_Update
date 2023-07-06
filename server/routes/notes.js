const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Notes = require("../models/Notes");

// ROUTE 1 :get all the notes using :GET "/api/auth/fetchallnotes" Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

// ROUTE 2 :Add a new notes using :POST "/api/auth/addnote" Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "please enter minimum 3 character").isLength({ min: 3 }),
    body("description", "please enter minimum 3 character").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(402).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      const note = await Notes.create({
        title,
        description,
        tag,
        user: req.user.id,
      });
      res.json(note);
    } catch (error) {
      res
        .status(404)
        .json({ error: "internal server error", message: error.message });
    }
  }
);

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
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
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
    // finding the note for delete.
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    //verifying the user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allow");
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
