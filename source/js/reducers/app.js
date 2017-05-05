import * as ActionTypes from '../constants/ActionTypes';
import { Map, List } from 'immutable';

const initialTasks = List([]);

const initialCategoryes = List([{
  id: 0,
  parentId: 0,
  name: 'root'
}]);

const initialState = Map({
  activeCategoryId: 0,
  lastCategoryId: 0,
  lastTaskId: 0,
  counter: 0,
  categoryes: initialCategoryes,
  tasks: initialTasks,
  filt: {
    searchText: '',
    onlySuccess: false
  }
});

export default function app(previousState = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.ADD_TASK:
        let newTaskId = previousState.get('lastTaskId') + 1;
        let oldTasks = previousState.get('tasks');

        return previousState.mergeDeep(Map({
          lastTaskId: newTaskId,
          tasks: oldTasks.concat(List([
            {
              id: newTaskId,
              text: action.text,
              parentId: action.activeCategoryId
            }
          ]))
        }));
        break;

    case ActionTypes.SELCT_ACTIVE_CATEGORY:
        let selectedCategoryId = (action.selectedCategoryId == action.activeCategoryId ) ? 0 : action.selectedCategoryId

        return previousState.merge({
          activeCategoryId: selectedCategoryId
        });
        break;

    case ActionTypes.ADD_SUB_CATEGORY:
        console.log('ADD_SUB_CATEGORY', action.payload);
        return previousState.merge({});
        break;

    case ActionTypes.ADD_CATEGORY:
        let newCategoryId = previousState.get('lastCategoryId') + 1 ;
        let oldCategoryes = previousState.get('categoryes');

        return previousState.mergeDeep(Map({
          lastCategoryId: newCategoryId,
          categoryes: oldCategoryes.concat(List([
            {
              id: newCategoryId,
              parentId: action.activeCategoryId,
              name: action.name
            }
          ]))
        }));
        break;

    default:
        return previousState.merge({});
  }
}
