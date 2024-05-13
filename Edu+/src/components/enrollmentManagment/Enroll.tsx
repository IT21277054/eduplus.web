import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { Footer } from '../templates/Footer';
import Header from '../templates/Header';

function Entoll() {
  return (
    <>
      <Header></Header>
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(https://t4.ftcdn.net/jpg/05/25/08/09/360_F_525080936_JEpnKXh2siYKBPpsqd98pbbcIzy4ySKz.jpg)`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {
          <img
            style={{ display: 'none' }}
            src="https://t4.ftcdn.net/jpg/05/25/08/09/360_F_525080936_JEpnKXh2siYKBPpsqd98pbbcIzy4ySKz.jpg"
          />
        }
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                Course Name
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Sub Title
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Box
        sx={{
          overflowX: 'auto',
          margin: 5,
          borderRadius: '6px',
          backgroundColor: '#f0f0f0',
          padding: '10px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Lecture Section
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Box sx={{ display: 'flex' }}>
          {[...Array(8)].map((_, index) => (
            <CardActionArea component="a" href="#" key={index}>
              <Card sx={{ display: 'flex', minWidth: 345, marginRight: 2 }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                    Lecture
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Sub title
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    123
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    Watch Lecture
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                  image="https://t4.ftcdn.net/jpg/05/25/08/09/360_F_525080936_JEpnKXh2siYKBPpsqd98pbbcIzy4ySKz.jpg"
                />
              </Card>
            </CardActionArea>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          overflowX: 'auto',
          margin: 5,
          borderRadius: '6px',
          backgroundColor: '#f0f0f0',
          padding: '10px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Quiz Section
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Box sx={{ display: 'flex' }}>
          {[...Array(8)].map((_, index) => (
            <CardActionArea component="a" href="#" key={index}>
              <Card sx={{ display: 'flex', minWidth: 345, marginRight: 2 }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                    Quiz
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Sub title
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    123
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    Do Quiz
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                  image="https://t4.ftcdn.net/jpg/05/25/08/09/360_F_525080936_JEpnKXh2siYKBPpsqd98pbbcIzy4ySKz.jpg"
                />
              </Card>
            </CardActionArea>
          ))}
        </Box>
      </Box>
      <Footer></Footer>
    </>
  );
}

export default Entoll;
