import * as ActionTypes from '../constants/ActionTypes';
import { Map } from 'immutable';
import { createSelector } from 'reselect';

const initialState = Map({
  lastId: 0,
  counter: 0,
  categoryes: [
    {
      id: 0,
      name: 'root'
    }
  ],
  tasks: [],
  filt: {
    searchText: '',
    onlySuccess: false
  }
});

export default function app(previousState = initialState, action = {}) {
  const payload = action.payload || null;

  switch (action.type) {
    case ActionTypes.ADD_CATEGORY:
      const newId = previousState.get('lastId') + 1 ;

      console.log(newId);
        return previousState.merge({
          lastId: newId
        });
      break;

    case ActionTypes.TEST_ACTION:

      return previousState.merge({});
      break;

    default:
      return previousState.merge({});
  }
}
