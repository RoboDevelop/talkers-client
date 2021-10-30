import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"
import Chatboxitem from './Chatboxitem';

export default function Chatbox() {
  const context = useContext(noteContext);
  const {chats, setChats, username, chat} = context;

  return (
    <Chatboxitem chats={chats} username={username} chat={chat}/>  
  );
}
