import express from 'express'
import Section from '../models/Section.js'

const router = express.Router()

// GET all sections
router.get('/', async (req, res) => {
  try {
    const sections = await Section.find().sort({ createdAt: -1 })
    res.json(sections)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET single section by key
router.get('/:key', async (req, res) => {
  try {
    const section = await Section.findOne({ key: req.params.key })
    if (!section) {
      return res.status(404).json({ error: 'Section not found' })
    }
    res.json(section)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST create section (admin only)
router.post('/', async (req, res) => {
  try {
    const section = new Section(req.body)
    await section.save()
    res.status(201).json(section)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT update section
router.put('/:key', async (req, res) => {
  try {
    const section = await Section.findOneAndUpdate(
      { key: req.params.key },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    )
    if (!section) {
      return res.status(404).json({ error: 'Section not found' })
    }
    res.json(section)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default router
