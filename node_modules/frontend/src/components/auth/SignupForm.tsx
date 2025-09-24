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
import { useNavigate, Link as RouterLink } from 'react-router-dom'

export const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    const result = await signUp(email, password, fullName)
    
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error || 'Signup failed')
    }
    
    setLoading(false)
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={2}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h4" component="h1" textAlign="center" mb={2} color="primary">
          Welcome to Team Zivah! 🎊
        </Typography>
        
        <Typography variant="body1" textAlign="center" mb={3} color="text.secondary">
          Ready to get your life together? I'm about to become your favorite (and most brutally honest) productivity partner!
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            margin="normal"
          />
          
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
            helperText="Minimum 6 characters"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Join the Revolution! 💪'}
          </Button>
          
          <Box textAlign="center">
            <Link component={RouterLink} to="/login">
              Already part of the crew? Sign in
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}