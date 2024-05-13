import React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import logo from '../../assets/edu+.png'
import { LogoutOutlined } from '@mui/icons-material';

export function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signin')
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url('src/assets/home2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      <img src={logo} alt="Login" style={{ maxWidth: '40%', height: 'auto' }} />
       <Button 
        variant="contained"
        size="large"
        endIcon={<ArrowForwardIcon />}
        sx={{
          backgroundColor: 'rgba(20, 170, 158, 0.5)', 
          '&:hover': {
            backgroundColor: 'rgba(20, 170, 158, 0.7)',
          },
          mt: 3,
          mb: 2,
          borderRadius: 2,
          fontSize: '20px',
          fontWeight: 'bold',
          width: '250px', 
          height: '60px',
        }}
        onClick={handleGetStarted}
      >
        Get Started
      </Button>
    </Box>
  );
}
