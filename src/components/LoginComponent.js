import React from "react";
import { useEffect } from "react";
import "../css/bootstrap.min.css";

var Login = props => {
  useEffect(() => {
    redirectCheck();
  });

  var redirectCheck = () => {
    if (props.loggedIn === true) props.history.push("/convlist");
  };
  return (
    <div className="container">
      username{" "}
      <input
        className="form-control"
        type="text"
        onChange={e => {
          props.handleUsernameValue(e);
        }}
      />
      <br />
      password{" "}
      <input
        className="form-control"
        type="text"
        onChange={e => {
          props.handlePasswordValue(e);
        }}
      />
      <br />
      <div
        style={{ display: "flex" }}
        className="btn-group"
        role="group"
        aria-label="Basic example"
      >
        <button
          className="btn btn-primary "
          onClick={() => {
            props.loginMethod("login");
            redirectCheck();
          }}
        >
          login
        </button>
        <button
          className="btn btn-info "
          onClick={() => {
            props.loginMethod("signup");
            redirectCheck();
          }}
        >
          signup
        </button>
      </div>
    </div>
  );
};

export default Login;
