import React, { useEffect } from 'react';
import AvailableCourse from './AvailableCourse/AvailableCourse';
import { fetchTutorCourses } from '../../../api/index';
import { Grid, Typography, CircularProgress } from '@mui/material';

function AvailableCourses(props) {
  const [courses, setCourses] = React.useState([]);

  useEffect(() => {
    fetchTutorCourses().then((result) => {
      setCourses(result);
    });
  }, []);

  return !courses.length ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {courses
        .filter((val) => {
          if (props.searchvalue == '') {
            return val;
          } else if (val.course.toLowerCase().includes(props.searchvalue.toLowerCase())) {
            return val;
          }
        })
        .map((singleCourse) => (
          <Grid key={singleCourse._id} item xs={12} sm={6} md={6}>
            <AvailableCourse course={singleCourse} />
          </Grid>
        ))}
    </Grid>
  );
}

export default AvailableCourses;
