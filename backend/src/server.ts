import app from './app'

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Zivah backend server is running!`)
  console.log(`📍 Port: ${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV}`)
  console.log(`🌐 Health check: http://localhost:${PORT}/health`)
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`)
  console.log(`💪 Ready to help you get your life together!`)
})