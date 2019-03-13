import React, { Component } from "react";
import * as axiosClient from "axios";

var axios = axiosClient.default;

class ConversationList extends Component {
  // eslint-disable-next-line

  state = {
    conversationList: null,
    selectedChat: null
  };

  authCheck = () => {
    if (!this.props.loggedIn) {
      this.props.history.push("");
    }
  };

  getConversationListMethod = async () => {
    let userName = this.props.userName;
    let useCase = "getConvList";
    //get list array and user object id
    var res = await axios.post("http://localhost:9000/chat", {
      userName,
      useCase
    });

    await this.setState({ conversationList: res.data.conversationList });
    // console.log("state", this.state);
  };

  redirectToCB = async (str, id) => {
    console.log("redirectToCB executed", id);
    await this.setState({ selectedChat: id });
    console.log("state in conlist", this.state.selectedChat);
    await this.props.handleSelectedConValue(this.state.selectedChat);
    this.props.history.push(`/chatbox/:${str}`);
  };

  componentWillMount = async () => {
    this.authCheck();
    this.getConversationListMethod();
  };

  componentWillUnmount() {
    this.authCheck();
  }

  renderList = () => {
    // eslint-disable-next-line
    if (this.state.conversationList && this.state.conversationList != []) {
      return (
        //map the conversations in divs
        <div className="container">
          {this.state.conversationList.map(item => {
            //filtering the users so that the name of the contact is displayed
            let name = item.users.filter(userItem => {
              // eslint-disable-next-line
              return userItem != this.props.userName;
            });
            return (
              <div
                className="alert alert-info"
                key={item._id}
                onClick={async () => {
                  await this.redirectToCB(name[0], item._id);
                }}
              >
                {name[0]}
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <br />
        {this.renderList()}
      </div>
    );
  }
}

export default ConversationList;
