import axios from 'axios';
import linkURL from '../link';

const GET_ALL_DEPARTMENT = 'redux/store/home_page/GET_ALL_DEPARTMENT';

const getAllDepartmentReducer = (
  state = [],
  action,
) => {
  switch (action.type) {
    case GET_ALL_DEPARTMENT: {
      return action.data
    }
    default:
      return state;
  }
};

export const getAllDepartment = (id, token) => (dispatch) => {
  axios.get(`${linkURL}/departments`).then((response) => {
    dispatch({
      type: GET_ALL_DEPARTMENT,
      data: response.data,
    });
  });
};

export default getAllDepartmentReducer;
