import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditCourse: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/course/${courseId}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:8085/api/course/${courseId}`, course);
      console.log('Course updated successfully');
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Course</h2>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" value={course.title} onChange={(e) => setCourse({ ...course, title: e.target.value })} />
      <label htmlFor="description">Description:</label>
      <textarea id="description" value={course.description} onChange={(e) => setCourse({ ...course, description: e.target.value })} />
      <label htmlFor="price">Price:</label>
      <input type="number" id="price" value={course.price} onChange={(e) => setCourse({ ...course, price: e.target.value })} />
      <button onClick={handleSubmit}>Save Changes</button>
    </div>
  );
};

export default EditCourse;