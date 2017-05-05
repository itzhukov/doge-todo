import React, { Component } from 'react';
import * as ActionTypes from 'actions/app';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

@connect(
  (state) => ({
    categoryes: state.app.get('categoryes')
  }),
  (dispatch) => ({
    actions: bindActionCreators(ActionTypes, dispatch)
  })
)

export default class Main extends Component {
  static propTypes = {
    categoryes: PropTypes.object
  }

  constructor(){
    super();
  }

  inputCategoryHandler(event) {
      this.refs.newCategoryName.classList.remove('add-category__category-name_inputError');
  }

  addSubCategoryHandler(parentCategoryId) {
    const { actions } = this.props;

    actions.addSubCategory(parentCategoryId);
  }

  addCategoryHandler(event) {
    event.preventDefault();

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

  render() {
    const { categoryes, actions } = this.props;

    return (
      <div className="app-todo">
        <form action="" className="add-category" onSubmit={this.addCategoryHandler.bind(this)}>
          <input onInput={this.inputCategoryHandler.bind(this)} ref="newCategoryName" type="text" className="add-category__category-name"/>
          <button onClick={this.addCategoryHandler.bind(this)} type="button" className="add-category__button-add-category">
            Add category
          </button>
        </form>
        <div className='category-list'>
          {
            categoryes.reverse().map( (category, i) => {
              {
                return (category.id !== 0)
                ? <div key={i} className="category-list__category">
                    {`${category.id} — ${category.name}`}
                    <button onClick={this.addSubCategoryHandler.bind(this, category.id)} type="button" className="category-list__category__button-add-sub-category">
                      +
                    </button>
                  </div>
                : null
              }
            })
          }
        </div>
      </div>
    );
  }
}
