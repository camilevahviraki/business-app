import axios from 'axios';
import linkURL from '../link';

const CREATE_DEPARTMENT = 'redux/store/createDepartmentReducer/CREATE_DEPARTMENT';
const DELETE_DEPARTMENT = 'redux/store/createEntityReducer/DELETE_DEPARTMENT';
const DELETE_DEPARTMENT_RESPONSE = 'redux/store/createCartsReducer/DELETE_DEPARTMENT_RESPONSE';

const createDepartmentReducer = (state = { message: null }, action) => {
  switch (action.type) {
    case CREATE_DEPARTMENT: {
      return action.data;
    } case DELETE_DEPARTMENT: {
      return action.data;
    } case DELETE_DEPARTMENT_RESPONSE: {
      return {message: null}
    }
    default:
      return state;
  }
};

export const deleteDepartmentResponse = () => ({
  type: DELETE_DEPARTMENT_RESPONSE,
});

export const createNewDepartment = (data, token) => (dispatch) => {
  axios
    .post(`${linkURL}/department/new`, data)
    .then((response) => {
      dispatch({
        type: CREATE_DEPARTMENT,
        data: response.data,
      });
    })
    .catch((_err) => {
      dispatch({
        type: CREATE_DEPARTMENT,
        data: {
          error: 'Error while creating cart-item!',
          message: null,
        },
      });
    });
};

export const deleteDepartment = (id, token) => (dispatch) => {
  axios
    .get(`${linkURL}/department/delete/${id}`)
    .then((response) => {
      dispatch({
        type: DELETE_DEPARTMENT,
        data: response.data,
      });
    })
    .catch((_err) => {
      dispatch({
        type: DELETE_DEPARTMENT,
        data: {
          error: 'Error while deleting department!',
          message: null,
        },
      });
    });
};

export default createDepartmentReducer;
