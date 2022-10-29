import React, { useState, useEffect } from 'react';
import FormRequest from '../Form/FormRequest';
import { Grid, Typography, Container } from '@mui/material';
import RequestCourses from '../RequestCourses/RequestCourses';
import { fetchRequestedCourses } from '../../../api/index';
import Tutors from '../Tutors/Tutors';
const Requests = (props) => {
  const [forceRender, setForceRender] = useState(0);
  const [courses, setCourses] = React.useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetchRequestedCourses()
        .then((result) => {
          setCourses(result);
          // console.log('courses', courses);
        })
        .catch((error) => {
          if (error.response) {
            // console.log(error.response.data); // => the response payload
            alert(error.response.data.message);
          }
        });
    }, 1000);
  }, [forceRender]);

  return (
    <div>
      {props.requestsView && (
        <Container maxWidth="xl">
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={4}>
              <Typography sx={{ marginTop: 9, marginBottom: 3, minWidth: 200 }} variant="h4">
                Requests
              </Typography>
              <FormRequest setForceRender={setForceRender} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <RequestCourses courses={courses} setForceRender={setForceRender} showTutorsAndSetCourseObj={props.showTutorsAndSetCourseObj} />
            </Grid>
          </Grid>
        </Container>
      )}
      {!props.requestsView && <Tutors setChat={props.setChat} chatChange={props.chatChange} setRequestsView={props.setRequestsView} courseObj={props.courseObj} />}
    </div>
  );
};

export default Requests;
