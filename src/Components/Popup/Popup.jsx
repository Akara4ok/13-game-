import React from "react";
import classes from "./Popup.module.scss";

class Popup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className={classes.backdrop}>{this.props.children}</div>;
  }
}

export default Popup;
