import axios from 'axios';
import linkURL from '../link';

const CREATE_ENTITY = 'redux/store/createEntityReducer/CREATE_ENTITY';
const DELETE_ENTITY = 'redux/store/createEntityReducer/DELETE_ENTITY';
const DELETE_ENTITY_RESPONSE = 'redux/store/createCartsReducer/DELETE_ENTITY_RESPONSE';

const createEntityReducer = (state = { message: null }, action) => {
  switch (action.type) {
    case CREATE_ENTITY: {
      return action.data;
    } case DELETE_ENTITY: {
      return action.data;
    } case DELETE_ENTITY_RESPONSE: {
      return {message: null}
    }
    default:
      return state;
  }
};

export const deleteEntityResponse = () => ({
  type: DELETE_ENTITY_RESPONSE,
});

export const createNewEntity = (data, token) => (dispatch) => {
  axios
    .post(`${linkURL}/entity/new`, data, {headers: {
      'Content-Type': 'multipart/form-data',
    },})
    .then((response) => {
      dispatch({
        type: CREATE_ENTITY,
        data: response.data,
      });
    })
    .catch((_err) => {
      dispatch({
        type: CREATE_ENTITY,
        data: {
          error: 'Error while creating cart-item!',
          message: null,
        },
      });
    });
};

export const deleteEntity = (id, token) => (dispatch) => {
  axios
    .delete(`${linkURL}/entity/delete/${id}`)
    .then((response) => {
      dispatch({
        type: DELETE_ENTITY,
        data: response.data,
      });
    })
    .catch((_err) => {
      dispatch({
        type: DELETE_ENTITY,
        data: {
          error: 'Error while deleting cart-item!',
          message: null,
        },
      });
    });
};

export default createEntityReducer;
