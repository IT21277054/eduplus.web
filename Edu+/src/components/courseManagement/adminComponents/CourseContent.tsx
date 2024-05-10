import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardMedia,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../../auth/authProvide';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface videoData {
  video: string;
  videoUrl:string;
  title: string;
  lectureNotes: string;
}

interface Question {
  questionId: string;
  text: string;
  answers: Answer[];
}

interface Answer {
  answerId: string;
  text: string;
  correct: boolean;
}

export default function CourseContent() {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [courseData, setCourseData] = React.useState({
    course_id: '',
    description: '',
    title: '',
    imageUrl: '',
  });
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [units, setUnits] = React.useState<videoData[]>([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const token = user;

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/api/course/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      setCourseData({
        course_id: data.course_id,
        description: data.description || 'Description not available',
        title: data.title || 'Title not available',
        imageUrl: data.imageUrl || '',
      });
    } catch (error) {
      console.error('Error fetching Course details:', error);
    }
  };

  const fetchQuizDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8085/api/quiz/${courseData.course_id}/quiz`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      setQuestions(data.questions);
    } catch (error) {
      console.error('Error fetching quiz details:', error);
    }
  };

  const fetchUnitDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8085/api/unit/${courseData.course_id}/unit`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      setUnits(data.units);
    } catch (error) {
      console.error('Error fetching units details:', error);
    }
  };

  React.useEffect(() => {
    fetchCourseDetails();
  }, []);

  React.useEffect(() => {
    if (courseData.course_id) {
      fetchQuizDetails();
      fetchUnitDetails();
    }
  }, [courseData]);

  const handleViewQuiz = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const clickApprove = async () => {
    try {
      await axios.put(`http://localhost:8085/api/course/${id}/status?status=approved`).then((res) => {
        enqueueSnackbar('Instructor Registration Completed', {
          variant: 'success',
        });
        navigate('/admin/dashboard/courses');
      }).catch((err) => enqueueSnackbar(err.response.data.err, { variant: 'error' }));
    } catch (err: any) {
      console.error('Error approving course:', err);
    }
  };

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
          Course Content to Approve
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Item sx={{ textAlign: 'center', flexGrow: 1 }}>
              <Typography variant="h4" fontFamily="Roboto" sx={{ paddingTop: 3 }}>
                {courseData.title}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {courseData.imageUrl && (
                  <CardMedia
                    component="img"
                    height="300"
                    style={{ width: '100%' }}
                    image={courseData.imageUrl}
                    alt="Course Image"
                    sx={{ paddingTop: 5, paddingBottom: 5 }}
                  />
                )}
              </Box>
              <Typography
                variant="body1"
                sx={{
                  paddingTop: 5,
                  textAlign: 'justify',
                  paddingLeft: 2,
                  paddingRight: 2,
                  paddingBottom: 5,
                }}
              >
                {courseData.description}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: 2,
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#14AA9E',
                    '&:hover': {
                      backgroundColor: '#14AA9E',
                    },
                    mt: 3,
                    mb: 2,
                    borderColor: 'primary.main',
                    marginRight: 2,
                  }}
                  onClick={clickApprove}
                >
                  Approve
                </Button>
                {questions.length > 0 && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 3,
                      mb: 2,
                      borderColor: 'primary.main',
                    }}
                    onClick={handleViewQuiz}
                  >
                    View Quiz
                  </Button>
                )}
              </Box>
            </Item>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Item sx={{ textAlign: 'center', flexGrow: 1 }}>
              <Typography variant="h5" fontFamily="Roboto" sx={{ paddingTop: 3 }}>
                Videos
              </Typography>
              {units.length > 0 ? (
                units.map((data: videoData, index) => (
                  <Box key={index}>
                    <Typography
                      fontFamily="Roboto"
                      sx={{ paddingTop: 1, fontSize: 20 }}
                    >
                      {data.title}
                    </Typography>
                    {data.video && (
                      <CardMedia
                        component="video"
                        controls
                        autoPlay
                        loop
                        muted
                        style={{ width: '100%', marginTop: 10 }}
                        src={data.videoUrl}
                      />
                    )}
                  </Box>
                ))
              ) : (
                <Typography>No videos available</Typography>
              )}
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Quiz</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Grid container spacing={2}>
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <Grid item xs={7} key={index}>
                  <Typography variant="h6">Question {index + 1}:</Typography>
                  <Typography>{question.text}</Typography>
                  {question.answers.map((answer, answerIndex) => (
                    <Typography key={answerIndex} variant="subtitle1">
                      {String.fromCharCode(65 + answerIndex)}. {answer.text}{' '}
                      {answer.correct && '(Correct)'}
                    </Typography>
                  ))}
                </Grid>
              ))
            ) : (
              <Typography>No quiz questions available</Typography>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

