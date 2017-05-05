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

  render() {
    const { categoryes, actions } = this.props;

    return (
      <div className='category-list'>
        <form action="" className="add-category">
          <input type="text" className="add-category__category-name"/>
          <button
            onClick={actions.addCategory.bind(this)}
            type="button"
            className="add-category__button-add-category">
            Add
          </button>
        </form>
        {
          categoryes.map( (category, i) => {
            return <div key={i} className="category-list__category">{category.name}</div>
          })
        }
      </div>
    );
  }
}
