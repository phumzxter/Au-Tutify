import React, { useEffect } from 'react';
import Tutor from './Tutor/Tutor';
import { Paper, Container, Grid, Typography, Button, CircularProgress } from '@mui/material';
import { fetchTutors } from '../../../api/index';

const Tutors = (props) => {
  const [tutors, setTutors] = React.useState([]);
  useEffect(() => {
    fetchTutors()
      .then((result) => {
        setTutors(result);
        // console.log('courses', courses);
      })
      .catch((error) => {
        if (error.response) {
          // console.log(error.response.data); // => the response payload
          alert(error.response.data.message);
        }
      });
  }, []);
  // console.log(props.courseId.tutees);
  // console.log(props.courseId.tutees.includes('634634aa68907eb5ba09633f'));

  // console.log(typeof tutors);
  // console.log(tutors);
  // tutors.map((e) => console.log(e));
  //   console.log(props.courseObj.tutors);
  //   console.log(props.courseObj.tutors.length);
  return (
    <Container maxWidth="xl">
      {/* <SearchBar value={textFieldValue} onChange={(newValue) => setTextFieldValue(newValue)} onSearch={handleSearch} /> */}
      <Grid container justify="space-between" alignItems="stretch" spacing={5}>
        <Grid item xs={12} sm={8}>
          <Button onClick={props.setRequestsView}>Back</Button>
          <Typography sx={{ marginTop: 4, marginBottom: 3, minWidth: 200 }} variant="h4">
            Candidate Tutors
          </Typography>
          {!tutors.length ? (
            <CircularProgress />
          ) : props.courseObj.tutors.length != 0 ? (
            <Grid container alignItems="stretch" spacing={0}>
              {tutors.map(
                (oneTutor) =>
                  props.courseObj.tutors.includes(oneTutor._id) && (
                    <Grid key={oneTutor._id} p={2}>
                      <Tutor setChat={props.setChat} chatChange={props.chatChange} courseObj={props.courseObj} tutor={oneTutor} />
                    </Grid>
                  )
              )}
            </Grid>
          ) : (
            <Typography>No Tutor has applied yet.</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Tutors;

// {
//   tutees.map(
//     (oneTutee) =>
//       props.courseId.tutees.includes(oneTutee._id) && (
//         <Grid key={oneTutee._id} item>
//           <Student redirectToChat={props.redirectToChat} chatChange={props.chatChange} tutee={oneTutee} />
//         </Grid>
//       )
//   );
// }

// <Student redirectToChat={props.redirectToChat} chatChange={props.chatChange} tutee={oneTutee} />

// {
//   tutors.map(
//     (oneTutor) =>
//       props.courseId.tutors.includes(oneTutor._id) && (
//         <Grid key={oneTutor._id} item>
//           <Tutor tutor={oneTutor} />
//         </Grid>
//       )
//   );
// }
