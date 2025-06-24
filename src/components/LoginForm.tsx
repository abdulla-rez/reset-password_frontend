import { 
  Box, 
  Button, 
  TextField, 
  Alert, 
  Link, 
  Typography, 
  Paper, 
  Container,
  Fade,
  CircularProgress
} from '@mui/material';
import { useState, useEffect } from 'react';
import { loginAPI } from '../services/allAPI';
import type { LoginData } from '../types/Interface';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function LoginForm() {
  const [data, setData] = useState<LoginData>({ email: '', password: '' });
  const [alert, setAlert] = useState<{ type: 'error'|'success'; message: string } | null>();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handle = async () => {
    setLoading(true);
    try {
      const res = await loginAPI(data);
      localStorage.setItem('token', res.data.token);
      setAlert({ type: 'success', message: 'Logged in!' });
      setTimeout(() => navigate('/dashboard'), 500);
    } catch (e:any) {
      setAlert({ type: 'error', message: e.response?.data?.message || 'Login failed' });
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
                You're already logged in. Ready to continue?
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
                <LoginIcon sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography variant="h3" gutterBottom sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Welcome Back
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Sign in to continue your journey with us
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
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Link 
                  component={RouterLink} 
                  to="/forgot-password" 
                  sx={{ 
                    color: 'primary.main',
                    textDecoration: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  Don't have an account?
                </Typography>
                <Button
                  component={RouterLink}
                  to="/"
                  variant="outlined"
                  startIcon={<PersonAddIcon />}
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
                  Create Account
                </Button>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}