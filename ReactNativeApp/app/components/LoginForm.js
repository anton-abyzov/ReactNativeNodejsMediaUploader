import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as userActions from '../../actions/userActions';
import Button from './Button';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container: {
    paddingTop: 10,
    width: '100%',
    borderColor: '#eee',
    borderBottomWidth: 2,
  },
  lable: {
    padding: 5,
    paddingBottom: 0,
    color: '#333',
    fontSize: 17,
    // fontWeight: '700',
    width: '100%',
  },
  lableSuccess: {
    padding: 5,
    paddingBottom: 0,
    color: '#25bc37',
    fontSize: 17,
    width: '100%',
  },
  lableError: {
    padding: 5,
    paddingBottom: 0,
    color: '#fc0707',
    fontSize: 17,
    fontWeight: '700',
    width: '100%',
  },
  input: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 2,
    color: '#333',
    fontSize: 16,
    height: 50
  }
});

class LoginForm extends Component {
  // componentWillMount() {
  //   const firebaseConfig = {
  //     apiKey: 'AIzaSyBuAo3DK23Gd2wM4ml8ntqQwSB-QJhr2P4',
  //     authDomein: 'softgreat-resource-manager.firebaseapp.com',
  //     databaseURL: "https://softgreat-resource-manager.firebaseio.com"
  //   }
  //
  //   firebase.initializeApp(firebaseConfig);
  // }

  constructor(props, context) {
    super(props, context)
    // const firebaseConfig = {
    //   apiKey: 'AIzaSyBuAo3DK23Gd2wM4ml8ntqQwSB-QJhr2P4',
    //   authDomein: 'softgreat-resource-manager.firebaseapp.com',
    //   databaseURL: "https://softgreat-resource-manager.firebaseio.com"
    // }
    //
    // firebase.initializeApp(firebaseConfig);
  }

  onEmailChange(text) {
    console.log("emailChanged: ", text);
    this.props.actions.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.actions.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props.auth;
    console.log("PROPS: ", this.props);

    this.props.actions.loginUser({ email, password });
    
  }

  /*submitForm() {
    console.log("Button press");

    // Create User
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(user) { console.log(user); })
      .catch((createError) => {
        console.log(createError);
    });
  }*/

  /*
  {this.state.authenticationFailed ?  <Text style={styles.lableError}>Invalid login or password</Text> : null}
  */

  render() {
    const { label, value, onChangeText, placeholder, securityTextEntry } = this.props;
    const style = StyleSheet.create({
      loginForm: {
        textAlign: 'center',
      }
    });

    // console.log("user:", this.props.user);
    let auth = this.props.auth;
    let user = auth.user;
    let rolesString = '';
    if (user != null) {
      for (let role in user.roles) {
        rolesString = rolesString +  ' ' + role;
      }
    }

    return (
      <View style={styles.container} >
        {user != null ? <Text style={styles.lableSuccess}>Authenticated Successfully {user.uid} Roles: {rolesString}</Text> : null}
        <Text style={styles.lable}>Email</Text>
        <TextInput
            autoCorrect={false}
            onChangeText={this.onEmailChange.bind(this)}
            placeholder="Enter your email..."
            style={styles.input}
            value={auth.email}
        />
        <Text style={styles.lable}>Password</Text>
        <TextInput
            autoCorrect={false}
            onChangeText={this.onPasswordChange.bind(this)}
            placeholder="Enter your password..."
            style={styles.input}
            secureTextEntry={true}
            value={auth.password}
        />
        <Button          
          textStyle={{fontSize: 18}}
          style={styles.loginButton}
          onPress={() => this.props.navigation.navigate('UsersScreen')}
        >
          LogIn
        </Button>
      </View>
    );
  }
}



LoginForm.propTypes = {
  actions: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
}

function mapStateToProps(state, owProps) {
  return {
    auth: state.auth,
    navigation: state.navigation
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

// const select = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
