import React, { Component } from "react";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import "../css/bootstrap.min.css";

let history = createBrowserHistory({});

class Header extends Component {
  logoutMethod = async () => {
    await this.props.logoutMethod();
    history.push("");
    window.location.reload();
  };

  renderHeader = () => {
    let loggedHeader = (
      <div className="container">
        <div className="alert-success p-4" style={{ fontWeight: "bolder" }}>
          {" "}
          welcome!! {this.props.userName}
        </div>
        <br />
        <div className="btn-group">
          <button
            className="btn btn-outline-info"
            // onClick={() => {
            //   history.push("/convlist");
            // }}
          >
            <Link className="btn btn-outline-info" to="/convlist">
              Conversations
            </Link>
          </button>
          <button
            className="btn btn-outline-info"
            // onClick={() => {
            //   history.push("/userlist");
            // }}
          >
            <Link className="btn btn-outline-info" to="/userlist">
              Users
            </Link>
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={this.logoutMethod}
          >
            log out
          </button>
        </div>
      </div>
    );
    let unLoggedHeader = <div />;
    return this.props.loggedIn ? loggedHeader : unLoggedHeader;
  };

  render() {
    return this.renderHeader();
  }
}

export default Header;
