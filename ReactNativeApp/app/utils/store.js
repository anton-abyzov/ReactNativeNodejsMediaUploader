import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers/index';

export default function getStore(navReducer) {
  const store = createStore(
    rootReducer(navReducer),
    undefined,
    applyMiddleware(thunk)
  );

  return store;
};
