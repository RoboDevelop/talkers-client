import React from "react";

const Msg = (props) => {
  const { msg, chat, username } = props;
  return (
    <h1 className={username === chat.username ? "float-end" : "float-start"} style={{clear:"both"}}>
      {chat.username[chat.msg.indexOf(msg)]}: {msg}
    </h1>
  );
};

export default Msg;
