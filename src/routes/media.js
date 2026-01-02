import express from 'express'
import MediaItem from '../models/MediaItem.js'

const router = express.Router()

// GET all media
router.get('/', async (req, res) => {
  try {
    const { sectionKey, featured } = req.query
    const filter = {}
    
    if (sectionKey) filter.sectionKey = sectionKey
    if (featured === 'true') filter.featured = true
    
    const media = await MediaItem.find(filter).sort({ order: 1, createdAt: -1 })
    res.json(media)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET single media item
router.get('/:id', async (req, res) => {
  try {
    const media = await MediaItem.findById(req.params.id)
    if (!media) {
      return res.status(404).json({ error: 'Media not found' })
    }
    res.json(media)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST create media item
router.post('/', async (req, res) => {
  try {
    const media = new MediaItem(req.body)
    await media.save()
    res.status(201).json(media)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT update media item
router.put('/:id', async (req, res) => {
  try {
    const media = await MediaItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!media) {
      return res.status(404).json({ error: 'Media not found' })
    }
    res.json(media)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE media item
router.delete('/:id', async (req, res) => {
  try {
    const media = await MediaItem.findByIdAndDelete(req.params.id)
    if (!media) {
      return res.status(404).json({ error: 'Media not found' })
    }
    res.json({ message: 'Media deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
