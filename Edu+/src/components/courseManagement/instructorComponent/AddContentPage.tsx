import React, { useState } from 'react';
import { Button, Container, Grid, TextField } from '@mui/material';

interface UnitFormProps {
  onSubmit: (unitData: FormData) => void;
}

const UnitForm: React.FC<UnitFormProps> = ({ onSubmit }) => {
  const [courseId, setCourseId] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState<string[]>([]); // Change to string[]
  const [lectureNotes, setLectureNotes] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setLectureNotes(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('courseId', courseId);
    formData.append('unitNumbers', unitNumber);
    formData.append('titles', title);
    formData.append('videoUrl', videoUrl.join(',')); // Join videoUrl array into a string
    if (lectureNotes) {
      formData.append('lectureNotes', lectureNotes);
    }

    try {
      const response = await fetch('http://localhost:8085/api/unit/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Unit uploaded successfully');
        // Optionally, you can reset the form after successful submission
        setCourseId('');
        setUnitNumber('');
        setTitle('');
        setVideoUrl([]); // Reset videoUrl to an empty array
        setLectureNotes(null);
      } else {
        console.error('Error uploading unit:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading unit:', error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Course ID"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Unit Number"
              value={unitNumber}
              onChange={(e) => setUnitNumber(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Video URL"
              value={videoUrl.join(',')} // Join videoUrl array into a string
              onChange={(e) => setVideoUrl(e.target.value.split(','))} // Split string into an array
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept=".pdf, .doc, .docx, .txt"
              onChange={handleFileChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Add Unit
        </Button>
      </form>
    </Container>
  );
};

export default UnitForm;
