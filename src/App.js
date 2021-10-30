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
import Chat from "./Components/Chat";
import Call from "./Components/Call";
import Chatbox from "./Components/Chatbox";
import Setting from "./Components/Setting";
import NoteState from './context/notes/NoteState';

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
        <Route exact path="/chatbox">
          <Chatbox />
        </Route>
        <Route exact path="/settings">
          <Setting/>
        </Route>
        <Route path="/main-page">
          <Navbar />
          <Switch>
            <Route exact path="/main-page/chats">
              <Chat />
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
