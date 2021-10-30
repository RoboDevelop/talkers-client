import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"
import Chatboxitem from './Chatboxitem';

export default function Chatbox() {
  const context = useContext(noteContext);
  const {chats, getChats, setChats, username, myusername, chat} = context;

  return (
    <Chatboxitem getChats={getChats} chats={chats} username={username}  myusername={myusername} chat={chat}/>  
  );
}
