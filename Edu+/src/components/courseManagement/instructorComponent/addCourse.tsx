import { useState, ChangeEvent, FormEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const defaultTheme = createTheme();

export default function AddCourse() {
  const { enqueueSnackbar } = useSnackbar();
  const [course, setCourse] = useState({
    course_id: '',
    instructor_id: '',
    title: '',
    description: '',
    price: 0,
    imageUrl: '' as string | ArrayBuffer | null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourse((prevCourse) => ({
          ...prevCourse,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log("Course", course);
      // Send course data along with all fields as query parameters
      await axios.post('http://localhost:8085/api/course', course, {
        params: {
          course_id: course.course_id,
          instructor_id: course.instructor_id,
          title: course.title,
          description: course.description
        }
      });
      enqueueSnackbar('Course added successfully', { variant: 'success' });
      setCourse({
        course_id: '',
        instructor_id: '',
        title: '',
        description: '',
        price: 0,
        imageUrl: '',
      });
    } catch (error) {
      enqueueSnackbar('Failed to add course', { variant: 'error' });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Add Course
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="course_id"
              label="Course ID"
              name="course_id"
              value={course.course_id}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="instructor_id"
              label="Instructor ID"
              name="instructor_id"
              value={course.instructor_id}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={course.title}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              value={course.description}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Course
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
