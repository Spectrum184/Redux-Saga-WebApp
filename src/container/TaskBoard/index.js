import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as taskActions from "../../actions/task";
import * as modalActions from "../../actions/modal";
import TaskForm from "../TaskForm";
import TaskList from "../../components/TaskList";
import { STATUSES } from "../../constants";
import styles from "./styles";
import SearchBox from "../../components/SearchBox";

class TaskBoard extends Component {
  componentDidMount() {
    const { taskActionCreators } = this.props;
    const { fetchListTask } = taskActionCreators;
    fetchListTask();
  }

  openForm = () => {
    const { modalActionCreators } = this.props;
    const {
      showModal,
      changeModalTitle,
      changeModalContent,
    } = modalActionCreators;
    showModal();
    changeModalTitle("Thêm mới công việc");
    changeModalContent(<TaskForm />);
  };

  handleFilter = (e) => {
    const { value } = e.target;
    const { taskActionCreators } = this.props;
    const { filterTask } = taskActionCreators;
    filterTask(value);
  };

  renderBoard() {
    const { listTask } = this.props;
    let xhtml = null;
    xhtml = (
      <Grid container spacing={2}>
        {STATUSES.map((status) => {
          const taskFilter = listTask.filter(
            (task) => task.status === status.value,
          );
          return (
            <TaskList task={taskFilter} status={status} key={status.value} />
          );
        })}
      </Grid>
    );
    return xhtml;
  }

  renderSearchBox() {
    let xhtml = null;

    xhtml = <SearchBox handleChange={this.handleFilter} />;
    return xhtml;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.task}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.openForm}
        >
          <AddIcon />
          Thêm mới công việc
        </Button>
        {this.renderSearchBox()}
        {this.renderBoard()}
      </div>
    );
  }
}

TaskBoard.propTypes = {
  classes: PropTypes.object,
  taskActionCreators: PropTypes.shape({
    fetchListTask: PropTypes.func,
    filterTask: PropTypes.func,
  }),
  listTask: PropTypes.array,
  modalActionCreators: PropTypes.shape({
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    changeModalTitle: PropTypes.func,
    changeModalContent: PropTypes.func,
  }),
};

const mapStateToProps = (state) => {
  return {
    listTask: state.task.listTask,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    taskActionCreators: bindActionCreators(taskActions, dispatch),
    modalActionCreators: bindActionCreators(modalActions, dispatch),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(TaskBoard),
);
