import React from 'react';
import { Box, Button, Paper, Container, Grid, Typography, CircularProgress } from '@mui/material';
import { deleteRequest, createCourse, enroll } from '../../../../api/index';
import { useNavigate } from 'react-router-dom';
//deletereques(id)
//createCourse(obj)
//enroll
const Tutor = (props) => {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem('user'));

  // console.log(props.courseObj);
  props.courseObj.tutor = props.tutor._id;
  props.courseObj.tutorname = props.tutor.name;
  props.courseObj.tutoremail = props.tutor.email;
  // console.log(props.courseObj);
  const onClickHandler = () => {
    createCourse(props.courseObj);
    enroll(props.courseObj._id, user.result._id);
    deleteRequest(props.courseObj._id);
    navigate('/');
  };
  const chatOnClick = () => {
    props.chatChange(props.tutor.name);
    props.setChat();
  };
  return (
    <Paper
      elevation={3}
      style={{
        padding: 30,
      }}
    >
      {/* <Typography sx={{ marginTop: 0, marginBottom: 0, minWidth: 0 }} variant="h6">
      Tutee &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Course
    </Typography> */}
      <Typography sx={{ marginRight: 3, marginBottom: 0, minWidth: 0 }} variant="h6">
        {props.tutor.name}
      </Typography>
      <Typography sx={{ marginRight: 3, marginBottom: 0, minWidth: 0 }} variant="body1">
        ID: {props.tutor.abacId}
      </Typography>
      <Typography sx={{ marginRight: 3, marginBottom: 0, minWidth: 0 }} variant="body1">
        GPA: {props.tutor.gpa}
      </Typography>
      <Typography sx={{ marginRight: 3, marginBottom: 0, minWidth: 0 }} variant="body1">
        Year: {props.tutor.year}
      </Typography>
      <Typography sx={{ marginRight: 3, marginBottom: 0, minWidth: 0, maxWidth: 300 }} variant="body1">
        About the teacher: {props.tutor.aboutMe}
      </Typography>

      <Box display="flex">
        <Button size="medium" onClick={chatOnClick}>
          Chat
        </Button>
        <Button size="medium" onClick={onClickHandler}>
          Confirm
        </Button>
      </Box>
    </Paper>
  );
};

export default Tutor;
