import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import hpp from 'hpp'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import sectionsRouter from './routes/sections.js'
import mediaRouter from './routes/media.js'
import contactRouter from './routes/contact.js'
import signupRouter from './routes/signup.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const isProduction = process.env.NODE_ENV === 'production'

// Security Middleware

// 1. Helmet - Sets various HTTP headers for security
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false, // Allow YouTube embeds
}))

// 2. CORS - Controlled cross-origin resource sharing
const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',') 
  : ['http://localhost:5173', 'http://localhost:5174']

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.indexOf(origin) !== -1 || !isProduction) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// 3. Body parsing with size limits
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))

// 4. Data sanitization against NoSQL injection
app.use(mongoSanitize())

// 5. Data sanitization against XSS
app.use(xss())

// 6. Prevent parameter pollution
app.use(hpp())

// 7. Compression
app.use(compression())

// 8. Rate Limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api/', limiter)

// Stricter rate limiting for contact/signup forms
const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per hour
  message: 'Too many submissions, please try again later.',
})

// MongoDB Connection with security options
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dev-404', {
  // Security and connection options
  retryWrites: true,
  w: 'majority',
})
  .then(() => console.log('✓ Connected to MongoDB'))
  .catch(err => {
    console.error('✗ MongoDB connection failed:', err)
    process.exit(1)
  })

// Mongoose connection error handling
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err)
})

// Trust proxy (important for rate limiting behind reverse proxy)
if (isProduction) {
  app.set('trust proxy', 1)
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() })
})

// Routes
app.use('/sections', sectionsRouter)
app.use('/media', mediaRouter)
app.use('/contact', strictLimiter, contactRouter)
app.use('/signup', strictLimiter, signupRouter)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════╗
║     DEV 404 Backend Running        ║
║     http://localhost:${PORT}       ║
╚════════════════════════════════════╝
  `)
})
