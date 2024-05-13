import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField , Button } from '@mui/material';

interface UnitDetail {
  unitId: string;
  courseId: string;
  units: {
    unitNumber: number;
    title: string;
    videoUrl: string;
    // Add more properties if needed
  }[];
}

const UnitDetailsList: React.FC = () => {
  const [units, setUnits] = useState<UnitDetail[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await fetch(`http://localhost:8085/api/unit/${searchTerm}/unit`);
        if (response.ok) {
          const data: UnitDetail | undefined = await response.json();
          if (data && data.courseId === searchTerm) {
            setUnits([data]); // Wrap the single object in an array
          } else {
            console.error('No unit data found for the provided courseId:', searchTerm);
            setUnits([]); // Reset units if no data found
          }
        } else {
          console.error('Failed to fetch unit data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching unit data:', error);
      }
    };

    // Fetch units only when searchTerm (courseId) changes
    if (searchTerm !== '') {
      fetchUnits();
    }
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <TextField
        label="Enter Course ID"
        value={searchTerm}
        onChange={handleSearch}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <Grid container spacing={2}>
        {units.map((unit) => (
          <Grid item key={unit.unitId} xs={12} sm={6} md={4}>
            <Card sx={{ width: '190%' }}> {/* Set width to 100% */}
              <CardContent>
                <Typography variant="h6" component="h2">
                  {unit.courseId} - {unit.unitId}
                </Typography>
                {unit.units.map((unitDetail, index) => (
                  <div key={index}>
                    <Typography variant="body2" color="textSecondary">
                      Unit Number: {unitDetail.unitNumber}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Title: {unitDetail.title}
                    </Typography>
                    <video width="100%" controls>
                      <source src={unitDetail.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    {/* You can add more details here */}
                  </div>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default UnitDetailsList;