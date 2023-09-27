import axios from 'axios';
import linkURL from '../link';

const GET_USER = 'redux/store/home_page/GET_USER';

const getUserReducer = (
  state = {users: {}},
  action,
) => {
  switch (action.type) {
    case GET_USER: {
      return action.data
    }
    default:
      return state;
  }
};

export const getUser = (id, token) => (dispatch) => {
  axios.get(`${linkURL}/user/${id}`).then((response) => {
    dispatch({
      type: GET_USER,
      data: response.data,
    });
  });
};

export default getUserReducer;
