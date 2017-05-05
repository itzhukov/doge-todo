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

    const { actions } = this.props;
    const name = this.refs.newCategoryName.value;

    if (name !== ''){
      actions.addCategory(name);
      this.refs.newCategoryName.value = '';
      this.refs.newCategoryName.focus();
    } else {
      this.refs.newCategoryName.classList.add('add-category__category-name_inputError');
    }
  }

  addTaskHandler(event) {
    event.preventDefault();
    event.stopPropagation();

    const { actions, activeCategoryId } = this.props;
    const text = this.refs.newTaskName.value;

    if (text !== '' && activeCategoryId){
      actions.addTask(text, activeCategoryId);
      this.refs.newTaskName.value = '';
      this.refs.newTaskName.focus();
    }
  }

  render() {
    const { categoryes, tasks, activeCategoryId, actions } = this.props;

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
                className="add-category__button-add-category">Add category</button>
            </form>

            <div className='category-list'>
              {
                categoryes.reverse().map( (category, i) => (
                  (category.id)
                  ? <div
                    onClick={actions.selectActiveCategory.bind(this, category.id)}
                    key={i}
                    className={ (category.id == activeCategoryId) ? "category-list__category category-list__category_active" : "category-list__category" }>
                      <div className="category-list__category__name">{`${category.id} — ${category.name}`}</div>
                      <button
                        onClick={this.addSubCategoryHandler.bind(this, category.id)}
                        type="button"
                        className="category-list__category__button-add-sub-category">+</button>
                    </div>
                  : null
                ))
              }
            </div>

        </div>
        <div className="app-todo__tasks">

            <form action="" className="add-task" onSubmit={this.addTaskHandler.bind(this)}>
              <input
                onInput={this.inputCategoryHandler.bind(this)}
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
              {

                  tasks.reverse().map( (task, i) => (
                    (task.parentId == activeCategoryId)
                    ?
                    <div
                      key={i}
                      className="task-list__task">
                        <div className="task-list__task__name">{`${task.id} — ${task.text}`}</div>
                      </div>
                      : null
                  ))

              }
            </div>
        </div>
      </div>
    );
  }
}
