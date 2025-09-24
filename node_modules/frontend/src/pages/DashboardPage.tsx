import React from 'react'
import { Box, Typography, Button, Paper, Container, Stack } from '@mui/material'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export const DashboardPage: React.FC = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Paper sx={{ p: 4, textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" mb={2} color="primary">
            Well, well, well... Look who made it!
          </Typography>
          
          <Typography variant="h5" mb={3} color="text.secondary">
            Hey {user?.user_metadata?.full_name || user?.email?.split('@')[0]}!
          </Typography>
          
          <Typography variant="body1" mb={4} sx={{ maxWidth: 600, mx: 'auto' }}>
            Welcome to your dashboard! I'm Zivah, and I'm about to become your favorite 
            (and most brutally honest) productivity partner. Ready to get your life together? 
            Because honey, we've got WORK to do!
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
            <Box textAlign="center">
              <Button 
                variant="contained" 
                size="large" 
                color="primary"
                disabled
                sx={{ minWidth: 150, mb: 1 }}
              >
                Chat with Zivah
              </Button>
              <Typography variant="caption" display="block" color="text.secondary">
                Coming in Phase 2!
              </Typography>
            </Box>
            
            <Box textAlign="center">
              <Button 
                variant="outlined" 
                size="large"
                disabled
                sx={{ minWidth: 150, mb: 1 }}
              >
                Set Goals
              </Button>
              <Typography variant="caption" display="block" color="text.secondary">
                Coming soon!
              </Typography>
            </Box>
            
            <Box textAlign="center">
              <Button 
                variant="outlined" 
                size="large"
                disabled
                sx={{ minWidth: 150, mb: 1 }}
              >
                Track Finances
              </Button>
              <Typography variant="caption" display="block" color="text.secondary">
                Coming soon!
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" mb={2}>
            Congratulations! You've completed Phase 1!
          </Typography>
          <Typography variant="body2" mb={2} color="text.secondary">
            You now have a fully functional authentication system with:
            User registration & login, Secure database storage, Professional UI design, Ready for deployment
          </Typography>
          <Button 
            onClick={handleSignOut} 
            variant="outlined" 
            color="secondary"
            sx={{ mt: 2 }}
          >
            Sign Out
          </Button>
        </Paper>
      </Box>
    </Container>
  )
}