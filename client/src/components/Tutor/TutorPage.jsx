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
import Requested from './Tabs/Requested';
// import StudentsTab from './Tabs/StudentsTab';
import Teaching from './Tabs/Teaching';
import ChatTab from './Tabs/ChatTab';
import Profile from './Tabs/Profile';

const drawerWidth = 240;

export default function TutorPage() {
  let alerted = localStorage.getItem('alerted');
  useEffect(() => {
    document.title = 'Tutor';
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
    navigate('/tutor/login');
    localStorage.clear(); // already clearing
  };
  let user = JSON.parse(localStorage.getItem('user'));
  // console.log(user.result.name);

  //students page
  const [courseId, setCourseId] = React.useState({});

  const [viewCourses, setView] = React.useState(true);

  function studentFunction(id) {
    setView(false);
    setCourseId(id);
  }

  function viewChange() {
    setView(true);
  }

  function setAndView() {
    setcomponent('teaching');
    setView(true);
  }

  //chat change
  //1 create chat
  //chat
  const [username, setUsername] = useState('');

  // function chatChange(id) {
  //   setUsername(id);
  // }
  //2 redirect chat
  function redirectToChat(name) {
    setcomponent('chat');
    setUsername(name);
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

        {/* <h1 color="#3498DB">Au Tutor</h1> */}
        <Typography sx={{ marginTop: 3 }} component="h1" variant="h4" color="#3498DB">
          Au Tutor
        </Typography>
        <Divider />
        <List>
          <Divider sx={{ my: 1 }} />
          <ListItemButton onClick={setAndView}>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Teaching" />
          </ListItemButton>
          <ListItemButton onClick={() => setcomponent('requested')}>
            <ListItemIcon>
              <ApprovalIcon />
            </ListItemIcon>
            <ListItemText primary="Requested" />
          </ListItemButton>

          <ListItemButton onClick={() => setcomponent('profile')}>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
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
          </Typography>
          <IconButton sx={{ bottom: 0 }} onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <DrawerHeader /> */}
        {component == '' || component == 'teaching' ? (
          <Teaching redirectToChat={redirectToChat} courseId={courseId} viewCourses={viewCourses} studentFunction={studentFunction} viewChange={viewChange} />
        ) : component == 'requested' ? (
          <Requested />
        ) : component == 'profile' ? (
          <Profile />
        ) : (
          <ChatTab chatUsername={username} />
        )}
      </Box>
    </Box>
  );
}
//<Teaching chatChange={chatChange} />
