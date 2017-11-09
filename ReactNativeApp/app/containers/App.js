import React from 'react';
import {Provider, connect} from 'react-redux';
import {StackNavigator, addNavigationHelpers, NavigationActions} from 'react-navigation';
import {View} from 'react-native'

import { appStyle } from '../styles/styles';
import * as firebase from 'firebase';
import Navigation from '../utils/navigation';
import getStore from '../utils/store';

const AppNavigator = StackNavigator(Navigation, {
  navigationOptions: {
    title: ({state}) => {
      if(state.params){
        return `$(state.params.title)`;
      }
    }
  },
  initialRouteName: 'LoginScreen'
});

// const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('LoginScreen'));

const initialState = AppNavigator.router.getStateForAction(NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({
      routeName: 'LoginScreen',
    }),
  ],
}))

const navReducer = (state = initialState, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

connect(state => ({
  nav: state.nav
}));

const store = getStore(navReducer);

class AppWithNavigationState extends React.Component {
  componentWillMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyBuAo3DK23Gd2wM4ml8ntqQwSB-QJhr2P4',
      authDomein: 'softgreat-resource-manager.firebaseapp.com',
      databaseURL: "https://softgreat-resource-manager.firebaseio.com"
    }

    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
      <View style={appStyle.reactNativeWeb}>
        <AppNavigator
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav
          })}
        />
      </View>
    );
  }
}

export default function NCAP() {
    return (
        <Provider store={store}>
            <AppWithNavigationState />
        </Provider>
    );
}
