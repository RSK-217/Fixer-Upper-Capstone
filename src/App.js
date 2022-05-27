import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import './App.css';
import ApplicationViews from "./components/ApplicationViews";
import { NavBar } from "./components/nav/NavBar";

const App = () => {
  return (
    <>
      <Route
        render={() => {
          if (localStorage.getItem("fixer_user")) {
            return (
              <>
                <NavBar />
                <ApplicationViews />
              </>
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />

      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </>
  );
}

export default App;
