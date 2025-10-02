import express from "express";
import { validationResult } from "express-validator";

import Record from "../models/Record.js";
import auth from "../middleware/auth.js";
import { recordValidation } from "../utils/validators.js";

const router = express.Router();

// GET all records for the user
router.get("/", auth, async (req, res) => {
  try {
    const records = await Record.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// CREATE a new record
router.post("/", auth, recordValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { name, email, phone, age, father } = req.body;
    const rec = new Record({
      name,
      email,
      phone,
      age,
      father,
      owner: req.user.id,
    });
    await rec.save();
    res.status(201).json(rec);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// GET single record by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const rec = await Record.findById(req.params.id);
    if (!rec) return res.status(404).json({ message: "Record not found" });
    if (rec.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Access denied" });
    res.json(rec);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// UPDATE record
router.put("/:id", auth, recordValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const rec = await Record.findById(req.params.id);
    if (!rec) return res.status(404).json({ message: "Record not found" });
    if (rec.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Access denied" });

    const { name, email, phone, age, father } = req.body;
    rec.name = name;
    rec.email = email;
    rec.phone = phone;
    rec.age = age;
    rec.father = father;
    await rec.save();
    res.json(rec);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// DELETE record
router.delete("/:id", auth, async (req, res) => {
  try {
    const rec = await Record.findById(req.params.id);
    if (!rec) return res.status(404).json({ message: "Record not found" });

    // Ensure only the owner can delete
    if (rec.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Access denied" });

    // ✅ Use deleteOne instead of remove
    await rec.deleteOne();

    res.json({ message: "Record removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// DELETE multiple records
router.post("/delete-multiple", auth, async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0)
      return res.status(400).json({ message: "ids array required" });

    const resDelete = await Record.deleteMany({
      _id: { $in: ids },
      owner: req.user.id,
    });
    res.json({ deletedCount: resDelete.deletedCount });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// ✅ ESM export
export default router;
