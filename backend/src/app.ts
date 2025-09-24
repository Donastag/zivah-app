import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// Security middleware
app.use(helmet())

// CORS configuration for Render deployment
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : ['https://your-frontend-domain.com']
  : ['http://localhost:3000', 'http://localhost:3001']

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))

// Logging
app.use(morgan('combined'))

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Zivah backend is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    port: process.env.PORT || 5000
  })
})

// Test endpoint
app.get('/api/test', (req: Request, res: Response) => {
  res.json({
    message: 'Hey there! Zivah backend is working perfectly! 🚀',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  })
})

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Zivah Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      test: '/api/test'
    }
  })
})

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  })
})

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Global error handler:', err)
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  })
})

export default app
