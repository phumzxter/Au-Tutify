import React, { useState, useEffect } from 'react';
import AvailableCourses from '../AvailableCourses/AvailableCourses';
import { IconButton, InputAdornment, TextField, Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import ClearIcon from '@mui/icons-material/Clear';
import SearchBar from '../../SearchBar';
// import SearchBar from "@mkyy/mui-search-bar";

function Available() {
  const [searchvalue, setsearchvalue] = useState('');

  return (
    <Container maxWidth="xl">
      {/* <SearchBar value={textFieldValue} onChange={(newValue) => setTextFieldValue(newValue)} onSearch={handleSearch} /> */}
      <Grid container justify="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={8}>
          <Typography sx={{ marginTop: 9, marginBottom: 3, minWidth: 200 }} variant="h4">
            Available
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

          <AvailableCourses searchvalue={searchvalue} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Available;
