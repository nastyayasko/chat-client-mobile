import React from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView} from 'react-native';
import {mainStyles} from '../constants';
import {  } from '../redux/actions';
import Menu from '../components/Menu';
import Dialogs from '../components/Dialogs';
import Friends from '../components/Friends';

class MenuPage extends React.Component {
  static navigationOptions = {
    title: 'Chat',
  }
  
  render () {
    const { currentPage } = this.props;
    return (
      <View  style={mainStyles.container}>
        <SafeAreaView></SafeAreaView>
        <View style={{flex:9}}>
          {
            currentPage === 'Friends'?<Friends navigation={this.props.navigation}></Friends>:<Dialogs navigation={this.props.navigation}></Dialogs>
          }
        </View>
        <View style={{flex:1}}>
          <Menu navigation={this.props.navigation}/>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  users: state.users,
  dialogs: state.dialogs,
  currentDialog: state.currentDialog,
  currentPage: state.currentPage,
});

export default connect(mapStateToProps, {  })(MenuPage);