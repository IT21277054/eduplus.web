import React, { useState, useEffect } from "react";
import axios from 'axios'; // Import Axios
import { Card, CardActions, CardContent, Button, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

interface Course {
  id: string;
  courseId: string;
  instructorId: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export default function LearnerDashboard() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      courseId: "SE9093",
      instructorId: "INS111",
      title: "React Basics",
      description: "Learn the basics of React",
      price: 59.99,
      image: "https://iirfranking.com/courses/wp-content/uploads/2022/07/Cyber-Security.jpeg",
    },
    {
      id: "2",
      courseId: "SE9094",
      instructorId: "INS112",
      title: "Node.js Basics",
      description: "Learn the basics of Node.js",
      price: 69.99,
      image: "https://d1jnx9ba8s6j9r.cloudfront.net/imgver.1551437392/img/co_img_1518_1631724053.png",
    },
    {
      id: "3",
      courseId: "SE9095",
      instructorId: "INS113",
      title: "MongoDB Basics",
      description: "Learn the basics of MongoDB",
      price: 79.99,
      image: "https://i.ytimg.com/vi/9_IEcEl5BZI/maxresdefault.jpg",
    }
  ]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([
    {
      id: "1",
      courseId: "SE9090",
      instructorId: "INS114",
      title: "HTML Basics",
      description: "Learn the basics of HTML",
      price: 29.99,
      image: "https://www.freecodecamp.org/news/content/images/2020/09/networking.png",
    },
    {
      id: "2",
      courseId: "SE9091",
      instructorId: "INS115",
      title: "CSS Basics",
      description: "Learn the basics of CSS",
      price: 39.99,
      image: "https://www.itbrainy.com/wp-content/uploads/2020/07/large.png",
    },
    {
      id: "3",
      courseId: "SE9092",
      instructorId: "INS116",
      title: "JavaScript Basics",
      description: "Learn the basics of JavaScript",
      price: 49.99,
      image: "https://i.ytimg.com/vi/S0V20PHPR4M/maxresdefault.jpg",
    }
  ]);

  const [cartCourses, setCartCourses] = useState<Course[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:9090/api/course/status/approved");
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const addToCart = (course: Course) => {
    setCartCourses([...cartCourses, course]);
    setToastMessage('Course added to the cart');
  };

  const removeFromCart = (courseId: string) => {
    const updatedEnrolledCourses = enrolledCourses.filter(course => course.courseId !== courseId);
    setEnrolledCourses(updatedEnrolledCourses);
    setToastMessage('Unenrolled successfully');
  };

  const isEnrolled = (courseId: string) => {
    return enrolledCourses.some(course => course.courseId === courseId);
  };

  const isInCart = (courseId: string) => {
    return cartCourses.some(course => course.courseId === courseId);
  };

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleDialogClose = () => {
    setSelectedCourse(null);
  };

  const handleToastClose = () => {
    setToastMessage('');
  };

  return (
    <>
      <IconButton
        component={Link}
        to="/learner/viewCart"
        style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 999 }}
        color="inherit"
      >
        <ShoppingCartIcon />
      </IconButton>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={!!toastMessage}
        autoHideDuration={2000}
        onClose={handleToastClose}
        message={toastMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleToastClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />


      <Typography variant="h4" gutterBottom style={{ textAlign: 'left', marginTop: '50px' }}>
        Enrolled Courses
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enrolledCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.courseId}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell><img src={course.image} alt="Course Thumbnail" style={{ width: '100px', height: '100px' }} /></TableCell>
                <TableCell>
                  <IconButton onClick={() => handleViewCourse(course)}><VisibilityIcon /></IconButton>
                  <IconButton onClick={() => removeFromCart(course.courseId)} style={{ color: '#FC345C' }}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h4" gutterBottom style={{ textAlign: 'left', marginTop: '50px' }}>
        All Courses
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.courseId}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell><img src={course.image} alt="Course Thumbnail" style={{ width: '100px', height: '100px' }} /></TableCell>
                <TableCell>
                  <IconButton onClick={() => addToCart(course)} style={{ color: '#14AA9E' }}><ShoppingCartIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!selectedCourse} onClose={handleDialogClose}>
        <DialogTitle>{selectedCourse?.title}</DialogTitle>
        <DialogContent>
          <img src={selectedCourse?.image} alt="Course Thumbnail" style={{ width: '100px', height: '100px' }} />
          <Typography variant="body1">Instructor: {selectedCourse?.instructorId}</Typography>
          <Typography variant="body1">Description: {selectedCourse?.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}