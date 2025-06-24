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
  LinearProgress
} from '@mui/material';
import { useState } from 'react';
import { resetPasswordAPI } from '../services/allAPI';
import type { ResetData } from '../types/Interface';
import { useParams, useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ResetPasswordForm() {
  const { token } = useParams<{ token: string }>();
  const nav = useNavigate();

  const [data, setData] = useState<ResetData>({ password: '', confirmPassword: '' });
  const [alert, setAlert] = useState<{type:'error'|'success'; message:string}|null>();
  const [loading, setLoading] = useState(false);

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(data.password);
  const getStrengthColor = (strength: number) => {
    if (strength < 50) return 'error';
    if (strength < 75) return 'warning';
    return 'success';
  };

  const handle = async () => {
    if (data.password !== data.confirmPassword) {
      setAlert({ type:'error', message:"Passwords don't match" });
      return;
    }
    setLoading(true);
    try {
      await resetPasswordAPI(token!, data.password);
      setAlert({ type:'success', message:'Password reset successful!' });
      setData({password:'',confirmPassword:''})
      setTimeout(() => nav('/login'), 800);
    } catch {
      setAlert({ type:'error', message:'Failed to reset password.' });
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
                <LockIcon sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography variant="h3" gutterBottom sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                New Password
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 400, mx: 'auto' }}>
                Create a strong password to secure your account
              </Typography>
            </Box>

            {alert && (
              <Fade in={true}>
                <Alert 
                  severity={alert.type} 
                  icon={alert.type === 'success' ? <CheckCircleIcon /> : undefined}
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
              <Box>
                <TextField 
                  label="New Password" 
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
                {data.password && (
                  <Box sx={{ mt: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Password Strength:
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: `${getStrengthColor(passwordStrength)}.main`,
                        fontWeight: 600
                      }}>
                        {passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Medium' : 'Strong'}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={passwordStrength} 
                      color={getStrengthColor(passwordStrength)}
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        backgroundColor: 'rgba(0,0,0,0.1)'
                      }}
                    />
                  </Box>
                )}
              </Box>

              <TextField 
                label="Confirm Password" 
                type="password" 
                value={data.confirmPassword} 
                onChange={e => setData({ ...data, confirmPassword: e.target.value })} 
                fullWidth
                variant="outlined"
                error={data.confirmPassword !== '' && data.password !== data.confirmPassword}
                helperText={data.confirmPassword !== '' && data.password !== data.confirmPassword ? "Passwords don't match" : ''}
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
                disabled={loading || !data.password || !data.confirmPassword || data.password !== data.confirmPassword}
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
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
              </Button>
            </Box>

            <Box sx={{ 
              mt: 4, 
              p: 3, 
              borderRadius: 2, 
              background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
              border: '1px solid rgba(102, 126, 234, 0.2)'
            }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                <strong>Password Requirements:</strong>
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2, color: 'text.secondary' }}>
                <Typography component="li" variant="caption">At least 8 characters long</Typography>
                <Typography component="li" variant="caption">Contains uppercase and lowercase letters</Typography>
                <Typography component="li" variant="caption">Includes numbers or special characters</Typography>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}