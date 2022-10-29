import React from 'react';
import { Box, Button, Paper, Container, Grid, Typography, CircularProgress } from '@mui/material';

const Student = (props) => {
  function onClickHandler() {
    props.redirectToChat(props.tutee.name);
    // props.chatChange(props.tutee.name);
  }

  return (
    <Paper
      elevation={2}
      style={{
        padding: 30,
      }}
    >
      {/* <Typography sx={{ marginTop: 0, marginBottom: 0, minWidth: 0 }} variant="h6">
          Tutee &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Course
        </Typography> */}
      <Box display="flex">
        <Typography sx={{ marginRight: 3, marginBottom: 0, minWidth: 0 }} variant="h6">
          {props.tutee.name}
        </Typography>
        <Button size="medium" onClick={onClickHandler}>
          Chat
        </Button>
      </Box>
    </Paper>
  );
};

export default Student;
