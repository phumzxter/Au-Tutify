import React, { useEffect } from 'react';
import { IconButton, Grid, TextField, Container, Typography, Paper, Box, Drawer, Toolbar, List, CssBaseline, Divider, ListItemButton, ListItemIcon, ListItemText, Button } from '@mui/material';
import { updateProfile } from '../../../api/index.js';
import { getTutor } from '../../../api/index.js';
const Profile = () => {
  let user = JSON.parse(localStorage.getItem('user'));

  const [tutor, setTutor] = React.useState({});

  useEffect(() => {
    getTutor(user.result._id).then((result) => {
      // console.log(typeof result.data);
      setTutor((prev) => ({ ...prev, ...result.data }));
      setProfile(() => ({ abacId: result.data.abacId, gpa: result.data.gpa, year: result.data.year, aboutMe: result.data.aboutMe }));
    });
  }, []);

  const [disabled, setDisabled] = React.useState(true);

  // console.log(tutor.abacId);
  const [profile, setProfile] = React.useState({
    // abacId: user.result.abacId,
    // gpa: user.result.gpa,
    // year: user.result.year,
    // aboutMe: user.result.aboutMe,
    abacId: '',
    gpa: '',
    year: '',
    aboutMe: '',
  });
  // console.log(profile);
  const edit = (e) => {
    e.preventDefault();
    setDisabled(false);
  };

  const cancel = () => {
    setDisabled(true);
    //   setCurrentId(0);
    setProfile({
      abacId: tutor.abacId,
      gpa: tutor.gpa,
      year: tutor.year,
      aboutMe: tutor.aboutMe,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(user.result._id, profile);
    setDisabled(true);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // console.log(typeof courseData.price);
  //   if (isNaN(courseData.price)) {
  //     alert('Please input a number for price');
  //     setCourseData({ ...courseData, price: '' });
  //   } else {
  //     createCourse(courseData);
  //     clear();
  //   }
  //   console.log('submit');
  //   props.setForceRender((prev) => prev + 1);
  // };

  return (
    <Container>
      <Typography sx={{ marginTop: 9, marginBottom: 3, minWidth: 200 }} variant="h4">
        Your Profile
      </Typography>

      <Paper elevation={3} sx={{ padding: 5, marginTop: 5 }}>
        <form onSubmit={handleSubmit}>
          <Typography sx={{ marginBottom: 3, minWidth: 200 }} variant="h4">
            {user.result.name}
          </Typography>
          <TextField sx={{ m: 1, maxWidth: 200 }} fullWidth label="ID" value={profile.abacId} onChange={(e) => setProfile({ ...profile, abacId: e.target.value })} disabled={disabled} />
          <Grid container>
            <Grid item>
              <TextField sx={{ m: 1, maxWidth: 100 }} label="GPA" value={profile.gpa} onChange={(e) => setProfile({ ...profile, gpa: e.target.value })} disabled={disabled} />
            </Grid>
            <Grid item style={{ marginTop: 23, display: 'flex' }}>
              <Typography>GPA</Typography>
            </Grid>
          </Grid>
          <TextField sx={{ m: 1, maxWidth: 250 }} fullWidth label="Year at University (1-4)" value={profile.year} onChange={(e) => setProfile({ ...profile, year: e.target.value })} disabled={disabled} />
          <TextField sx={{ m: 1 }} multiline rows={5} fullWidth label="About me" value={profile.aboutMe} onChange={(e) => setProfile({ ...profile, aboutMe: e.target.value })} disabled={disabled} />

          {disabled ? (
            <Button sx={{ m: 1 }} onClick={edit}>
              Edit
            </Button>
          ) : (
            <div>
              <Button sx={{ m: 1 }} type="submit">
                Save
              </Button>
              <Button onClick={cancel}>Cancel</Button>
            </div>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default Profile;
