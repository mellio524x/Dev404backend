import mongoose from 'mongoose'

const sectionSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    enum: ['music', 'videos', 'comics', 'movies', 'series'],
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ['live', 'comingSoon'],
    default: 'comingSoon',
  },
  heroText: String,
  themeVariant: {
    type: String,
    default: 'default',
  },
  icon: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Section', sectionSchema)
