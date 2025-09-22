import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:3000'],
  credentials: true
}))

// Logging
app.use(morgan('combined'))

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Zivah backend is running!',
    timestamp: new Date().toISOString() 
  })
})

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Hey there! Zivah backend is working perfectly! 🚀',
    timestamp: new Date().toISOString()
  })
})

export default app