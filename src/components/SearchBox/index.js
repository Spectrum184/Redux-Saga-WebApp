import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./styles";

class SearchBox extends Component {
  render() {
    const { classes, handleChange } = this.props;
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          autoComplete="off"
          className={classes.textField}
          margin="normal"
          onChange={handleChange}
          placeholder="Nhập vào đây"
        />
      </form>
    );
  }
}

SearchBox.propTypes = {
  classes: PropTypes.object,
  handleChange: PropTypes.func,
};

export default withStyles(styles)(SearchBox);
