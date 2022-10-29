import React, { useEffect } from 'react';
import { Paper, Container, Grid, Typography, Button, CircularProgress } from '@mui/material';
import { fetchTutees } from '../../../api/index';
import Student from './Student/Student';

const Students = (props) => {
  const [tutees, setTutees] = React.useState([]);

  useEffect(() => {
    fetchTutees()
      .then((result) => {
        setTutees(result);
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

  // if (props.courseId.tutees.length === 0) {
  //   // console.log('hello');
  // }
  // console.log(props.courseId.tutees.length);
  console.log(typeof tutees);
  // tutees.map((e) => console.log(e));
  return (
    <Container maxWidth="xl">
      {/* <SearchBar value={textFieldValue} onChange={(newValue) => setTextFieldValue(newValue)} onSearch={handleSearch} /> */}
      <Grid container justify="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={8}>
          <Button onClick={props.viewChange}>Back</Button>
          <Typography sx={{ marginTop: 4, marginBottom: 3, minWidth: 200 }} variant="h4">
            Students
          </Typography>
          {!tutees.length ? (
            <CircularProgress />
          ) : props.courseId.tutees.length != 0 ? (
            <Grid container alignItems="stretch" spacing={3}>
              {tutees.map(
                (oneTutee) =>
                  props.courseId.tutees.includes(oneTutee._id) && (
                    <Grid key={oneTutee._id} item>
                      <Student redirectToChat={props.redirectToChat} chatChange={props.chatChange} tutee={oneTutee} />
                    </Grid>
                  )
              )}
            </Grid>
          ) : (
            <Typography>No Students Currently Bookmarked</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Students;

//props.courseId.tutees.includes(oneTutee._id)

// import React from 'react';
// import { Container, AppBar, Typography, Grow, Grid, Paper } from '@mui/material';

// const Students = () => {
//   return (
//     <div>
//       <Paper
//         elevation={2}
//         style={{
//           padding: 30,
//         }}
//       >
//         <Typography sx={{ marginTop: 0, marginBottom: 0, minWidth: 0 }} variant="h6">
//           Tutee &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Course
//         </Typography>
//         <Typography sx={{ marginTop: 0, marginBottom: 0, minWidth: 0 }} variant="h7">
//           Fathiel Evershade &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CSX1001 Introduction to Programming
//         </Typography>
//       </Paper>
//     </div>
//   );
// };

// export default Students;
