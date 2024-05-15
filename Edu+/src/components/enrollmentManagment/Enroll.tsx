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

const descriptions = [
  'Introduction to SPM',
  'SPM Part Two',
  'SPM Part Three',
  'Assignment',
  'Part Four',
  'Part Five',
  'Part Six',
  'Part Seven',
];

const quizDescriptions = [
  'Quiz One',
  'Quiz Two',
  'Quiz Three',
  'Quiz Four',
  'Quiz Five',
  'Quiz Six',
  'Quiz Seven',
  'Quiz Eight',
];

const imageUrls = [
  'https://img.freepik.com/free-vector/learning-concept-illustration_114360-6186.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5dKOEC7_1Frv1if6SxAh8SZ5Dcr0N4T6TgvJZTWu0svjRsOHqn7DvVMlSE9VJxvwMP7o&usqp=CAU',
  'https://img.freepik.com/free-vector/flat-university-concept_23-2148170517.jpg',
  'https://img.freepik.com/free-vector/back-school-supplies-flat-style_24908-56845.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnNsJ1vRuBlR1OK8JuAKLA_KJvKrYUMEn5jX8uKGQZLF_x047xhMZUk48FexurqcFgel0&usqp=CAU',
];

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
          backgroundImage: `url(https://forte.com.tr/assets/imgs/blog/80.webp)`,
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
                SPM
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Software Process Management
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
                    Lecture {index + 1}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    SPM2024
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {/* Replace this line with your array of descriptions */}
                    {descriptions[index % descriptions.length]}
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    Watch Lecture
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                  image={imageUrls[index % imageUrls.length]}
                  alt={`Lecture ${index + 1}`}
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
                    Quiz {index + 1}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    SPM2024
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {/* Replace this line with your array of descriptions */}
                    {quizDescriptions[index % quizDescriptions.length]}
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    Do Quiz
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                  image="https://www.quiz-maker.com/images/make-a-quiz.png"
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
