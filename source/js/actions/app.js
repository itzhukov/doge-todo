import * as ActionTypes from '../constants/ActionTypes';

export const addCategory = (payload) => ({ type: ActionTypes.ADD_CATEGORY, payload })
export const addSubCategory = (payload) => ({ type: ActionTypes.ADD_SUB_CATEGORY, payload })
export const selectActiveCategory = (payload) => ({ type: ActionTypes.SELCT_ACTIVE_CATEGORY, payload })
export const addTask = (text, activeCategoryId) => ({ type: ActionTypes.ADD_TASK, text, activeCategoryId })
