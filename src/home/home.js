import React, { useState } from "react";
import { Link } from "react-router-dom";

function Homepage(props) {
  const {chat, myusername, socket, getusername, chats, setchatno} = props;
  getusername();
  const roomname = chat._id;
  const username = myusername;

  const sendData = () => {
    setchatno(chats.indexOf(chat));
    socket.emit("joinRoom", {username, roomname });
    }


  return (
    <div
    className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
    style={{ width: "100vw" }}
  >
    <div className="list-group list-group-flush border-bottom scrollarea">
      <Link
        onClick={sendData}
        to={`/chat/${roomname}/${myusername}`}
        id="link"
        className="list-group-item list-group-item-action py-3 lh-tight"
      >
        <div className="d-flex w-100 align-items-center justify-content-between">
          <strong className="mb-1">
          {chat.username[chat.username[0] === myusername ? 1 : 0]}
          </strong>
          <small className="text-muted">
          {chat.chats.date[chat.chats.date.length - 1]}
          </small>
        </div>
        <div className="col-10 mb-1 small">
        {chat.chats.msg[chat.chats.msg.length - 1]}
        </div>
      </Link>
    </div>
  </div>
  );
}

export default Homepage;
