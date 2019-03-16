import React from "react";
import { useState, useEffect } from "react";
import "../css/bootstrap.min.css";

var Login = props => {
  const [minLength, setMinLength] = useState(4);
  const [showlength, setShowlength] = useState(false);

  useEffect(() => {
    redirectCheck();
  });

  useEffect(() => {
    if (props.userName < minLength) setShowlength(true);
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
      {/* <br /> */}
      {showlength && minLength > props.userName.length ? (
        <span className="badge badge-danger">{`${minLength -
          props.userName.length} more characters`}</span>
      ) : (
        <span className="badge badge-success">good to go !</span>
      )}
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
          disabled={props.username.length < minlegth ? true : false}
        >
          login
        </button>
        <button
          className="btn btn-info "
          onClick={() => {
            props.loginMethod("signup");
            redirectCheck();
          }}
          disabled={props.username.length < minlegth ? true : false}
        >
          signup
        </button>
      </div>
    </div>
  );
};

export default Login;
