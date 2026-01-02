import mongoose from 'mongoose'

const signupSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  interest: {
    type: String,
    enum: ['comics', 'movies', 'series', 'general'],
    default: 'general',
  },
  verificationCode: String,
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Signup', signupSchema)
