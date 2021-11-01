import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Navbar from "./Components/Navbar";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
// import Chat from "./Components/Chat";
import Chat from "./chat/chat";
import Call from "./Components/Call";
import Setting from "./Components/Setting";
import NoteState from "./context/notes/NoteState";
import io from "socket.io-client";
import Chats from "./Components/Chat";

const socket = io.connect("/");
function Appmain(props) {
  return (
    <React.Fragment>
      <Chat
        username={props.match.params.username}
        roomname={props.match.params.roomname}
        socket={socket}
      />
    </React.Fragment>
  );
}


export const App = () => {
  return (
    <>
      <NoteState>
        <Router>
          <Switch>
            <Route exact path="/">
              <Signin />
            </Route>
            <Route exact path="/Signup">
              <Signup />
            </Route>
            <Route path="/chat/:roomname/:username" component={Appmain} />
            <Route exact path="/settings">
              <Setting />
            </Route>
            <Route path="/main-page">
              <Navbar />
              <Switch>
                <Route exact path="/main-page/chats" socket={socket}>
                  <Chats socket={socket} />
                </Route>
                <Route exact path="/main-page/calls">
                  <Call />
                </Route>
                <Route exact path="/main-page/explore">
                  <Call />
                </Route>
                <Route exact path="/main-page/news">
                  <Call />
                </Route>
              </Switch>
            </Route>
          </Switch>
        </Router>
      </NoteState>
    </>
  );
};

export default App;
