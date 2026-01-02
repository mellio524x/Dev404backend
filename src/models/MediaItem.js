import mongoose from 'mongoose'

const mediaItemSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['youtube_video', 'youtube_playlist'],
  },
  sectionKey: {
    type: String,
    required: true,
    enum: ['music', 'videos', 'comics', 'movies', 'series'],
  },
  title: {
    type: String,
    required: true,
  },
  youtubeId: String,
  playlistId: String,
  description: String,
  tags: [String],
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  thumbnail: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('MediaItem', mediaItemSchema)
