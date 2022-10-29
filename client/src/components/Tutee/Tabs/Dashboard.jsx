import React, { useState, useEffect } from 'react';
import EnrolledCourses from '../EnrolledCourses/EnrolledCourses';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import { fetchTutorCourses } from '../../../api/index';

function Dashboard(props) {
  const [courses, setCourses] = React.useState([]);
  const [forceRender, setForceRender] = useState(0);

  useEffect(() => {
    fetchTutorCourses().then((result) => {
      setCourses(result);
    });
  }, [forceRender]);

  return (
    <Container maxWidth="xl">
      {/* <SearchBar value={textFieldValue} onChange={(newValue) => setTextFieldValue(newValue)} onSearch={handleSearch} /> */}
      <Grid container justify="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={8}>
          <Typography sx={{ marginTop: 9, marginBottom: 3, minWidth: 200 }} variant="h4">
            Attending Courses
          </Typography>
          <EnrolledCourses setChat={props.setChat} setForceRender={setForceRender} courses={courses} chatChange={props.chatChange} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
