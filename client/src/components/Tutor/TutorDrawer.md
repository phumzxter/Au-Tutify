import React from 'react';
import { IconButton, Typography, Box, Toolbar, List, Drawer, Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ApprovalIcon from '@mui/icons-material/Approval';
import SchoolIcon from '@mui/icons-material/School';
import logo from '../../assets/logo.png';
import ChatIcon from '@mui/icons-material/Chat';

const TutorDrawer = (props) => {
  let user = JSON.parse(localStorage.getItem('user'));

  function onClickHandler(event) {
    let component = event.target.value;
    props.changeComponent(component);
  }

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          alignItems: 'center',
          width: 240,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />

      <img src={logo} alt="logo" width="40%" border-radius="50%" padding-left="50px" sx={{ mx: 'auto', width: 200 }} />

      {/* <h1 color="#3498DB">Au Tutor</h1> */}
      <Typography sx={{ marginTop: 3 }} component="h1" variant="h4" color="#3498DB">
        Au Tutor
      </Typography>
      <Divider />
      <List>
        <Divider sx={{ my: 1 }} />
        <ListItemButton value="teaching" onClick={onClickHandler}>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Teaching" />
        </ListItemButton>
        <ListItemButton value="requested" onClick={onClickHandler}>
          <ListItemIcon>
            <ApprovalIcon />
          </ListItemIcon>
          <ListItemText primary="Requested" />
        </ListItemButton>

        <ListItemButton value="students" onClick={onClickHandler}>
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItemButton>

        <ListItemButton value="chat" onClick={onClickHandler}>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
      </List>

      <Box position="absolute" bottom="0px">
        <Typography sx={{ bottom: 0 }} variant="h8">
          {user?.result.name}
        </Typography>
        <IconButton sx={{ bottom: 0 }} onClick={props.logout}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default TutorDrawer;
