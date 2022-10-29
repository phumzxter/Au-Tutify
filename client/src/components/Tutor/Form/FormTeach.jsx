import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import ComboBox from './Form_Components/allCoursesList';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import { allCoursesList } from './Form_Components/allCoursesList';
import { createCourse } from '../../../api/index';

function FormTeach(props) {
  let user = JSON.parse(localStorage.getItem('user'));
  const [courseData, setCourseData] = React.useState({
    course: '',
    availability: '',
    price: '',
    details: '',
    type: '',
    tutorname: user.result.name,
    tutor: user.result._id,
    tutoremail: user.result.email,
  });

  const clear = () => {
    //   setCurrentId(0);
    setCourseData({
      course: '',
      availability: '',
      price: '',
      type: '',
      details: '',
      tutorname: user.result.name,
      tutor: user.result._id,
      tutoremail: user.result.email,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(typeof courseData.price);
    if (isNaN(courseData.price)) {
      alert('Please input a number for price');
      setCourseData({ ...courseData, price: '' });
    } else {
      createCourse(courseData);
      clear();
    }
    console.log('submit');
    props.setForceRender((prev) => prev + 1);
  };

  return (
    <Paper elevation={3} sx={{ padding: 5, marginTop: 5 }}>
      <form onSubmit={handleSubmit}>
        <Typography sx={{ marginBottom: 3, minWidth: 200 }} variant="h4">
          Teach a Course
        </Typography>

        <Autocomplete
          sx={{ m: 1 }}
          disablePortal
          autoSelect
          freeSolo
          options={allCoursesList}
          renderInput={(params) => <TextField {...params} label="Course" />}
          // defaultValue={courseData.course}
          value={courseData.course}
          onChange={(event, value) => {
            setCourseData({ ...courseData, course: value });
          }}
          isOptionEqualToValue={(option, value) => option.value === value.value}
        />
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel>Type</InputLabel>
          <Select value={courseData.type} onChange={(e) => setCourseData({ ...courseData, type: e.target.value })} label="Type">
            <MenuItem value="Online">Online</MenuItem>
            <MenuItem value="Offline">Offline</MenuItem>
            <MenuItem value="Both">Both</MenuItem>
          </Select>
        </FormControl>

        <Grid container>
          <Grid item>
            <TextField sx={{ m: 1, maxWidth: 100 }} name="price" variant="outlined" label="Price" value={courseData.price} onChange={(e) => setCourseData({ ...courseData, price: e.target.value })} />
          </Grid>
          <Grid item alignItems="stretch" style={{ marginTop: 23, display: 'flex' }}>
            <Typography>THB(฿)/Hour</Typography>
          </Grid>
        </Grid>

        <TextField sx={{ m: 1 }} name="availability" variant="outlined" label="Availability(e.g.Monday-Friday, 7pm-9pm)" fullWidth value={courseData.availability} onChange={(e) => setCourseData({ ...courseData, availability: e.target.value })} />

        <TextField sx={{ m: 1 }} name="details" variant="outlined" label="Course Details (e.g.Topics)" multiline rows={3} fullWidth value={courseData.details} onChange={(e) => setCourseData({ ...courseData, details: e.target.value })} />

        <Button sx={{ m: 1 }} variant="contained" color="blue" size="large" type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Paper>
  );
}

export default FormTeach;
