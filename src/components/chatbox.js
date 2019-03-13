import React, { Component } from "react";
import * as axiosClient from "axios";
import * as io from "socket.io-client";

import "../css/bootstrap.min.css";

var axios = axiosClient.default;

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      msgArray: null,
      text: "",
      room: "",
      reciever: ""
    };
  }

  authCheck = () => {
    if (!this.props.loggedIn) {
      this.props.history.push("");
    }
  };

  joinRoom = async () => {
    await this.state.socket.emit("room", this.state.room);
    console.log("join room called");
  };

  sendMsg = async () => {
    this.state.socket.emit("text", {
      room: this.state.room,
      text: this.state.text,
      sender: this.props.userName,
      reciever: this.state.reciever,
      conversationId: this.props.selectedConversation
    });
  };

  // dateModify = str => {
  //   let arr = str.split("T");
  //   let dateArr = arr[0].subString(6).split("-");
  //   let timeArr = arr[1].split(":");
  //     let h =  (parseInt(timeArr[0],10) + 5)%24
  //     if(h<tparseInt(timeArr[0],10))
  //     {
  //       dateArr[1] =
  //     }
  // };

  //--------------------lifecycle methods-----------------------------------------------

  componentWillMount = async () => {
    this.authCheck();
  };

  componentDidMount = async () => {
    console.log("props id for chatbox is", this.props.selectedConversation);
    let id = this.props.selectedConversation;
    let useCase = "getConvDetails";

    await axios
      .post("http://localhost:9000/chat", { id, useCase })
      .then(async res => {
        console.log(res.data);

        if (res.status == 200) {
          let reciever = res.data.conv.users.filter(item => {
            return item != this.props.userName;
          })[0];

          await this.setState({
            room: res.data.conv.room,
            msgArray: res.data.conv.msgArray,
            reciever: reciever
          });
          let elem = document.getElementById("chat-box");
          elem.scrollTop = elem.scrollHeight;
          console.log("chatbox conv details", this.state);
        }
      });

    let socket = await io.connect("http://localhost:9000/chatbox");
    this.setState({ socket });
    console.log("chatbox", this.state);
    if (this.state.socket) this.joinRoom();
    this.state.socket.on("message", data => {
      console.log("message rec", data);
      let msgArray = this.state.msgArray;
      msgArray.push(data);
      this.setState({ msgArray });
      let elem = document.getElementById("chat-box");
      elem.scrollTop = elem.scrollHeight;
    });
  };

  componentWillUnmount = async () => {
    this.state.socket.close();
    this.authCheck();
  };

  //-------------------------------render------------------------------------------------------

  render() {
    return (
      <div className="container">
        <div />
        <br />
        <div
          id="chat-box"
          style={{
            width: "540px",
            height: "400px",
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgba(200,200,200,.8)",
            overflow: "auto"
          }}
          className="container"
        >
          {/* <button onClick={this.joinRoom}>connect to room</button> */}
          <br />
          {this.state.msgArray ? (
            this.state.msgArray.map(msg => {
              // console.log(msg._id);
              return (
                <div
                  className={
                    msg.sender == this.props.userName
                      ? "alert alert-primary"
                      : "alert alert-secondary"
                  }
                  key={msg._id}
                >
                  <strong>{msg.sender}</strong>
                  <br />
                  {msg.text}
                  <span
                    className={
                      msg.sender == this.props.userName
                        ? "badge badge-primary"
                        : "badge badge-secondary"
                    }
                    style={{ float: "right" }}
                  >
                    {msg.updatedAt}
                  </span>
                </div>
              );
            })
          ) : (
            <div />
          )}
        </div>
        <div style={{ position: "fixed", bottom: "2px", right: "1px" }}>
          <textarea
            className="form-control"
            onChange={e => {
              this.setState({ text: e.target.value });
            }}
          />
          <button
            className="btn btn-outline-success"
            disabled={this.state.text == "" ? true : false}
            onClick={this.sendMsg}
          >
            send
          </button>
        </div>
      </div>
    );
  }
}

export default ChatBox;
