import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { IconButton, Typography, Box, Drawer, Toolbar, List, CssBaseline, Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
// import {LibraryBooks,Approval,School} from "@mui/icons-material"
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ApprovalIcon from '@mui/icons-material/Approval';
import SchoolIcon from '@mui/icons-material/School';
import logo from '../../assets/logo.png';
import ChatIcon from '@mui/icons-material/Chat';

import Available from './Tabs/Available';
import ChatTab from './Tabs/ChatTab';
import Dashboard from './Tabs/Dashboard';
import Requests from './Tabs/Requests';

const drawerWidth = 240;

export default function TuteePage() {
  let alerted = localStorage.getItem('alerted');

  useEffect(() => {
    document.title = 'Tutee';
    if (alerted === 'false') {
      alert('Welcome to Tutify! Start your 1on1 tutorship now!');
      localStorage.setItem('alerted', 'true');
    }
  }, []);

  const theme = useTheme();
  const navigate = useNavigate();
  const [component, setcomponent] = useState('');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.clear(); // already clearing
    navigate('/tutee/login');
  };
  let user = JSON.parse(localStorage.getItem('user'));

  //for 1on1 chat
  const [username, setUsername] = useState('');

  function chatChange(id) {
    setUsername(id);
  }

  //for tutors subpage in requested
  const [requestsView, setView] = React.useState(true);
  const setRequestsView = () => {
    setView(true);
  };
  const [courseObj, setCourseObj] = useState({});
  const showTutorsAndSetCourseObj = (courseid) => {
    setView(false);
    setCourseObj(courseid);
  };

  //for clicking on drawer: requests
  function setAndView() {
    setcomponent('requests');
    setView(true);
  }

  function setChat() {
    setcomponent('chat');
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            alignItems: 'center',
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />

        <img src={logo} alt="logo" width="40%" border-radius="50%" padding-left="50px" sx={{ mx: 'auto', width: 200 }} />

        <Typography sx={{ marginTop: 3 }} component="h1" variant="h4" color="#3498DB">
          Au Tutee
        </Typography>

        <Divider />
        <List>
          <Divider sx={{ my: 1 }} />
          <ListItemButton onClick={() => setcomponent('dashboard')}>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton onClick={() => setcomponent('available')}>
            <ListItemIcon>
              <ApprovalIcon />
            </ListItemIcon>
            <ListItemText primary="Available" />
          </ListItemButton>

          <ListItemButton onClick={setAndView}>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Requests" />
          </ListItemButton>
          <ListItemButton onClick={() => setcomponent('chat')}>
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
            {/* {console.log(user?.result.password)} */}
          </Typography>
          <IconButton sx={{ bottom: 0 }} onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <DrawerHeader /> */}
        {component == '' || component == 'dashboard' ? (
          <Dashboard setChat={setChat} chatChange={chatChange} />
        ) : component == 'available' ? (
          <Available />
        ) : component == 'requests' ? (
          <Requests setChat={setChat} chatChange={chatChange} requestsView={requestsView} setRequestsView={setRequestsView} courseObj={courseObj} showTutorsAndSetCourseObj={showTutorsAndSetCourseObj} />
        ) : (
          <ChatTab chatUsername={username} />
        )}
      </Box>
    </Box>
  );
}
