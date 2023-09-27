import axios from 'axios';
import linkURL from '../link';

const GET_ENTITY = 'redux/store/home_page/GET_ENTITY';

const getSingleEntityReducer = (
  state = {},
  action,
) => {
  switch (action.type) {
    case GET_ENTITY: {
      return action.data
    }
    default:
      return state;
  }
};

export const getEntity = (id, token) => (dispatch) => {
  axios.get(`${linkURL}/entity/${id}`).then((response) => {
    dispatch({
      type: GET_ENTITY,
      data: response.data,
    });
  });
};

export default getSingleEntityReducer;
