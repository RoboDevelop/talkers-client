import React from "react";

const Msg = (props) => {
  const { date, key, chat, username, myusername } = props;
  return (

    <div className={`message ${myusername === chat.username[chat.date.indexOf(date)]? "right" : "left"}`}>{chat.msg[chat.date.indexOf(date)]}</div>
  
  );
};

export default Msg;
