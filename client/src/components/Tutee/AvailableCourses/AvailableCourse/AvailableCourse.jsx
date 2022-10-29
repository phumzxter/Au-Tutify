import React from 'react';
import { Card, CardContent, Button, CardActions, Typography } from '@mui/material';
import { enroll } from '../../../../api/index.js';
import { useNavigate } from 'react-router-dom';

function AvailableCourse({ course }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6">{course.course}</Typography>
        <Typography variant="h7">{course.tutorname}</Typography>
        <Typography>{course.type}</Typography>
        <Typography>{course.price} Baht/Hour</Typography>
        <Typography>{course.availability}</Typography>
        <Typography>{course.details}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            enroll(course._id);
            // navigate('/tutee/dashboard');
            window.location.reload();
          }}
        >
          Attend
        </Button>
        {/* <Button size="small">Bookmark</Button> */}
        {/* <Button size="small" sx={{ textDecoration: 'line-through' }}> */}
        {/* <Button size="small">Tutor Details</Button> */}
      </CardActions>
    </Card>
  );
}

export default AvailableCourse;
