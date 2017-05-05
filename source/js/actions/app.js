import * as ActionTypes from '../constants/ActionTypes';

export const addCategory = (name, activeCategoryId) => ({ type: ActionTypes.ADD_CATEGORY, name, activeCategoryId })
export const addSubCategory = (payload) => ({ type: ActionTypes.ADD_SUB_CATEGORY, payload })
export const selectActiveCategory = (selectedCategoryId, activeCategoryId) => ({ type: ActionTypes.SELCT_ACTIVE_CATEGORY, selectedCategoryId, activeCategoryId })
export const addTask = (text, activeCategoryId) => ({ type: ActionTypes.ADD_TASK, text, activeCategoryId })
