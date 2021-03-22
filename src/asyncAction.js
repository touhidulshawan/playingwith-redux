const redux = require("redux");
const applyMiddleware = redux.applyMiddleware;
const reduxThunk = require("redux-thunk").default;
const axios = require("axios");

const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_ERROR = "FETCH_USER_ERROR";

// initial state

const initialState = {
  isLoading: false,
  users: [],
  error: "",
};

// action

const requestAction = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

const successAction = (users) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
  };
};

const errorAction = (error) => {
  return {
    type: FETCH_USER_ERROR,
    payload: error,
  };
};

// reducer of app

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_USER_SUCCESS:
      return {
        isLoading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USER_ERROR:
      return {
        isLoading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(requestAction());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data;
        dispatch(successAction(users));
      })
      .catch((error) => {
        dispatch(errorAction(error.message));
      });
  };
};

const store = redux.createStore(reducer, applyMiddleware(reduxThunk));
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchUsers());
