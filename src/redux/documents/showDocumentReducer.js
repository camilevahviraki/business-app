import axios from 'axios';
import linkURL from '../link';

const SHOW_DOCUMENT = 'redux/store/home_page/SHOW_DOCUMENT';

const showDocumentReducer = (
  state = [],
  action,
) => {
  switch (action.type) {
    case SHOW_DOCUMENT: {
      return action.data
    }
    default:
      return state;
  }
};

export const getDocument = (id, token) => (dispatch) => {
  axios.get(`${linkURL}/document/${id}`).then((response) => {
    dispatch({
      type: SHOW_DOCUMENT,
      data: response.data,
    });
  });
};

export default showDocumentReducer;
