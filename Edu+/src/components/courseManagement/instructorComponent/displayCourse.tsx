import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  Button
} from '@mui/material';

interface Course {
  _id: string;
  course_id: string;
  instructor_id: string;
  title: string;
  description: string;
  price: number;
}

const AllCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
        const response = await axios.get<Course[]>('http://localhost:8085/api/course');
        setCourses(response.data);
    };
    fetchCourses();
  }, []);

  const handleEdit = (courseId: string) => {
    window.location.href = `/edit-course/${courseId}`;
  };

  const handleDelete = async (Id: string) => {
    try {
      await axios.delete(`http://localhost:8085/api/course/${Id}`);
      setCourses(courses.filter(course => course._id !== Id));
      console.log('Delete course:', Id);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  }; 

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        All Courses
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {courses.map((course) => (
          <Paper key={course._id} elevation={3} style={{ padding: '20px', minWidth: '250px' }}>
            <Typography variant="h6">{course.title}</Typography>
            <Typography variant="subtitle1">Course ID: {course.course_id}</Typography>
            <Typography variant="body1">Instructor ID: {course.instructor_id}</Typography>
            <Typography variant="body2" gutterBottom>Description: {course.description}</Typography>
            <Typography variant="body2">Price: ${course.price}</Typography>
            <div style={{ marginTop: '10px' }}>
              <Button variant="outlined" color="primary" onClick={() => handleEdit(course._id)}>Edit</Button>
              <Button variant="outlined" color="error" onClick={() => handleDelete(course._id)}>Delete</Button>
            </div>
          </Paper>
        ))}
      </div>
    </Container>
  );
};

export default AllCourses;
