import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import signupLogo from '../../../assets/add-user.png';
import { useNavigate } from 'react-router-dom';
import Header from '../../templates/Header';
import { Footer } from '../../templates/Footer';

const defaultTheme = createTheme();

export default function InstructorSignUp() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [showOtpForm, setShowOtpForm] = React.useState(false);
  const [otp, setOtp] = React.useState('');
  const [userData, setUserData] = React.useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (
      !data.get('full name') ||
      !data.get('mobile') ||
      !data.get('email') ||
      !data.get('password')
    ) {
      enqueueSnackbar('All fields are required', { variant: 'error' });
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(data.get('email'))) {
      enqueueSnackbar('Invalid email format. Please use a Gmail address', {
        variant: 'error',
      });
      return;
    }

    if (data.get('password').length < 8) {
      enqueueSnackbar('Password must be at least 8 characters long', {
        variant: 'error',
      });
      return;
    }

    setUserData({
      name: data.get('full name'),
      phoneNumber: data.get('mobile'),
      email: data.get('email'),
      password: data.get('password'),
    });

    try {
      await axios.post('http://localhost:8085/api/notification/generate', {
        to: data.get('email'),
        subject: 'OTP from Edu+',
        body: '1234',
      });
      setShowOtpForm(true);
    } catch (err: any) {
      enqueueSnackbar(err.response.data.err, { variant: 'error' });
    }
  };

  const handleOtpSubmit = async (event: any) => {
    event.preventDefault();
    if (!otp) {
      enqueueSnackbar('OTP is required', { variant: 'error' });
      return;
    }

    try {
      await axios
        .post('http://localhost:8085/api/notification/verify', {
          email: userData.email,
          otpCode: otp,
        })
        .then(async res => {
          enqueueSnackbar('Otp verified', { variant: 'success' });
          await axios
            .post('http://localhost:8085/api/auth/register', {
              name: userData.name,
              phoneNumber: userData.phoneNumber,
              email: userData.email,
              password: userData.password,
              role: 'INSTRUCTOR',
              emailToken: res.data,
            })
            .then(res => {
              enqueueSnackbar('Instructor Registration Completed', {
                variant: 'success',
              });
              navigate('/admin/dashboard')
            })
            .catch(err =>
              enqueueSnackbar(err.response.data.err, { variant: 'error' }),
            );
        })
        .catch(err =>
          enqueueSnackbar(err.response.data.err, { variant: 'error' }),
        );
    } catch (err: any) {
      console.log(err);
      enqueueSnackbar(err.response.data.err, { variant: 'error' });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 2,
            }}
          >
            <img src={signupLogo} alt="Login" style={{ maxWidth: '17%', height: 'auto' }} />
          </Box>
          <Typography component="h1" variant="h5">
            Instructor Registration
          </Typography>
          {!showOtpForm ? (
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: '100%', maxWidth: 350 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="full name"
                label="Full Name"
                name="full name"
                autoFocus
                InputProps={{ sx: { borderRadius: 4 } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="moile"
                label="Phone Number"
                name="mobile"
                InputProps={{ sx: { borderRadius: 4 } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                InputProps={{ sx: { borderRadius: 4 } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputProps={{ sx: { borderRadius: 4 } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="role"
                label="role"
                id="role"
                value="INSTRUCTOR"
                disabled
                InputProps={{ sx: { borderRadius: 4 } }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: '#14AA9E',
                  '&:hover': {
                    backgroundColor: '#14AA9E',
                  },
                  mt: 3,
                  mb: 2,
                  borderRadius: 4,
                  fontSize: 'bold',
                  height: 35,
                }}
              >
                Sign Up
              </Button>
            </Box>
          ) : (
            <Box
              component="form"
              noValidate
              onSubmit={handleOtpSubmit}
              sx={{ mt: 1, width: '100%', maxWidth: 400 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="otp"
                label="OTP"
                name="otp"
                autoFocus
                value={otp}
                onChange={e => setOtp(e.target.value)}
                InputProps={{ sx: { borderRadius: 4 } }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: '#14AA9E',
                  '&:hover': {
                    backgroundColor: '#14AA9E',
                  },
                  mt: 3,
                  mb: 2,
                  borderRadius: 4,
                  fontSize: 'bold',
                  height: 35,
                }}
              >
                Verify OTP
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
