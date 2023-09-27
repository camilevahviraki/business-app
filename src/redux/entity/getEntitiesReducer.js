import axios from 'axios';
import linkURL from '../link';

const GET_ENTITIES_LIST = 'redux/store/home_page/GET_ENTITIES_LIST';

const getEntitiesReducuer = (
  state = {
    data: [],
  },
  action,
) => {
  switch (action.type) {
    case GET_ENTITIES_LIST: {
      return {
        data: action.data,
      };
    }
    default:
      return state;
  }
};

export const getEntities = (user, token) => (dispatch) => {
  axios.get(`${linkURL}/entities`).then((response) => {
    dispatch({
      type: GET_ENTITIES_LIST,
      data: response.data,
    });
  });
};

export default getEntitiesReducuer;
