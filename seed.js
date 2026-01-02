/**
 * Seed Script for DEV 404 Database
 * Run with: node seed.js
 * 
 * This populates the database with initial sections data
 */

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Section from './src/models/Section.js'
import MediaItem from './src/models/MediaItem.js'

dotenv.config()

const sections = [
  {
    key: 'music',
    title: 'Music',
    description: 'Soundtrack for the system breach.',
    status: 'live',
    heroText: '♪ Signal detected in the frequencies.',
    icon: '♪',
  },
  {
    key: 'videos',
    title: 'Videos',
    description: 'Footage recovered from the noise.',
    status: 'live',
    heroText: '▶ Playback initiated.',
    icon: '▶',
  },
  {
    key: 'comics',
    title: 'Comics',
    description: 'Encrypted. Pending decryption.',
    status: 'comingSoon',
    heroText: '◊ The stories exist. They\'re just encrypted right now.',
    icon: '◊',
  },
  {
    key: 'movies',
    title: 'Movies',
    description: 'Encrypted. Pending decryption.',
    status: 'comingSoon',
    heroText: '▬ Reality is being rewritten.',
    icon: '▬',
  },
  {
    key: 'series',
    title: 'Series',
    description: 'Encrypted. Pending decryption.',
    status: 'comingSoon',
    heroText: '∞ The narrative continues beyond the code.',
    icon: '∞',
  },
]

const mediaItems = [
  // Music section - Featured
  {
    type: 'youtube_playlist',
    sectionKey: 'music',
    title: 'Hello, World!',
    playlistId: 'OLAK5uy_na3MhE_Q3ushYs7n20lXVeBEf09pY69qo',
    description: 'The first transmission. Initial contact established.',
    tags: ['featured', 'album'],
    featured: true,
    order: 1,
  },
  // Music section - Other albums
  {
    type: 'youtube_playlist',
    sectionKey: 'music',
    title: 'BROKEN',
    playlistId: 'OLAK5uy_nXeKfg375hfgChn3aMNG9Kd49g1U8YL0g',
    description: 'Shattered frequencies. Fragmented signals.',
    tags: ['album'],
    featured: false,
    order: 2,
  },
  {
    type: 'youtube_playlist',
    sectionKey: 'music',
    title: 'Fractured Horizons',
    playlistId: 'OLAK5uy_mMAopvO3gpyJ5M143_JGK7WGzctI-vm2M',
    description: 'Reality breaking at the edges.',
    tags: ['album'],
    featured: false,
    order: 3,
  },
  {
    type: 'youtube_playlist',
    sectionKey: 'music',
    title: 'Movies Lies War',
    playlistId: 'OLAK5uy_lMK0hBiLJV0G1QpwIdeheOM78QL19TI4Y',
    description: 'The narrative unfolds. Truth detected.',
    tags: ['album'],
    featured: false,
    order: 4,
  },
  {
    type: 'youtube_playlist',
    sectionKey: 'music',
    title: 'Eviction Notice',
    playlistId: 'OLAK5uy_lMLAx0P1MstSztk7LLSNmQCwphlUyN6R0',
    description: 'The final transmission. System override complete.',
    tags: ['album'],
    featured: false,
    order: 5,
  },
  // Videos section
  {
    type: 'youtube_video',
    sectionKey: 'videos',
    title: 'Heirloom Of Fire',
    youtubeId: 'szuMdzyHrWk',
    description: 'Legacy burning bright.',
    tags: ['featured', 'video'],
    featured: true,
    order: 1,
  },
  {
    type: 'youtube_video',
    sectionKey: 'videos',
    title: 'Lucid Lies',
    youtubeId: '4mbQvgkJ53s',
    description: 'Dreams and deception.',
    tags: ['video'],
    featured: false,
    order: 2,
  },
  {
    type: 'youtube_video',
    sectionKey: 'videos',
    title: 'Don\'t Let Me Close My Eyes',
    youtubeId: 'PTG5f5pc_tY',
    description: 'Stay awake. Stay alert.',
    tags: ['video'],
    featured: false,
    order: 3,
  },
  {
    type: 'youtube_video',
    sectionKey: 'videos',
    title: 'Breadcrumbs I The Static',
    youtubeId: 'VX8orrpoGVc',
    description: 'Following the trail.',
    tags: ['video'],
    featured: false,
    order: 4,
  },
  {
    type: 'youtube_video',
    sectionKey: 'videos',
    title: '28;06:42:12',
    youtubeId: 'nGgCw4msDG8',
    description: 'Time stamp. Code complete.',
    tags: ['video'],
    featured: false,
    order: 5,
  },
  {
    type: 'youtube_video',
    sectionKey: 'videos',
    title: 'Hello, World!',
    youtubeId: '00-_LcpNSWM',
    description: 'First transmission visual.',
    tags: ['video'],
    featured: false,
    order: 6,
  },
  {
    type: 'youtube_video',
    sectionKey: 'videos',
    title: 'Race Against Time',
    youtubeId: 'VqVkf0COL1w',
    description: 'The clock is ticking.',
    tags: ['video'],
    featured: false,
    order: 7,
  },
  {
    type: 'youtube_video',
    sectionKey: 'videos',
    title: 'Part Through Time',
    youtubeId: 'c7kxOS2wh9Q',
    description: 'Temporal displacement.',
    tags: ['video'],
    featured: false,
    order: 8,
  },
  {
    type: 'youtube_video',
    sectionKey: 'videos',
    title: 'Don\'t Blink',
    youtubeId: '9R3sYBrbsRY',
    description: 'You might miss it.',
    tags: ['video'],
    featured: false,
    order: 9,
  },
  {
    type: 'youtube_video',
    sectionKey: 'videos',
    title: 'Pull The Plug',
    youtubeId: '6uOrPmM0gBg',
    description: 'Disconnect. Unplug.',
    tags: ['video'],
    featured: false,
    order: 10,
  },
  {
    type: 'youtube_video',
    sectionKey: 'videos',
    title: 'Us vs. Them',
    youtubeId: '4w_WfXl_pbE',
    description: 'The line is drawn.',
    tags: ['video'],
    featured: false,
    order: 11,
  },
  {
    type: 'youtube_video',
    sectionKey: 'videos',
    title: 'Crimson Tide',
    youtubeId: 'r-0mfF3UUoQ',
    description: 'Red signal rising.',
    tags: ['video'],
    featured: false,
    order: 12,
  },
  {
    type: 'youtube_video',
    sectionKey: 'videos',
    title: 'Cracks In The Pavement',
    youtubeId: 'tYfNWMa8MU0',
    description: 'Foundation breaking.',
    tags: ['video'],
    featured: false,
    order: 13,
  },
  {
    type: 'youtube_video',
    sectionKey: 'videos',
    title: 'The Marionette\'s Waltz',
    youtubeId: 'Yq0oQYQhIf4',
    description: 'Dancing to the strings.',
    tags: ['video'],
    featured: false,
    order: 14,
  },
  {
    type: 'youtube_video',
    sectionKey: 'videos',
    title: 'J.Orlando',
    youtubeId: 'HaDqMIJ372o',
    description: 'Character study.',
    tags: ['video'],
    featured: false,
    order: 15,
  },
  {
    type: 'youtube_video',
    sectionKey: 'videos',
    title: 'One Man Army',
    youtubeId: 'SRaCKCnWpGM',
    description: 'Solo. Unstoppable.',
    tags: ['video'],
    featured: false,
    order: 16,
  },
  {
    type: 'youtube_video',
    sectionKey: 'videos',
    title: 'Dial Up Diva',
    youtubeId: 'qmKcBN-lAqw',
    description: 'Retro transmission.',
    tags: ['video'],
    featured: false,
    order: 17,
  },
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dev-404')
    console.log('✓ Connected to MongoDB')

    // Clear existing data
    await Section.deleteMany({})
    await MediaItem.deleteMany({})
    console.log('✓ Cleared existing data')

    // Insert sections
    const insertedSections = await Section.insertMany(sections)
    console.log(`✓ Added ${insertedSections.length} sections`)

    // Insert media items
    const insertedMedia = await MediaItem.insertMany(mediaItems)
    console.log(`✓ Added ${insertedMedia.length} media items`)

    console.log('\n✓ Database seeded successfully!')
    process.exit(0)
  } catch (err) {
    console.error('✗ Seed failed:', err.message)
    process.exit(1)
  }
}

seed()
