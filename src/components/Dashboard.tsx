import { 
  Box, 
  Typography, 
  Paper, 
  Container, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  Avatar,
  Fade,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LogoutIcon from '@mui/icons-material/Logout';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import TaskIcon from '@mui/icons-material/Task';
import { useEffect } from 'react';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const stats = [
    { title: 'Total Users', value: '2,847', icon: <GroupIcon />, color: '#667eea' },
    { title: 'Active Projects', value: '12', icon: <TaskIcon />, color: '#764ba2' },
    { title: 'Growth Rate', value: '+23%', icon: <TrendingUpIcon />, color: '#f093fb' },
    { title: 'Analytics', value: '98.5%', icon: <AnalyticsIcon />, color: '#4facfe' },
  ];

  const quickActions = [
    { title: 'Profile Settings', icon: <PersonIcon />, description: 'Manage your account' },
    { title: 'Notifications', icon: <NotificationsIcon />, description: 'View recent updates' },
    { title: 'System Settings', icon: <SettingsIcon />, description: 'Configure preferences' },
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4
    }}>
      <Container maxWidth="lg">
        <Fade in={true} timeout={600}>
          <Paper elevation={12} sx={{ 
            p: 4,
            mb: 4,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ 
                width: 60, 
                height: 60,
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
              }}>
                <DashboardIcon sx={{ fontSize: 30 }} />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 0.5
                }}>
                  Welcome to Dashboard
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Manage your account and explore features
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Chip 
                label="Premium User" 
                sx={{ 
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  color: 'white',
                  fontWeight: 600
                }} 
              />
              <Button
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{
                  borderRadius: 3,
                  textTransform: 'none',
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  px: 3,
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)',
                    borderColor: 'primary.dark',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Logout
              </Button>
            </Box>
          </Paper>
        </Fade>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid size={{xs:12,sm:6,md:3}} key={index}>
              <Fade in={true} timeout={800 + index * 200}>
                <Card sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ 
                        background: stat.color,
                        mr: 2,
                        width: 50,
                        height: 50
                      }}>
                        {stat.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h4" sx={{ 
                          fontWeight: 700,
                          color: stat.color,
                          mb: 0.5
                        }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {stat.title}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Quick Actions */}
        <Fade in={true} timeout={1200}>
          <Paper elevation={12} sx={{ 
            p: 4,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            mb: 4
          }}>
            <Typography variant="h5" sx={{ 
              fontWeight: 700,
              mb: 3,
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Quick Actions
            </Typography>
            <Grid container spacing={3}>
              {quickActions.map((action, index) => (
                <Grid size={{xs:12,md:4}} key={index}>
                  <Card sx={{ 
                    height: '100%',
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(102, 126, 234, 0.1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 30px rgba(102, 126, 234, 0.15)',
                      borderColor: 'primary.main',
                    }
                  }}>
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Avatar sx={{ 
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        mx: 'auto',
                        mb: 2,
                        width: 60,
                        height: 60
                      }}>
                        {action.icon}
                      </Avatar>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 600,
                        mb: 1,
                        color: 'text.primary'
                      }}>
                        {action.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {action.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Fade>

        <Fade in={true} timeout={1400}>
          <Paper elevation={12} sx={{ 
            p: 4,
            borderRadius: 4,
            background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(102, 126, 234, 0.2)',
            textAlign: 'center'
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600,
              mb: 2,
              color: 'text.primary'
            }}>
              🎉 Congratulations on Successfully Logging In!
            </Typography>
            <Typography variant="body1" sx={{ 
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6
            }}>
              You've successfully authenticated and can now access all the premium features of our platform. 
              This dashboard serves as your central hub for managing your account, viewing analytics, and 
              accessing various tools and services.
            </Typography>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}