import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

export default function Navbar() {
  const context = useContext(noteContext);
  const { setmyusername, addChat, chats, getChats, setChats, setusername } = context;
  let username = "";

  const finduser = async (e) => {
    e.preventDefault();
    chats.forEach(element => {
      if(!element.username.includes(username)){
        addChat();
      }
    });
  };

  const onChange = (e) => {
    username = e.target.value;
  };

  const signout = () => {
    setChats([]);
    localStorage.removeItem("token");
    history.push("/");
  };

  const location = useLocation();

  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <h2 className="position-absolute  start-50 translate-middle-x">
            {" "}
            <i>Talkers</i>{" "}
          </h2>
          <Link
            to="/"
            className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
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
          <ul
            className="dropdown-menu text-small shadow"
            aria-labelledby="dropdownUser3"
            style={{ top: "70px" }}
          >
            <li>
              <Link className="dropdown-item" to="/">
                Profile
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/settings">
                Settings
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <p className="dropdown-item" onClick={signout}>
                Sign out
              </p>
            </li>
          </ul>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/main-page/chats" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/main-page/chats"
                >
                  Chats
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/main-page/calls" ? "active" : ""
                  }`}
                  to="/main-page/calls"
                >
                  Calls
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/main-page/explore" ? "active" : ""
                  }`}
                  to="/main-page/explore"
                >
                  Explore
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/main-page/news" ? "active" : ""
                  }`}
                  to="/main-page/news"
                >
                  News
                </Link>
              </li>
            </ul>
            <form className="d-flex" onSubmit={finduser}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Find new users"
                aria-label="Search"
                name="username"
                id="username"
                onChange={onChange}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
