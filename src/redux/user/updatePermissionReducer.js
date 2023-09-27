import axios from 'axios';
import linkURL from '../link';

const UPDATE_PERMISSION = 'redux/store/home_page/UPDATE_PERMISSION';
const DELETE_PERMISSION_RESPONSE = 'redux/store/home_page/DELETE_PERMISSION_RES'

const userPermissionReducer = (
  state = {message: null},
  action,
) => {
  switch (action.type) {
    case UPDATE_PERMISSION: {
      return action.data
    }
    case DELETE_PERMISSION_RESPONSE: {
        return {message: null}
      }
    default:
      return state;
  }
};

export const deletePermissionResponse = () => ({
    type: DELETE_PERMISSION_RESPONSE,
  });

export const updatePermission = (id, permissions) => (dispatch) => {
  axios.post(`${linkURL}/user/${id}/permission/edit`, {permissions}).then((response) => {
    dispatch({
      type: UPDATE_PERMISSION,
      data: response.data,
    });
  });
};

export default userPermissionReducer;
