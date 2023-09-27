import axios from 'axios';
import linkURL from '../link';

const GET_USERS = 'redux/store/home_page/GET_USERS';

const getUsersListReducer = (
  state = [],
  action,
) => {
  switch (action.type) {
    case GET_USERS: {
      return action.data
    }
    default:
      return state;
  }
};

export const getUsersList = (token) => (dispatch) => {
  axios.get(`${linkURL}/users`).then((response) => {
    dispatch({
      type: GET_USERS,
      data: response.data,
    });
  });
};

export const searchUser = (query, token) => (dispatch) => {
  axios.get(`${linkURL}/user/search/${query}`).then((response) => {
    dispatch({
      type: GET_USERS,
      data: response.data,
    });
  });
};

export default getUsersListReducer;
