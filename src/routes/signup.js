import express from 'express'
import Signup from '../models/Signup.js'
import rateLimit from 'express-rate-limit'

const router = express.Router()

// Rate limiting
const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many signups, please try again later',
})

// POST signup
router.post('/', signupLimiter, async (req, res) => {
  try {
    const { email, interest } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    // Check if already exists
    const existing = await Signup.findOne({ email: email.toLowerCase() })
    if (existing) {
      return res.status(409).json({ error: 'Email already signed up' })
    }

    const signup = new Signup({
      email: email.toLowerCase(),
      interest: interest || 'general',
    })

    await signup.save()
    res.status(201).json({ message: 'Successfully signed up', id: signup._id })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// GET all signups (admin only)
router.get('/', async (req, res) => {
  try {
    const signups = await Signup.find().sort({ createdAt: -1 })
    res.json(signups)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
