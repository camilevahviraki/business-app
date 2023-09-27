import axios from 'axios';
import linkURL from '../link';

const GET_DEPARTMENT = 'redux/store/home_page/GET_DEPARTMENT';

const getDepartmentReducer = (
  state = {},
  action,
) => {
  switch (action.type) {
    case GET_DEPARTMENT: {
      return action.data
    }
    default:
      return state;
  }
};

export const getDepartment = (id, token) => (dispatch) => {
  axios.get(`${linkURL}/department/${id}`).then((response) => {
    dispatch({
      type: GET_DEPARTMENT,
      data: response.data,
    });
  });
};

export default getDepartmentReducer;
