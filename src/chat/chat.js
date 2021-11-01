import "./chat.scss";
import { to_Decrypt, to_Encrypt } from "../aes.js";
import { process } from "../store/action/index";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

function Chat({ username, socket }) {
  const context = useContext(noteContext);
  const { chats, chatno } = context;

  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();

  const dispatchProcess = (encrypt, msg, cipher) => {
    dispatch(process(encrypt, msg, cipher));
  };

  useEffect(() => {
    socket.on("message", (data) => {
      //decypt
      const ans = to_Decrypt(data.text, data.username);
      dispatchProcess(false, ans, data.text);
      console.log(ans);
      let temp = messages;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: ans,
      });
      setMessages([...temp]);
    });
  }, [socket]);

  const sendData = () => {
    if (text !== "") {
      //encrypt here
      const ans = to_Encrypt(text);
      socket.emit("chat", ans);
      setText("");
    }
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendmsg = async (e) => {
    const response = await fetch(
      `https://talkers0.herokuapp.com/api/chats/updatechat/${chats[chatno]._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "user-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          msg: text,
        }),
      }
    );
    const json = await response.json();
    if (json.error) {
      alert(json.error);
    }
  };

  return (
    <div className="chat" style={{ width: "100vw", height: "100vh" }}>
      <div className="user-name d-flex">
        <Link to="/main-page/chats">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-90deg-left text-light mx-2 "
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"
            />
          </svg>
        </Link>
        <h2 className="text-primary">
          {
            chats[chatno].username[
              chats[chatno].username[0] === username ? 1 : 0
            ]
          }
        </h2>
      </div>

      <div className="chat-message">
        {chats[chatno].chats.date.map((date) => {
          if (
            username ===
            chats[chatno].chats.username[chats[chatno].chats.date.indexOf(date)]
          ) {
            return (
              <div className="message mess-right bg-light">
                <p className="text-dark bg-light">
                  {
                    chats[chatno].chats.msg[
                      chats[chatno].chats.date.indexOf(date)
                    ]
                  }
                </p>
                <span>{username}</span>
              </div>
            );
          } else {
            return (
              <div className="message  bg-light">
                <p className="text-dark bg-light">
                  {
                    chats[chatno].chats.msg[
                      chats[chatno].chats.date.indexOf(date)
                    ]
                  }{" "}
                </p>
                <span>
                  {chats[chatno].chats.username[chats[chatno].chats.date.indexOf(date)]}
                </span>
              </div>
            );
          }
        })}

        
        {messages.map((i) => {
          if (i.username === username) {
            return (
              <div className="message mess-right bg-light">
                <p className="text-dark bg-light">{i.text}</p>
                <span>{username}</span>
              </div>
            );
          } else {
            return (
              <div className="message  bg-light">
                <p className="text-dark bg-light">{i.text} </p>
                <span>{i.username}</span>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="send">
        <input
          placeholder="enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendData();
              sendmsg();
            }
          }}
        ></input>
        <button onClick={(sendData, sendmsg)}>Send</button>
      </div>
    </div>
  );
}
export default Chat;
