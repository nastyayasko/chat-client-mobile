import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './src/redux/reducer';
import Login from './src/screens/Login'
import SignUp from './src/screens/SignUp'
import Dialogs from './src/screens/Dialogs'
import Friends from './src/screens/Friends'
import Chat from './src/screens/Chat'
import GroupForm from './src/screens/GroupForm'


const store = createStore(reducers, applyMiddleware(thunk));

const RootStack = createStackNavigator({
  Login: Login,
  SignUp: SignUp,
  Dialogs: Dialogs,
  Friends: Friends,
  Chat: Chat,
  GroupForm: GroupForm,
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
      <Provider store={store}>
        <AppContainer />
      </Provider> 
    );
  } 
}

