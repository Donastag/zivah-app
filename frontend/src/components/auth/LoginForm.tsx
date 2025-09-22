import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  Link
} from '@mui/material'
import { useAuth } from '../../hooks/useAuth'
import { Link as RouterLink } from 'react-router-dom'

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn(email, password)

    if (!result.success) {
      setError(result.error || 'Login failed')
    }

    setLoading(false)
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={2}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h4" component="h1" textAlign="center" mb={2} color="primary">
          Hey there! 👋
        </Typography>
        
        <Typography variant="h5" textAlign="center" mb={1} color="primary">
          I'm Zivah
        </Typography>
        
        <Typography variant="body1" textAlign="center" mb={3} color="text.secondary">
          Your sassy AI assistant is ready to get your life together! Let's go!
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            margin="normal"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Let\'s Do This! 🚀'}
          </Button>
          
          <Box textAlign="center">
            <Link component={RouterLink} to="/signup">
              New here? Let's get you set up!
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
