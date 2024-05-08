import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Grid } from '@mui/material';
import { AuthContext } from '../../auth/authProvide';
import { useNavigate } from 'react-router-dom';
import image1 from '../../../assets/Register.png';
import image2 from '../../../assets/coursecontent.png';
import axios from 'axios'; // Import axios for fetching data from backend

export function PendingCourse() {
  const navigate = useNavigate();

  const handleContentClick = () => {
    navigate('/admin/dashboard/content');
  };

  const handleRegistrationClick = () => {
    navigate('/admin/dashboard/instructor');
  };

 
  const fetchCardDetails = async () => {
    try {
  
    } catch (error) {
      console.error('Error fetching card details:', error);
    }
  };

  React.useEffect(() => {
    fetchCardDetails();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box
        sx={{
          flex: '1 0 auto',
          padding: '20px',
          textAlign: 'center',
          paddingTop: 10,
          paddingBottom: 20,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            paddingBottom: 10,
            fontWeight: 'bold',
            backgroundImage: `linear-gradient(45deg, #020024 25%, #14aa9e 35%, #00d4ff 100%)`,
            backgroundSize: '100%',
            backgroundRepeat: 'repeat',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Welcome to Admin Dashboard
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {/* Adjust xs, sm, md values to fit 4 cards in a row */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardActionArea onClick={handleRegistrationClick}>
                <CardMedia
                  component="img"
                  height="250"
                  image={image1}
                  alt="register"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Instructor Registration
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardActionArea onClick={handleContentClick}>
                <CardMedia
                  component="img"
                  height="250"
                  image={image2}
                  alt="course content"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Review Course Content
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
