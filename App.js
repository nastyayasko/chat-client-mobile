import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Login from './src/screens/Login'
import SignUp from './src/screens/SignUp'
import Dialogs from './src/screens/Dialogs'
import Friends from './src/screens/Friends'

const RootStack = createStackNavigator({
  Login: Login,
  SignUp: SignUp,
  Dialogs: Dialogs,
  Friends: Friends
},
{
  initialRouteName: 'Login',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#30d0fe',
    },
    headerTintColor: '#fff'
  }
},
{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#ecf0f1',
    }
  }
}
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  } 
}

