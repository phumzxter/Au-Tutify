import React from 'react';
import { Card, CardContent, Button, CardActions, Typography } from '@mui/material';
import { apply, getTutor } from '../../../../api/index.js';
import { useEffect } from 'react';

function RequestCourse({ course }) {
  let user = JSON.parse(localStorage.getItem('user'));
  const [applied, setApplied] = React.useState(false);
  const [tutor, setTutor] = React.useState({});

  useEffect(() => {
    getTutor(user.result._id).then((result) => {
      // console.log(typeof result.data);
      setTutor((prev) => ({ ...prev, ...result.data }));
    });
  }, []);

  useEffect(() => {
    if (course.tutors.includes(user.result._id)) {
      setApplied(true);
    }
  }, []);

  const onClickHandler = () => {
    if (tutor.aboutMe === undefined) {
      alert('Please fill in your profile before applying');
    } else {
      apply(course._id);
      setApplied(true);
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6">
          {course.course} {applied && '✔️'}
        </Typography>
        <Typography variant="h7" sx={{ textDecoration: 'underline' }}>
          {course.tuteeRequestName}
        </Typography>
        <Typography>{course.type}</Typography>
        <Typography>{course.price} Baht/Hour</Typography>
        <Typography>{course.availability}</Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small" sx={{ textDecoration: 'line-through' }}>
          Chat
        </Button> */}
        {/* <Button size="small">Chat</Button> */}

        {!applied && (
          <Button size="small" onClick={onClickHandler}>
            Apply
          </Button>
        )}

        {/* <Button size="small" sx={{ textDecoration: 'line-through' }}>
          Tutee Detail
        </Button> */}
        {/* <Button size="small">Tutee Detail</Button> */}
      </CardActions>
    </Card>
  );
}

export default RequestCourse;
