import React, { useEffect } from 'react';
import Course from './Course/Course';
import { Grid, Typography, CircularProgress } from '@mui/material';

function Courses(props) {
  let user = JSON.parse(localStorage.getItem('user'));
  // const [courses, setCourses] = React.useState([]);
  // useEffect(() => {}, []);
  // fetchTutorCourses().then((result) => {
  //   setCourses(result);
  //   // console.log("courses", courses);
  // });
  //need to add useEffect clean up to abort the axios fetch

  return !props.courses.length ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {props.courses.map(
        (singleCourse) =>
          user.result._id === singleCourse?.tutor && (
            <Grid key={singleCourse._id} item xs={12} sm={6} md={6}>
              <Course setForceRender={props.setForceRender} studentFunction={props.studentFunction} course={singleCourse} />
            </Grid>
          )
      )}
    </Grid>
  );
}

export default Courses;
