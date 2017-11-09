import LoginForm from '../components/LoginForm';
import UsersPage from '../components/UsersPage';

const Navigation = {
  LoginScreen: {screen: LoginForm, navigationOptions: { title: 'Login'}},
  UsersScreen: {screen: UsersPage, navigationOptions: { title: 'Users'}}
};

export default Navigation;
