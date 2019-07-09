import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
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

const Auth = createStackNavigator({
  Login,
  SignUp,
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


const ChatStack = createStackNavigator({
  Dialogs,
  Friends,
  Chat,
  GroupForm,
},
{
  initialRouteName: 'Dialogs',
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


const RootStack = createSwitchNavigator(
  {
    Auth,
    Chat: ChatStack,
  },
  {
    initialRouteName: 'Auth',
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

