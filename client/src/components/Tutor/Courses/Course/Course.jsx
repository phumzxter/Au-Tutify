import React from 'react';
import { Card, CardContent, Button, CardActions, Typography } from '@mui/material';
import { deleteCourse } from '../../../../api/index.js';

function Course(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6">{props.course.course}</Typography>
        <Typography>{props.course.type}</Typography>
        <Typography>{props.course.price} Baht/Hour</Typography>
        <Typography>{props.course.availability}</Typography>
        <Typography>{props.course.details}</Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small" sx={{ textDecoration: 'line-through' }}>Students</Button>
        <Button size="small" sx={{ textDecoration: 'line-through' }}>Delete</Button> */}
        <Button
          size="small"
          onClick={() => {
            props.studentFunction(props.course);
            // console.log(props.course);
          }}
        >
          Students
        </Button>
        <Button
          size="small"
          onClick={() => {
            deleteCourse(props.course._id);
            props.setForceRender((prev) => prev + 1);
          }}
        >
          Delete
        </Button>
        {/* <Button size="small">Delete</Button> */}
      </CardActions>
    </Card>
  );
}

export default Course;
