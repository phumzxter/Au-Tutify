import React from 'react';
import { ChatEngine, getOrCreateChat } from 'react-chat-engine';

const Chat = (props) => {
  let user = JSON.parse(localStorage.getItem('user'));
  // console.log(user.result._id);
  // console.log(user.result.password);

  function createDirectChat(creds) {
    // getOrCreateChat(creds, { is_direct_chat: true, usernames: [props.chatUsername] }, () => setUsername(''));
    getOrCreateChat(creds, { is_direct_chat: true, usernames: [props.chatUsername] });
  }
  if (props.chatUsername === '') {
    return <ChatEngine height="90vh" projectID="d0021a06-6b27-4aeb-8947-e1098463a913" userName={user?.result.name} userSecret={user?.result.password} />;
  }
  return <ChatEngine renderNewChatForm={(creds) => createDirectChat(creds)} height="90vh" projectID="d0021a06-6b27-4aeb-8947-e1098463a913" userName={user?.result.name} userSecret={user?.result.password} />;
};

export default Chat;
