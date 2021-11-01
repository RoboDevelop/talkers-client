import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const [chats, setChats] = useState([]);
  const username = "";
  const [chatno, setchatno] = useState(0);
  const host = "https://talkers0.herokuapp.com"
  const [myusername, setmyusername] = useState([])


  // Get user
  const getusername = async () => {
    // API Call
    const response = await fetch(`${host}/api/user/getuserinfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setmyusername(json.username);
  };


  // Get all Chats
  const getChats = async () => {
    // API Call
    const response = await fetch(`${host}/api/chats/fetchallchats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "user-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setChats(json);
  };
  

  // Add a Chat
  const addChat = async (addusername) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/chats/addchat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "user-token": localStorage.getItem('token'),
    },
      body: JSON.stringify({addusername})
    });

    const chat = await response.json();
    setChats(chats.concat(chat))
  }

  // // Delete a Note
  // const deleteChat = async (id) => {
  //   // API Call
  //   const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "user-token":
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3OTg1NGI1MDgyYTEyM2E1ODIxYjY2In0sImlhdCI6MTYzNTQxNDMzOX0.ehM6Gbjumb3WErOm4Uczp3unsm72Zfp_ybsGCKolwAw",
  //   },
  //   });
  //   const newChats = chats.filter((chat) => { return chat._id !== id })
  //   setNotes(newChats)
  // }

  // Edit a Note
  const updateChat = async (msg, id) => {
    // API Call 
    const response = await fetch(`${host}/api/chats/updatechat/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "user-token": localStorage.getItem('token'),
    },
      body: JSON.stringify({msg})
    });

    // Logic to edit in client
        chats.chats.msg.push(msg);
        chats.chats.username.push(myusername);
        chats.chats.date.push(Date.now());
    
  }
  

  return (
    <NoteContext.Provider
      value={{ chats, setChats, username, chatno, setchatno, getusername, myusername,setmyusername, getChats, addChat, updateChat}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
