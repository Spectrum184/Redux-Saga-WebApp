import * as taskConstants from "../constants/task";
import { toastError } from "../helpers/toastHelper";

const initialState = {
  listTask: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case taskConstants.FETCH_TASK: {
      return {
        ...state,
        listTask: [],
      };
    }

    case taskConstants.FECTH_TASK_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listTask: data,
      };
    }

    case taskConstants.FECTH_TASK_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
        listTask: [],
      };
    }

    case taskConstants.FILTER_TASK_SUCCESS: {
      const { data } = action.payload;
      return {
        state,
        listTask: data,
      };
    }

    case taskConstants.ADD_TASK: {
      return {
        ...state,
      };
    }

    case taskConstants.ADD_TASK_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listTask: [data].concat(state.listTask),
      };
    }

    case taskConstants.ADD_TASK_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default reducer;
