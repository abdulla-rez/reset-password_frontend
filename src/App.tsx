// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import SignupPage from './components/SignupForm';
// import LoginPage from './components/LoginForm';
// import ForgotPasswordPage from './components/ForgotPasswordForm';
// import ResetPasswordPage from './components/ResetPasswordForm';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//         <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import SignupPage from './components/SignupForm';
// import LoginPage from './components/LoginForm';
// import ForgotPasswordPage from './components/ForgotPasswordForm';
// import ResetPasswordPage from './components/ResetPasswordForm';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//         <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import {  Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import Dashboard from './components/Dashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      dark: '#764ba2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
    body1: {
      fontSize: '1.1rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<SignupForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
        </Routes>
    </ThemeProvider>
  );
}

export default App;