import * as actions from '../source/js/actions/app'
import * as types from '../source/js/constants/ActionTypes'

describe('Actions', () => {

  it('addCategory', () => {
    const name = 'Cat 1'
    const activeCategoryId = 0
    const expectedAction = { type: types.ADD_CATEGORY, name, activeCategoryId }
    expect(actions.addCategory('Cat 2', activeCategoryId)).toEqual(expectedAction)
  });

  it('addTask', () => {
    const text = 'Finish docs'
    const activeCategoryId = '1'
    const expectedAction = { type: types.ADD_TASK, text, activeCategoryId }
    expect(actions.addTask(text, activeCategoryId)).toEqual(expectedAction)
  });

});
