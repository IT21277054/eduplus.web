import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { AuthContext } from '../auth/authProvide';
import { useNavigate, NavLink } from 'react-router-dom';
import logo from '../../assets/edu+.png';

export default function Header() {
  const { user, logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const signIn = () => {
    navigate('/signin');
  };

  const signUp = () => {
    navigate('/signup');
  };

  const logOut = () => {
    logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#14AA9E', boxShadow: 'none', height: '64px' }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', padding: '0 20px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavLink to="/user" sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={logo}
                alt="Logo"
                style={{
                  height: 'auto',
                  maxWidth: '200px',
                  maxHeight: '130px',
                  marginRight: 'auto',
                  marginLeft: '40px',
                  marginTop: '20px',
                }}
              />
            </NavLink>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user ? (
              <Button
                variant="contained"
                onClick={logOut}
                sx={{
                  backgroundColor: '#020024',
                  borderRadius: 4,
                  fontSize: 15,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#14AA9E',
                  },
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  sx={{
                    marginRight: '10px',
                    backgroundColor: 'none',
                    color: '#102C57',
                    borderRadius: 4,
                    fontWeight: 'bold',
                    fontSize: 15,
                    textTransform: 'none',
                    '&:hover': {
                      color: '#204C86',
                    },
                  }}
                  onClick={signIn}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#102C57',
                    borderRadius: 4,
                    fontSize: 15,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#204C86',
                    },
                  }}
                  onClick={signUp}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
