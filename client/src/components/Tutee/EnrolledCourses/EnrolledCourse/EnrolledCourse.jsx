import React from 'react';
import { Card, CardContent, Button, CardActions, Typography } from '@mui/material';
import { withdraw } from '../../../../api/index.js';
import emailjs from '@emailjs/browser';

function EnrolledCourse(props) {
  emailjs.init('hRz_fkfNSAGvLLvGM');
  let user = JSON.parse(localStorage.getItem('user'));
  var storedNames = JSON.parse(localStorage.getItem('names'));
  function onClickHandler() {
    props.chatChange(props.course.tutorname);
    // console.log(props.course.tutor);

    var templateParams = {
      tutor_name: props.course.tutorname,
      tutee_name: user.result.name,
      tutor_email: props.course.tutoremail,
    };

    // console.log(templateParams);
    if (!storedNames.includes(props.course.tutoremail)) {
      emailjs.send('service_t2vs5kr', 'contact_form', templateParams).then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text);
        },
        function (error) {
          console.log('FAILED...', error);
        }
      );
    }
    storedNames.push(props.course.tutoremail);
    localStorage.setItem('names', JSON.stringify(storedNames));
    // console.log(storedNames);
    props.setChat();
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6">{props.course.course}</Typography>
        <Typography variant="h7" sx={{ textDecoration: 'underline' }}>
          {props.course.tutorname}
        </Typography>
        <Typography>{props.course.type}</Typography>
        <Typography>{props.course.price} Baht/Hour</Typography>
        <Typography>{props.course.availability}</Typography>
        <Typography>{props.course.details}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onClickHandler}>
          Chat
        </Button>
        <Button
          size="small"
          onClick={() => {
            withdraw(props.course._id);
            props.setForceRender((prev) => prev + 1);
          }}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}

export default EnrolledCourse;
