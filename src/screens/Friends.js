import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, TouchableOpacity, SafeAreaView} from 'react-native';
import {mainStyles} from '../../constants';
import { getUsers, setCurrentDialog } from '../redux/actions';
import ListItem from '../components/ListItem';
import Menu from '../components/Menu'

class Friends extends React.Component {
  static navigationOptions = {
    title: 'Friends',
  }
  chooseDialog = (id) => {
    const { users, dialogs, connection } = this.props;
    const dialog = dialogs.find(d => d.type === 'individual' && d.users.includes(id));
    if (!dialog) {
      connection.on('current-dialog', (currentDialog) => {
        this.props.setCurrentDialog(currentDialog);
      });
      connection.emit('connect-user', id);
      return;
    }
    this.props.setCurrentDialog(dialog);
    const currentUser = users.find(u => u._id === id);
    this.props.navigation.navigate('Chat', {title: `${currentUser.firstName} ${currentUser.lastName}`});
  }
  componentDidMount() {
    const {connection} = this.props;
    this.props.getUsers();
    
  }
  render () {
    const { users } = this.props;
    return (
      <View  style={mainStyles.container}>
        <SafeAreaView></SafeAreaView>
        <View style={{flex:9}}>
          <ScrollView>
            {
              users.map(user => (
                <TouchableOpacity key={user._id} onPress={() => {this.chooseDialog(user._id)}}>
                  <ListItem img={user.img} title={`${user.firstName} ${user.lastName}`}/>
                </TouchableOpacity>  
              ))
            }
          </ScrollView>
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
  connection: state.connection,
});

export default connect(mapStateToProps, { getUsers, setCurrentDialog })(Friends);