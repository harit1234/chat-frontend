import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as axiosClient from "axios";
import { createBrowserHistory } from "history";

import Login from "./components/LoginComponent";
import ConversationList from "./components/conversationList";
import Header from "./components/header";
import ChatBox from "./components/chatbox";
import UserList from "./components/UserList";

import "./css/bootstrap.min.css";
import "./css/extra.css";

var axios = axiosClient.default;
let history = createBrowserHistory({});

class App extends Component {
  state = {
    userName: "",
    password: "",
    loggedIn: false,
    token: null,
    selectedConversation: null,
    userList: null
  };

  logoutMethod = async () => {
    await this.setState({
      userName: "",
      password: "",
      loggedIn: false,
      token: null,
      selectedConversation: null,
      userList: null
    });
    history.push("");
  };

  handleSelectedConValue = async str => {
    await this.setState({ selectedConversation: str });
    console.log("state in index", this.state.selectedConversation);
  };

  handleUsernameValue = e => {
    this.setState({ userName: e.target.value });
  };

  handlePasswordValue = e => {
    this.setState({ password: e.target.value });
  };

  loginMethod = async caseValue => {
    const userName = await this.state.userName;
    const password = await this.state.password;
    const useCase = caseValue;
    axios
      .post("https://backend-hrt-chat.herokuapp.com/auth", {
        userName,
        password,
        useCase
      })
      .then(async res => {
        // eslint-disable-next-line
        if (res.status == 200) {
          // console.log(res);
          await this.setState({ token: res.data.token, loggedIn: true });
          // console.log(this.state);
        } else console.log(res.data.msg);
      });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header {...this.state} logoutMethod={this.logoutMethod} />
          <Switch>
            <Route
              path="/chatbox/:id"
              render={props => <ChatBox {...this.state} {...props} />}
            />
            <Route
              path="/userlist"
              exact
              render={props => (
                <UserList
                  handleSelectedConValue={this.handleSelectedConValue}
                  {...this.state}
                  {...props}
                />
              )}
            />
            <Route
              path="/convlist"
              exact
              render={props => (
                <ConversationList
                  handleSelectedConValue={this.handleSelectedConValue}
                  {...this.state}
                  {...props}
                />
              )}
            />
            <Route
              path="/"
              exact
              render={props => (
                <Login
                  loginMethod={this.loginMethod}
                  handlePasswordValue={this.handlePasswordValue}
                  handleUsernameValue={this.handleUsernameValue}
                  {...this.state}
                  {...props}
                />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
