import React from "react";

const Msg = (props) => {
  const { date, key, chat, username, myusername } = props;
  return (

    <div className={`message ${myusername === chat.chats.username[chat.chats.date.indexOf(date)]? "right" : "left"}`}>{chat.chats.msg[chat.chats.date.indexOf(date)]}</div>
  
  );
};

export default Msg;
