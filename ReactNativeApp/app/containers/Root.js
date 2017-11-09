import React, { Component, PropTypes } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import PortfolioInsights from './App';
import {createStore} from 'redux';
import rootReducer from '../../reducers/index';

export default class Root extends Component {

  store = createStore(rootReducer)

  render() {
    return (
      <Provider store={this.store}>
        <PortfolioInsights />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Root', () => Root);

export default Root;
