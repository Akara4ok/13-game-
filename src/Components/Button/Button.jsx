import React from "react";
import classes from "./Button.module.scss";

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className={classes.myButton}
        onClick={this.props.onClick}
        type="button"
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
