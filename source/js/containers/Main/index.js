import React, { Component } from 'react';
import * as ActionTypes from 'actions/app';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

@connect(
  (state) => ({
    activeCategoryId: state.app.get('activeCategoryId'),
    categoryes: state.app.get('categoryes'),
    tasks: state.app.get('tasks')
  }),
  (dispatch) => ({
    actions: bindActionCreators(ActionTypes, dispatch)
  })
)

export default class Main extends Component {
  static propTypes = {
    activeCategoryId: PropTypes.number,
    categoryes: PropTypes.object,
    tasks: PropTypes.object
  }

  constructor(){
    super();
  }

  inputCategoryHandler(event) {
      event.preventDefault();
      event.stopPropagation();

      this.refs.newCategoryName.classList.remove('add-category__category-name_inputError');
  }

  addSubCategoryHandler(parentCategoryId, event) {
    event.preventDefault();
    event.stopPropagation();

    const { actions } = this.props;

    actions.addSubCategory(parentCategoryId);
  }

  addCategoryHandler(event) {
    event.preventDefault();
    event.stopPropagation();

    const { actions, activeCategoryId } = this.props;
    const name = this.refs.newCategoryName.value;

    if (name !== ''){
      actions.addCategory(name, activeCategoryId);
      this.refs.newCategoryName.value = '';
    } else {
      this.refs.newCategoryName.classList.add('add-category__category-name_inputError');
    }

    this.refs.newCategoryName.focus();
  }

  addTaskHandler(event) {
    event.preventDefault();
    event.stopPropagation();

    const { actions, activeCategoryId } = this.props;
    const text = this.refs.newTaskName.value;

    if (text !== '' && activeCategoryId){
      actions.addTask(text, activeCategoryId);
      this.refs.newTaskName.value = '';
    } else {
      this.refs.newTaskName.classList.add('add-task__task-name_inputError');
    }

    this.refs.newTaskName.focus();
  }

  inputTaskHandler(event) {
      event.preventDefault();
      event.stopPropagation();

      this.refs.newTaskName.classList.remove('add-task__task-name_inputError');
  }

  selectActiveCategoryHander(categoryId, event) {
    event.preventDefault();
    event.stopPropagation();

    const { actions, activeCategoryId } = this.props;

    actions.selectActiveCategory(categoryId, activeCategoryId);
    this.refs.newCategoryName.focus();
  }

  renderSubCategoryes(subCategoryes, parentId) {
    const { activeCategoryId } = this.props;

    return subCategoryes.reverse().map( (subCategory, i) => (
        (subCategory.parentId === parentId)
        ?
          <div
            onClick={this.selectActiveCategoryHander.bind(this, subCategory.id)}
            key={i}
            className={
              (subCategory.id == activeCategoryId)
              ? "category-list__sub-category category-list__sub-category_active"
              : "category-list__sub-category"
            }>
            <div className="category-list__category__name">
              {`${subCategory.parentId} — ${subCategory.id} — ${subCategory.name}`}
            </div>
            { this.renderSubCategoryes(subCategoryes, subCategory.id) }
          </div>
        : null
    ))
  }

  renderRootCategoryes() {
    const { categoryes, activeCategoryId } = this.props;

    return categoryes.reverse().map( (category, i) => (
      (category.id && category.parentId === 0)
      ?
        <div
          key={i}
          onClick={this.selectActiveCategoryHander.bind(this, category.id)}
          className={
            (category.id == activeCategoryId)
            ? "category-list__category category-list__category_active"
            : "category-list__category"
          }>
          <div className="category-list__category__name">
            {`${category.id} — ${category.name}`}
          </div>
          { this.renderSubCategoryes(categoryes, category.id) }
        </div>
      : null
    ))
  }

  renderTasks() {
    const { tasks, activeCategoryId } = this.props;

    return tasks.reverse().map( (task, i) => (
      (task.parentId == activeCategoryId)
      ?
        <div key={i} className="task-list__task">
          <div className="task-list__task__name">{`${task.text}`}</div>
        </div>
      : null
    ))
  }

  render() {
    const { activeCategoryId } = this.props;

    return (
      <div className="app-todo">
        <div className="app-todo__categoryes">

            <form action="" className="add-category" onSubmit={this.addCategoryHandler.bind(this)}>
              <input
                onInput={this.inputCategoryHandler.bind(this)}
                onBlur={this.inputCategoryHandler.bind(this)}
                ref="newCategoryName"
                type="text"
                className="add-category__category-name"/>

              <button
                onClick={this.addCategoryHandler.bind(this)}
                type="button"
                className="add-category__button-add-category">
                { (activeCategoryId === 0) ? 'Add category': 'Add sub-category'}</button>
            </form>

            <div className='category-list'>
              { this.renderRootCategoryes() }
            </div>

        </div>
        <div className="app-todo__tasks">

            <form action="" className="add-task" onSubmit={this.addTaskHandler.bind(this)}>
              <input
                onInput={this.inputTaskHandler.bind(this)}
                onBlur={this.inputTaskHandler.bind(this)}
                ref="newTaskName"
                type="text"
                className="add-task__task-name"/>

              <button
                onClick={this.addTaskHandler.bind(this)}
                type="button"
                disabled={ (activeCategoryId) ? '' : 'disabled' }
                className="add-task__button-add-task">Add task</button>
            </form>

            <div className='task-list'>
              { this.renderTasks() }
            </div>
        </div>
      </div>
    );
  }
}
