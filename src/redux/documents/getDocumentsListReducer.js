import axios from 'axios';
import linkURL from '../link';

const GET_DOCUMENTS = 'redux/store/home_page/GET_DOCUMENTS';
const SEARCH_DOCUMENTS = 'redux/store/home_page/SEARCH_DOCUMENTS';

const getDocumentsReducer = (
  state = [],
  action,
) => {
  switch (action.type) {
    case GET_DOCUMENTS: {
      return action.data
    }
    default:
      return state;
  }
};

export const getDocuments = (id, token) => (dispatch) => {
  axios.get(`${linkURL}/documents/${id}`).then((response) => {
    dispatch({
      type: GET_DOCUMENTS,
      data: response.data,
    });
  });
};

export const searchDocument = (data, token) => (dispatch) => {
  axios.get(`${linkURL}/user/${data.id}/document/search/${data.query}`,).then((response) => {
    dispatch({
      type: GET_DOCUMENTS,
      data: response.data,
    });
  });
};

export default getDocumentsReducer;
