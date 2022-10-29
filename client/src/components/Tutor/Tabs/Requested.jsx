import React, { useState, useEffect } from 'react';
import RequestCourses from '../RequestCourses/RequestCourses';
import { IconButton, InputAdornment, TextField, Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import SearchBar from '../../SearchBar';
import SearchIcon from '@mui/icons-material/Search';
function Requested() {
  const [searchvalue, setsearchvalue] = useState('');
  return (
    <Container maxWidth="xl">
      {/* <SearchBar value={textFieldValue} onChange={(newValue) => setTextFieldValue(newValue)} onSearch={handleSearch} /> */}
      <Grid container justify="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={8}>
          <Typography sx={{ marginTop: 9, marginBottom: 3, minWidth: 200 }} variant="h4">
            Requested
          </Typography>
          <TextField
            sx={{ marginBottom: 3 }}
            value={searchvalue}
            onChange={(e) => setsearchvalue(e.target.value)}
            placeholder="Enter Course Name"
            style={{ width: 450 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <RequestCourses searchvalue={searchvalue} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Requested;
