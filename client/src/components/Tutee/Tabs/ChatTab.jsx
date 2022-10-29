import React from 'react';
import { Typography } from '@mui/material';
import Chat from '../Chat/Chat';
import Container from '@mui/material/Container';
import { TextField, Button, Paper, Grid } from '@mui/material';

const ChatTab = (props) => {
  return <Chat chatUsername={props.chatUsername} />;
};

export default ChatTab;
