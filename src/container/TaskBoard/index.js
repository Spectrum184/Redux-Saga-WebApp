import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import TaskForm from "../../components/TaskForm";
import TaskList from "../../components/TaskList";
import { STATUSES } from "../../constants";
import styles from "./styles";

const listTask = [
  {
    id: 1,
    title: "Read book",
    description: "Read material book",
    status: 0,
  },
  {
    id: 2,
    title: "Play game",
    description: "play dota",
    status: 2,
  },
  {
    id: 3,
    title: "Football",
    description: "play fo4",
    status: 1,
  },
];

class TaskBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  openForm = () => {
    this.setState({
      open: true,
    });
  };

  renderForm() {
    let xhtml = null;
    const { open } = this.state;
    xhtml = <TaskForm open={open} onClose={this.handleClose} />;
    return xhtml;
  }

  renderBoard() {
    let xhtml = null;
    xhtml = (
      <Grid container spacing={2}>
        {STATUSES.map((status) => {
          const taskFilter = listTask.filter(
            (task) => task.status === status.value
          );
          return (
            <TaskList task={taskFilter} status={status} key={status.value} />
          );
        })}
      </Grid>
    );
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
        {this.renderBoard()}
        {this.renderForm()}
      </div>
    );
  }
}

TaskBoard.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(TaskBoard);