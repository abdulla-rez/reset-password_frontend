import { 
  Box, 
  Button, 
  TextField, 
  Alert, 
  Typography, 
  Paper, 
  Container,
  Fade,
  CircularProgress,
  Link
} from '@mui/material';
import { useState } from 'react';
import { requestResetAPI } from '../services/allAPI';
import type { ForgotData } from '../types/Interface';
import { Link as RouterLink } from 'react-router-dom';
import LockResetIcon from '@mui/icons-material/LockReset';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ForgotPasswordForm() {
  const [data, setData] = useState<ForgotData>({ email: '' });
  const [alert, setAlert] = useState<{ type: 'error'|'success'; message: string } | null>();
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    try {
      await requestResetAPI(data);
      setAlert({ type: 'success', message: 'Link sent if account exists.' });
      setData({email:''})
    } catch {
      setAlert({ type: 'error', message: 'Failed to send reset link.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2
    }}>
      <Container maxWidth="sm">
        <Fade in={true} timeout={800}>
          <Paper elevation={24} sx={{ 
            p: 6,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            }
          }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{ 
                display: 'inline-flex',
                p: 2,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                mb: 2
              }}>
                <LockResetIcon sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography variant="h3" gutterBottom sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Reset Password
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 400, mx: 'auto' }}>
                Enter your email address and we'll send you a link to reset your password
              </Typography>
            </Box>

            {alert && (
              <Fade in={true}>
                <Alert 
                  severity={alert.type} 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    '& .MuiAlert-icon': {
                      fontSize: '1.5rem'
                    }
                  }}
                >
                  {alert.message}
                </Alert>
              </Fade>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField 
                label="Email Address" 
                type="email" 
                value={data.email} 
                onChange={e => setData({ email: e.target.value })} 
                fullWidth
                variant="outlined"
                placeholder="Enter your email address"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                    },
                    '&.Mui-focused': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.15)',
                    }
                  }
                }}
              />
              
              <Button 
                variant="contained" 
                onClick={handle}
                disabled={loading || !data.email}
                size="large"
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                  },
                  '&:disabled': {
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    opacity: 0.7,
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Link 
                  component={RouterLink} 
                  to="/login" 
                  sx={{ 
                    color: 'primary.main',
                    textDecoration: 'none',
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  <ArrowBackIcon fontSize="small" />
                  Back to Sign In
                </Link>
              </Box>
            </Box>

            <Box sx={{ 
              mt: 4, 
              p: 3, 
              borderRadius: 2, 
              background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
              border: '1px solid rgba(102, 126, 234, 0.2)'
            }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                <strong>Security Notice:</strong> If an account with this email exists, you'll receive a password reset link within a few minutes.
              </Typography>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}