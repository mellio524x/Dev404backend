import express from 'express'
import Contact from '../models/Contact.js'
import rateLimit from 'express-rate-limit'

const router = express.Router()

// Rate limiting
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many contact requests, please try again later',
})

// POST contact form
router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const contact = new Contact({
      name,
      email,
      subject,
      message,
    })

    await contact.save()
    res.status(201).json({ message: 'Contact form submitted', id: contact._id })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// GET all contacts (admin only)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json(contacts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
