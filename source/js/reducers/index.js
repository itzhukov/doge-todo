import * as app from './app.js'
import { combineReducers} from 'redux-immutable';
const appReducer = app.app;

export default combineReducers({
  app: appReducer
});
