import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from 'reducers';
import App from 'containers/App';
import Main from 'containers/Main';
import NotFound from 'containers/NotFound';
import '../sass/app.sass';

const middleware = applyMiddleware(thunk);
const enhancer = compose(
  middleware,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = (process.env.NODE_ENV === 'production')
              ?  createStore(rootReducer, middleware)
              :  createStore(rootReducer, enhancer)

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path='/' component={ App }>
        <IndexRoute component={ Main } />
        <Route path='*' component={ NotFound } />
      </Route>
    </Router>

  </Provider>, document.getElementById('root')
);
