import React from "react";

const Msg = (props) => {
  const { date, key, chat, username, myusername } = props;
  console.log(chat.date.indexOf(date));
  return (
    <div className="card">
      <h1
        className={
          myusername === chat.username[chat.date.indexOf(date)]
            ? "text-end"
            : "text-start"
        }
        style={{ clear: "both" }}
      >
        {chat.username[chat.date.indexOf(date)]}:{" "}
        {chat.msg[chat.date.indexOf(date)]}
      </h1>
    </div>
  );
};

export default Msg;
