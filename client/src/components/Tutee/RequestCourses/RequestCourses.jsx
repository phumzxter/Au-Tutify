import React, { useEffect } from 'react';
import RequestCourse from './RequestCourse/RequestCourse';
import { fetchRequestedCourses } from '../../../api/index';
import { Grid, Typography, CircularProgress } from '@mui/material';

function RequestCourses(props) {
  let user = JSON.parse(localStorage.getItem('user'));
  // const [courses, setCourses] = React.useState([]);

  // useEffect(() => {
  //   fetchRequestedCourses()
  //     .then((result) => {
  //       setCourses(result);
  //       // console.log('courses', courses);
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         // console.log(error.response.data); // => the response payload
  //         alert(error.response.data.message);
  //       }
  //     });
  // }, []);

  // console.log("userid", user.result._id)
  // console.log(courses[0].tutee)
  return !props.courses.length ? (
    <CircularProgress sx={{ marginTop: 25, marginLeft: 25 }} />
  ) : (
    <Grid container alignItems="stretch" spacing={3} marginTop={17}>
      {props.courses.map(
        (singleCourse) =>
          user.result._id === singleCourse?.tuteeRequestId && (
            <Grid key={singleCourse._id} item xs={12} sm={6} md={6}>
              <RequestCourse setForceRender={props.setForceRender} course={singleCourse} showTutorsAndSetCourseObj={props.showTutorsAndSetCourseObj} />
            </Grid>
          )
      )}
    </Grid>
  );
}

export default RequestCourses;
