import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from './logger/logger';
import logger from './logger/thunk';
import authenticationReducer from './authentication/signUpReducer';
import createEntityReducer from './entity/createEntityReducer';
import getEntitiesReducuer from './entity/getEntitiesReducer';
import getSingleEntityReducer from './entity/getSingleEntity';
import createDepartmentReducer from './department/createDepartmentReducer';
import getDepartmentReducer from './department/getDepartmentReducer';
import getUserReducer from './user/getUserReducer';
import createDocumentReducer from './documents/createDocumentReducer';
import getUsersListReducer from './user/getUsersListReducer';
import getDocumentsReducer from './documents/getDocumentsListReducer';
import getAllDepartmentReducer from './department/getAllDepartments';
import showDocumentReducer from './documents/showDocumentReducer';
import userPermissionReducer from './user/updatePermissionReducer';

const rootReducer = combineReducers({
  authenticationReducer,
  createEntityReducer,
  getEntitiesReducuer,
  getSingleEntityReducer,
  createDepartmentReducer,
  getDepartmentReducer,
  getUserReducer,
  createDocumentReducer,
  getUsersListReducer,
  getDocumentsReducer,
  getAllDepartmentReducer,
  showDocumentReducer,
  userPermissionReducer

});

const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk),
);

export default store;
