import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Inbox as InboxIcon, Mail as MailIcon } from '@mui/icons-material';

export function InstructorDashboard() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [courseCount, setCourseCount] = useState(0);
  const [contentCount, setContentCount] = useState(0);

  useEffect(() => {
    // Simulating fetching data from a database
    // Replace with your actual data fetching logic
    // Example fetch call
    fetch('your-api-url-for-data')
      .then(response => response.json())
      .then(data => {
        setCourseCount(data.courseCount);
        setContentCount(data.contentCount);
      })
      .catch(error => console.log('Error fetching data:'));
  }, []); // Empty dependency array means this effect runs only once, after the initial render

  const handleCourseaddClick = () => {
    navigate('/instructor/dashboard/coursesadd');
  };

  const handleCourseClick = () => {
    navigate('/instructor/dashboard/displaycourse');
  };

  const handleAddContentClick = () => {
    navigate('/instructor/dashboard/addcontent');
  };

  const handleAddQuizClick = () => {
    navigate('/instructor/dashboard/quizform');
  };

  const displayCourseContent = () => {
    navigate('/instructor/dashboard/diplaycontent');
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      {/* Drawer for slide navigation */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <List>
          {/* Main items */}
          <Divider />
          {/* Sub-navigator */}
          <ListItem button onClick={toggleDrawer}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="course" />
          </ListItem>
          <List component="div" disablePadding>
            <ListItem button onClick={handleCourseaddClick} sx={{ pl: 4 }}>
              <ListItemText primary="Adding Course" />
            </ListItem>
            <ListItem button onClick={handleCourseClick} sx={{ pl: 4 }}>
              <ListItemText primary="Display Course" />
            </ListItem>
            <ListItem button onClick={handleAddContentClick} sx={{ pl: 4 }}>
              <ListItemText primary="Add Content" />
            </ListItem>
            <ListItem button onClick={handleAddQuizClick} sx={{ pl: 4 }}>
              <ListItemText primary="Add Quiz" />
            </ListItem>
            <ListItem button onClick={displayCourseContent} sx={{ pl: 4 }}>
              <ListItemText primary="Course Content" />
            </ListItem>
            <Divider/>
          </List>
        </List>
      </Drawer>

      {/* Main content */}
      <Typography variant="h4" gutterBottom style={{ color: '#3f51b5', textAlign: 'center' }}>
        Welcome To Instructor
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70vh', // Adjust as needed
            padding: '20px',
          }}
        >
          <Card>
            <CardActionArea onClick={toggleDrawer}>
              <CardMedia
                component="img"
                width="400" // Change width as needed
                height="250" // Change height as needed
                image="data:image/jpeg;base64,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
                iXelTbofaXAiI1EaiZIiIiIiZIiInAhzbnYbDeHQPuVDFUvga5sTnq9rmtcuatzjci5cymMTqWzmw/Ux9EKdv96pLu2jbBTzw9Tvncrp3xrm2RGpkiN8XKW1hSRZcN4bevg2lbsYzQT+RiPCODo/m2O3Ll3yFJPvMztMYyNrI2Na1jGoxjWojWtaiZIiImrJCbTtXxuNOGZmZfQAMW6AAAAAK13Rr6/OOwU2kuaQ1FfoIulI5y5w07U481ycv8KcqEmwfYOsNqYyZreuFZo1Fe5Ml0X5dpCi8jE1ePNeM6lRZbLVV1Jc6igp5a+l0UgqHszezRVVavIuWebc0XLiOhkTtRXFrJN7f0AAheAAAAABpXO3Ul1oKy31Tc4amNWKqfOY7hbIznauSp4jd+ICJjfaVPYcrq3CWI57VX5pBU1EVDVoiLob452jT1Uaci5psdyt1XChz6my2WsraS41VDTy1tJo9TzyMzezRVXN5lyXW3NFy4joITM7U4cc44mu+36AAQvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPiB8QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPiB8QAAAAAAAAAAADaNoADaNoADaNoADaNoADaNpkwA2jaDIGNo2gANo2gANo2gANo2gANo2mTADaNoMgY2jaAA28o2j4gBtG0ABtG0ABtG0ABtAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPiB8QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPiAAAAAAAAAAAAA//2Q=="
                alt="course content"
                sx={{ margin: 'auto' }} // Center the image
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Instructor
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Box>
      
      {/* Additional cards for creative display */}
      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Number of Courses: {courseCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Number of Course Contents: {contentCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
