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

function findCat(findId, catList){
  let arrCategoryesToRemove = [];
  let arrSubCatsToRemove = [];

  catList.map( (item) => {
    if (item.parentId == findId) {
      arrCategoryesToRemove.push(item.id);
      let searchSub = findCat(item.id, catList);
      if (searchSub.length) arrSubCatsToRemove = arrSubCatsToRemove.concat(searchSub);
    }
  });

  if (arrSubCatsToRemove.length) arrCategoryesToRemove = arrCategoryesToRemove.concat(arrSubCatsToRemove);

  return arrCategoryesToRemove;
}

export default function app(previousState = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.REMOVE_CATEGORY:
      let removeCategoryId = action.categoryId;
      let removeCategoryesIds = [removeCategoryId];
      let activeCategoryId = previousState.get('activeCategoryId');
      let allCategoryes = previousState.get('categoryes');
      let allTasks = previousState.get('tasks');
      let subCatsIds = findCat(removeCategoryId, allCategoryes.toJS() );

      if (subCatsIds.length) removeCategoryesIds = removeCategoryesIds.concat(subCatsIds);

      return previousState.merge(Map({
        categoryes: allCategoryes.filter( (item) => {
          return ( !!~removeCategoryesIds.indexOf(item.id) ) ? null : item
        }),
        tasks: allTasks.filter( (item) => {
          return ( !!~removeCategoryesIds.indexOf(item.parentId) ) ? null : item
        }),
        activeCategoryId: ( !!~removeCategoryesIds.indexOf(activeCategoryId) ) ? 0 : activeCategoryId
      }));
      break;

    case ActionTypes.REMOVE_TASK:
      let removeTaskId = action.taskId;
      let filteredTasks = previousState.get('tasks').filter( (value, key, i) => {
        return (value.id != removeTaskId) ? value : null
      })

      return previousState.merge(Map({
        tasks: filteredTasks
      }));

      break;

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
