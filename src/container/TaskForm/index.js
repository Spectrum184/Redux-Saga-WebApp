import { Box, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import * as modalActions from "../../actions/modal";
import * as tasklActions from "../../actions/task";
import renderTextField from "../../components/FormHelper/TextField";
import { FORM_NAME } from "../../constants/form";
import styles from "./styles";
import validate from "../../commons/validate";

class TaskForm extends Component {
  handleSubmitForm = (data) => {
    const { taskActionsCreators } = this.props;
    const { addTask } = taskActionsCreators;
    const { title, description } = data;

    addTask(title, description);
  };

  render() {
    const {
      classes,
      modalActionCreators,
      handleSubmit,
      invalid,
      submitting,
    } = this.props;
    const { hideModal } = modalActionCreators;
    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <Grid container spacing={8}>
          <Grid item md={12}>
            <Field
              name="title"
              id="title"
              label="Tiêu đề"
              className={classes.textField}
              margin="normal"
              component={renderTextField}
            />
          </Grid>
          <Grid item md={12}>
            <Field
              name="description"
              id="description"
              label="Mô tả"
              className={classes.textField}
              margin="normal"
              component={renderTextField}
            />
          </Grid>
          <Grid item md={12}>
            <Box display="flex" flexDirection="row-reverse">
              <Box ml={1}>
                <Button
                  disabled={invalid || submitting}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Lưu lại
                </Button>
              </Box>
              <Button color="secondary" variant="contained" onClick={hideModal}>
                Hủy bỏ
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
  return {
    modalActionCreators: bindActionCreators(modalActions, dispatch),
    taskActionsCreators: bindActionCreators(tasklActions, dispatch),
  };
};

TaskForm.propTypes = {
  classes: PropTypes.object,
  modalActionCreators: PropTypes.shape({
    hideModal: PropTypes.func,
  }),
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  taskActionsCreators: PropTypes.shape({
    addTask: PropTypes.func,
  }),
};

const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withReduxForm,
)(TaskForm);
