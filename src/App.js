import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <div className="app__body shadow rounded">
        <Router>
          <Switch>
            <Route path="/app">
              <Sidebar />
              <Chat />
            </Route>
            <Route path="/">
              <h1>Hello World</h1>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
