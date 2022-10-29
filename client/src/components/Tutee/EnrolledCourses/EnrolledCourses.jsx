import React, { useEffect } from 'react';
import EnrolledCourse from './EnrolledCourse/EnrolledCourse';
import { Grid, Typography, CircularProgress } from '@mui/material';

function EnrolledCourses(props) {
  let user = JSON.parse(localStorage.getItem('user'));

  // useEffect(() => {
  // }, []);

  return !props.courses.length ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {props.courses.map(
        (singleCourse) =>
          singleCourse?.tutees.includes(user.result._id) && (
            <Grid key={singleCourse._id} item xs={12} sm={6} md={6}>
              <EnrolledCourse setChat={props.setChat} setForceRender={props.setForceRender} chatChange={props.chatChange} course={singleCourse} />
            </Grid>
          )
      )}
    </Grid>
  );
}

export default EnrolledCourses;
