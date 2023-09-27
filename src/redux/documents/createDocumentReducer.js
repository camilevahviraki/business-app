import axios from 'axios';
import linkURL from '../link';

const CREATE_DOCUMENT = 'redux/store/createDocumentReducer/CREATE_DOCUMENT';
const DELETE_DOCUMENT = 'redux/store/createEntityReducer/DELETE_DOCUMENT';
const DELETE_DOCUMENT_RESPONSE = 'redux/store/createCartsReducer/DELETE_DOCUMENT_RESPONSE';
const EDIT_DOCUMENT = 'redux/store/createDocumentReducer/EDIT_DOCUMENT';

const createDocumentReducer = (state = { message: null }, action) => {
  switch (action.type) {
    case CREATE_DOCUMENT: {
      return action.data;
    } case DELETE_DOCUMENT: {
      return action.data;
    } case DELETE_DOCUMENT_RESPONSE: {
      return {message: null}
    }case EDIT_DOCUMENT: {
      return action.data;
    }
    default:
      return state;
  }
};

export const deleteDocumentResponse = () => ({
  type: DELETE_DOCUMENT_RESPONSE,
});

export const createNewDocument = (data, token) => (dispatch) => {
  axios
    .post(`${linkURL}/document/new`, data, {headers: {
        'Content-Type': 'multipart/form-data',
      },})
    .then((response) => {
      dispatch({
        type: CREATE_DOCUMENT,
        data: response.data,
      });
    })
    .catch((_err) => {
      dispatch({
        type: CREATE_DOCUMENT,
        data: {
          error: 'Error while creating cart-item!',
          message: null,
        },
      });
    });
};

export const deleteDocument = (id, token) => (dispatch) => {
  axios
    .get(`${linkURL}/document/delete/${id}`)
    .then((response) => {
      dispatch({
        type: DELETE_DOCUMENT,
        data: response.data,
      });
    })
    .catch((_err) => {
      dispatch({
        type: DELETE_DOCUMENT,
        data: {
          error: 'Error while deleting document!',
          message: null,
        },
      });
    });
};

export const editDocument = (data, token) => (dispatch) => {
  axios.post(`${linkURL}/document/update`, data).then((response) => {
    dispatch({
      type: EDIT_DOCUMENT,
      data: response.data,
    });
  });
};

export default createDocumentReducer;
