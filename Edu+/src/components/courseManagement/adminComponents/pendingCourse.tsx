import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Grid } from '@mui/material';
import { AuthContext } from '../../auth/authProvide';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import { DoneOutline } from '@mui/icons-material';
import Chip from '@mui/material/Chip';
import AutorenewIcon from '@mui/icons-material/Autorenew';

interface CourseData {
  id:string;
  imageUrl: string;
  title: string;
  status: string;
}
export function PendingCourse() {
  const navigate = useNavigate();
  const [apiData, setApiData] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');

  const fetchCardDetails = async () => {
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJpZCI6IjY2M2JiYTAyYzhjYTMxMDIwZjU5MTkzMCIsImVtYWlsIjoiYWRtaW5AZWRwdXBsdXMuY29tIiwic3ViIjoiYWRtaW5AZWRwdXBsdXMuY29tIiwiaWF0IjoxNzE1MjM5NTA3LCJleHAiOjE3MTUyNDEzMDd9.gfyNzMm2VjsfnTTzhFN3THqas7UhHXTNNTLDz_ZieiQ';
    try {
      axios
        .get('http://localhost:8085/api/course/status/pending', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          if (response.data && response.data.length > 0) {
              console.log(response.data);
            setApiData(response.data);
          } else {
            console.log('Error when retrieve api data');
            setErrorMessage('No Pending Courses to review!');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.error('Error fetching card details:', error);
    }
  };

  React.useEffect(() => {
    fetchCardDetails();
  }, []);

  function handleCardClick(id: string): void {
    console.log(id);
    navigate(`/admin/dashboard/courses/${id}`);
  }

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
          Pending Courses
        </Typography>
        {errorMessage ? (
          <Typography variant="h4" color="error" sx={{ fontStyle: 'italic' }}>
            {errorMessage}
          </Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {apiData.map((data: CourseData, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    border: '2px solid #14AA9E',
                    maxWidth: 300,
                    marginBottom: 3,
                  }}
                >
                  <CardActionArea onClick={() =>handleCardClick(data.id)}>
                  <CardMedia
                    component="img"
                    height="150"
                    image={data.imageUrl}
                    alt={`Image ${index}`}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" fontFamily="Roboto" sx={{ fontWeight: 'bold' }}>
                      {data.title}
                    </Typography>
                    <Typography variant="body2" sx={{paddingTop:2}}>
                      <Chip
                        icon={<AutorenewIcon />}
                        label="PENDING"
                        color="warning"
                        variant="contained"
                      />
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
