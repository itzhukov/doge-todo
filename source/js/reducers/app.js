import * as ActionTypes from '../constants/ActionTypes';
import { Map, List } from 'immutable';

const initialCategoryes = List([{
  id: 0,
  parentId: 0,
  name: 'root'
}]);

const initialState = Map({
  lastId: 0,
  counter: 0,
  categoryes: initialCategoryes,
  tasks: [],
  filt: {
    searchText: '',
    onlySuccess: false
  }
});

export default function app(previousState = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.ADD_SUB_CATEGORY:
      console.log('ADD_SUB_CATEGORY', action.payload);
      return previousState.merge({});
      break;

    case ActionTypes.ADD_CATEGORY:
      const newId = previousState.get('lastId') + 1 ;
      const oldCategoryes = previousState.get('categoryes');

      const newCat = List([{
        id: newId,
        parentId: 0,
        name: action.payload
      }]);

      const newState =  Map({
        lastId: newId,
        categoryes: oldCategoryes.concat(newCat)
      });

      return previousState.mergeDeep(newState);
      break;

    default:
      return previousState.merge({});
  }
}
