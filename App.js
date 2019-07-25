import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './src/redux/reducer';
import Login from './src/screens/Login'
import SignUp from './src/screens/SignUp'
import MenuPage from './src/screens/MenuPage'
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
      backgroundColor: '#f7f7f7',
    },
  }
},
{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f7f7f7',
    }
  }
}
);


const ChatStack = createStackNavigator({
  MenuPage,
  Chat,
  GroupForm,
},
{
  initialRouteName: 'MenuPage',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f7f7f7',
    },
  }
},
{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f7f7f7',
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

