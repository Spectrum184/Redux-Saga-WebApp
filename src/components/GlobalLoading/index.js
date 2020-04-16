import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as uiAction from "../../actions/ui";
import loadingIcon from "../../assets/images/loading.gif";
import styles from "./styles";

class GlobalLoanding extends Component {
  render() {
    const { classes, showLoading } = this.props;
    let xhtml = null;
    if (showLoading === true) {
      xhtml = (
        <div className={classes.globalloading}>
          <img src={loadingIcon} alt="loading" className={classes.icon} />
        </div>
      );
    }
    return xhtml;
  }
}

GlobalLoanding.propTypes = {
  classes: PropTypes.object,
  showLoading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    showLoading: state.ui.showLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uiActions: bindActionCreators(uiAction, dispatch),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(GlobalLoanding);
