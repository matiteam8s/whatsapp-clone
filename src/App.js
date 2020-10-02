import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import { useStateValue } from "./StateProvider";

function App() {
  //state for the user
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {/* if there is no user logged in, render login screen. Otherwise, render the App. */}
      {!user ? (
        <Login />
      ) : (
        <div className="app__body shadow rounded">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
