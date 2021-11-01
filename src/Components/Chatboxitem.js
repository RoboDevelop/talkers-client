import React from "react";
import { Link, useHistory } from "react-router-dom";
import Msg from "./Msg";

const Chatboxitem = (props) => {
  const { chats, getChats, username, myusername, chatno } = props;
  const history = useHistory();

  const routeChange = () => {
    let path = `/main-page/chats`;
    history.push(path);
  };


  let msg = "";
  const sendmsg = async (e) => {
    e.preventDefault();
    document.getElementById("msg").value = "";
    const response = await fetch(
      `https://talkers0.herokuapp.com/api/chats/updatechat/${chats[chatno]._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "user-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          
          msg: msg,
        }),
      }
    );
    const json = await response.json();
    if (json.error) {
      alert(json.error);
    }
    getChats();
  };

  const onChange = (e) => {
    msg = e.target.value;
  };

  return (
    <>
      <div class="main-container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
          <div className="container-fluid">
            <Link to="/main-page/chats">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-90deg-left text-dark"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"
                />
              </svg>
            </Link>

            <Link
              to="#"
              className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none"
              id="dropdownUser3"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            ></button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="#">
                    {username}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div id="msgcontainer" className="my-5">
          {chats[chatno].chats.date.map((date) => {
            return (
              <Msg
                key={chats[chatno].chats.date.indexOf(date)}
                date={date}
                chat={chats[chatno]}
                username={username}
                myusername={myusername}
              />
            );
          })}
        </div>
        <form class="row g-3" onSubmit={sendmsg}>
          <div class="col-auto">
            <label for="inputPassword2" class="visually-hidden">
              Enter something
            </label>
            <input
              type="text"
              class="form-control"
              placeholder=" Enter something"
              name="msg"
              id="msg"
              onChange={onChange}
            />
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary mb-3">
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chatboxitem;
