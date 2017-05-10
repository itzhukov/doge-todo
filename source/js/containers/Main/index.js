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

  handleRemoveCategory(categoryId, event) {
    event.preventDefault();
    event.stopPropagation();

    const { actions } = this.props;

    actions.removeCategory(categoryId);
  }

  renderCategoryes(categoryes, parentId = 0) {
    const { activeCategoryId } = this.props;

    return categoryes.reverse().map( (category, i) => {
      let isSub = (category.parentId === 0) ? false : true;
      let activeClass = (isSub)
        ? "category-list__sub-category category-list__sub-category_active"
        : "category-list__category category-list__category_active";
      let normalClass = (isSub)
        ? "category-list__sub-category"
        : "category-list__category";
      let categotyClass = (category.id == activeCategoryId)
        ? activeClass
        : normalClass;

      return (category.id && category.parentId === parentId)
      ?
         <div
            key={i}
            onClick={this.selectActiveCategoryHander.bind(this, category.id)}
            className={categotyClass}>
          <div className="category-list__category__name">
            { `${category.id} — ${category.name}` }
            <div
              onClick={this.handleRemoveCategory.bind(this, category.id)}
              className="category-list__category__remove">x</div>
          </div>
          { this.renderCategoryes(categoryes, category.id) }
        </div>
      : null
    })
  }

  renderTasks() {
    const { actions, tasks, activeCategoryId } = this.props;

    return tasks.reverse().map( (task, i) => (
      (task.parentId == activeCategoryId)
      ?
        <div key={i} className="task-list__task">
          <div className="task-list__task__name">
            {`${task.text}`}
            <div
              onClick={actions.removeTask.bind(this, task.id)}
              className="task-list__task-remove">x</div>
          </div>
        </div>
      : null
    ))
  }

  render() {
    const { categoryes, activeCategoryId } = this.props;
    const addCategoryBtn = (activeCategoryId === 0) ? 'Add root-category': 'Add sub-category';
    const addTaskBtnDisabled =  (activeCategoryId) ? '' : 'disabled';

    return (
      <div className="app-todo">

        <div className="app-todo__categoryes">
            <form action="" className="add-category" onSubmit={ this.addCategoryHandler.bind(this) }>
              <input
                onInput={ this.inputCategoryHandler.bind(this) }
                onBlur={ this.inputCategoryHandler.bind(this) }
                ref="newCategoryName"
                type="text"
                className="add-category__category-name" />
              <button
                onClick={this.addCategoryHandler.bind(this)}
                type="button"
                className="add-category__button-add-category">
                {addCategoryBtn}
              </button>
            </form>
            <div className='category-list'>
              { this.renderCategoryes(categoryes) }
            </div>
        </div>

        <div className="app-todo__tasks">
            <form action="" className="add-task" onSubmit={ this.addTaskHandler.bind(this) }>
              <input
                onInput={ this.inputTaskHandler.bind(this) }
                onBlur={ this.inputTaskHandler.bind(this) }
                ref="newTaskName"
                type="text"
                className="add-task__task-name" />

              <button
                onClick={ this.addTaskHandler.bind(this) }
                type="button"
                disabled={ addTaskBtnDisabled }
                className="add-task__button-add-task">
                Add task
              </button>
            </form>
            <div className='task-list'>
              { this.renderTasks() }
            </div>

        </div>
      </div>
    );
  }
}
