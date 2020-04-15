import * as taskAPI from "../apis/task";
import * as taskConstants from "../constants/task";

export const fetchListTaskRequest = () => {
  return (dispatch) => {
    dispatch(fetchListTask());
    taskAPI
      .getList()
      .then((res) => {
        const { data } = res;
        dispatch(fetchListTaskSuccess(data));
      })
      .catch((err) => {
        dispatch(fetchListTaskFailed(err));
      });
  };
};

export const fetchListTaskSuccess = (data) => {
  return {
    type: taskConstants.FECTH_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const fetchListTask = () => {
  return {
    type: taskConstants.FETCH_TASK,
  };
};

export const fetchListTaskFailed = (error) => {
  return {
    type: taskConstants.FECTH_TASK_FAILED,
    payload: {
      error,
    },
  };
};
