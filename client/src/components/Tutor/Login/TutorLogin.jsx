import React, { useState } from 'react';
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Stack, Switch } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { logIn, signUp } from '../../../api/index';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Au Tutify
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

export default function TutorLogin() {
  //switch role
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);
  const switchUserType = (event) => {
    navigate('/tutee/login');
  };

  //switch login signup
  const [isSignup, setIsSignup] = React.useState(false);
  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    // setShowPassword(false);
  };

  //form submit
  const [form, setForm] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignup) {
      signUp(form)
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('actualuser', JSON.stringify(response.data.user));
          //if you want ot get name email password or id or token somewhere.
          //just do const user = localStorage.getItem("user");
          //user.result.token, user.result.name...etc

          localStorage.setItem('role', 'tutor');
          localStorage.setItem('alerted', 'false');
          // console.log(localStorage.getItem("user"));
          // console.log(localStorage.getItem("token"));
          let user = JSON.parse(localStorage.getItem('user'));

          axios
            .post(
              'https://api.chatengine.io/users/',
              { username: user.result.name, secret: user.result.password }, // Body object
              {
                headers: {
                  'PRIVATE-KEY': 'cba1b633-91bd-4f6c-b6af-78e3d0fc2ff2',
                },
              } // Headers object
            )
            .then((r) => console.log(r));
          navigate('/tutor/dashboard');
        })
        .catch((error) => {
          if (error.response) {
            // console.log(error.response.data); // => the response payload
            alert(error.response.data.message);
          }
        });
    } else {
      logIn(form)
        .then(function (response) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('actualuser', JSON.stringify(response.data.result));

          // console.log(localStorage.getItem('actualuser'));
          // console.log(localStorage.getItem('user'));
          // alert(localStorage.getItem("user"));
          localStorage.setItem('role', 'tutor');
          navigate('/tutor/dashboard');
        })
        .catch((error) => {
          if (error.response) {
            // console.log(error.response.data); // => the response payload
            alert(error.response.data.message);
          }
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={logo} alt="Logo" width="25%" border-radius="50%" />
          <Typography component="h1" variant="h3" color="#3498DB" sx={{ marginBottom: 0, textDecoration: 'underline' }}>
            Au Tutify
          </Typography>
          <Typography component="h1" variant="subtitle2" color="#3498DB" sx={{ marginBottom: 3 }}>
            One to One Tutoring
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Tutor</Typography>
            <Switch checked={checked} onChange={switchUserType} />
            <Typography>Tutee</Typography>
          </Stack>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField onChange={handleChange} autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First Name" autoFocus />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField onChange={handleChange} required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name" />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <TextField onChange={handleChange} required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField onChange={handleChange} required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
              </Grid>
              {isSignup && (
                <Grid item xs={12}>
                  <TextField onChange={handleChange} required fullWidth name="confirmPassword" label="Repeat Password" type="password" id="password" autoComplete="new-password" />
                </Grid>
              )}
            </Grid>
            {/* <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" /> */}
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>
          </Box>
          <Grid container justifyContent="flex-end">
            {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
            <Grid item>
              <Link href="#" onClick={switchMode} variant="body2">
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
