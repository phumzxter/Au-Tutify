import React from 'react';
import { Card, CardContent, Button, CardActions, Typography } from '@mui/material';
import { deleteRequest } from '../../../../api/index.js';

function RequestCourse(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6">{props.course.course}</Typography>
        <Typography>{props.course.type}</Typography>
        <Typography>{props.course.price} Baht/Hour</Typography>
        <Typography>{props.course.availability}</Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small" sx={{ textDecoration: 'line-through' }}>
          Tutors
        </Button> */}
        <Button size="small" onClick={() => props.showTutorsAndSetCourseObj(props.course)}>
          Tutors
        </Button>
        {/* <Button size="small">Edit</Button> */}
        <Button
          size="small"
          onClick={() => {
            deleteRequest(props.course._id);
            props.setForceRender((prev) => prev + 1);
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default RequestCourse;
