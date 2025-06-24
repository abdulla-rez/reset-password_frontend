import { 
  Box, 
  Button, 
  TextField, 
  Alert, 
  Typography, 
  Paper, 
  Container,
  Fade,
  CircularProgress
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { signupAPI } from '../services/allAPI';
import type { SignupData } from '../types/Interface';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

export default function SignupForm() {
  const [data, setData] = useState<SignupData>({ name: '', email: '', password: '' });
  const [confirm, setConfirm] = useState('');
  const [alert, setAlert] = useState<{ type: 'error'|'success'; message: string } | null>();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handle = async () => {
    if (data.password !== confirm) {
      setAlert({ type: 'error', message: "Passwords don't match" });
      return;
    }
    setLoading(true);
    try {
      await signupAPI(data);
      setAlert({ type: 'success', message: 'Registered! Redirecting to login...' });
      setData({ name: '', email: '', password: '' });
      setConfirm('');
      setTimeout(() => navigate('/login'), 1500);
    } catch (e: any) {
      setAlert({ type: 'error', message: e.response?.data?.message || 'Signup failed' });
      setData({ name: '', email: '', password: '' });
      setConfirm('')
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
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
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
            }}>
              <Typography variant="h4" gutterBottom sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3
              }}>
                Welcome Back!
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                You're already logged in. Ready to continue your journey?
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/dashboard')}
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 3,
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Go to Dashboard
              </Button>
            </Paper>
          </Fade>
        </Container>
      </Box>
    );
  }

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
                <PersonAddIcon sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography variant="h3" gutterBottom sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Create Account
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Join us today and start your amazing journey
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
                label="Full Name" 
                value={data.name} 
                onChange={e => setData({ ...data, name: e.target.value })} 
                fullWidth
                variant="outlined"
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
              <TextField 
                label="Email Address" 
                type="email" 
                value={data.email} 
                onChange={e => setData({ ...data, email: e.target.value })} 
                fullWidth
                variant="outlined"
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
              <TextField 
                label="Password" 
                type="password" 
                value={data.password} 
                onChange={e => setData({ ...data, password: e.target.value })} 
                fullWidth
                variant="outlined"
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
              <TextField 
                label="Confirm Password" 
                type="password" 
                value={confirm} 
                onChange={e => setConfirm(e.target.value)} 
                fullWidth
                variant="outlined"
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
                disabled={loading}
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
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  Already have an account?
                </Typography>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    px: 3,
                    py: 1,
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)',
                      borderColor: 'primary.dark',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Sign In Instead
                </Button>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}