import React, { Component } from "react";
import * as axiosClient from "axios";
import "../css/bootstrap.min.css";

var axios = axiosClient.default;

class UserList extends Component {
  state = {
    userList: null,
    selectedUser: null,
    selectedChat: null
  };

  authCheck = () => {
    if (!this.props.loggedIn) {
      this.props.history.push("");
    }
  };

  //method for getting the userList into component
  getUserListMethod = async () => {
    let userName = this.props.userName;
    let useCase = "getUserList";
    let res = await axios.post("http://localhost:9000/chat", {
      userName,
      useCase
    });

    if (res.status == 200) {
      this.setState({ userList: res.data.userArray });
      console.log(this.state.userList);
    }
  };

  selectUser = async item => {
    await this.setState({ selectUser: item.userName });
    let sender = this.props.userName;
    let reciever = item.userName;
    console.log(sender, reciever);
    let useCase = "getSingleConv";
    axios
      .post("http://localhost:9000/chat", { sender, reciever, useCase })
      .then(async res => {
        if (res.status == 200) {
          await this.setState({ selectedChat: res.data.id });
          await this.props.handleSelectedConValue(this.state.selectedChat);
          await this.props.history.push(`/chatbox/:${reciever}`);
        }
      });
  };

  componentWillMount = () => {
    this.authCheck();
  };

  componentDidMount = async () => {
    await this.getUserListMethod();
  };

  componentWillUpdate() {
    this.authCheck();
  }

  UserRender() {
    if (this.state.userList != null)
      return (
        <div>
          <br />
          <div className="container">
            {this.state.userList.map(item => {
              return (
                <div
                  className="alert alert-info"
                  key={item.userName}
                  onClick={() => {
                    this.selectUser(item);
                  }}
                >
                  {item.userName}
                </div>
              );
            })}
          </div>
        </div>
      );
    else {
      return (
        <div>
          <br />
          <div className="container mt-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return this.UserRender();
  }
}

export default UserList;
