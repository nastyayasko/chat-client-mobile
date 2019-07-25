import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, TouchableOpacity, } from 'react-native';

import { getUsers, setCurrentDialog, createDialog } from '../redux/actions';
import ListItem from './ListItem';


class Friends extends React.Component {
  
  chooseDialog = (id) => {
    const { user, dialogs } = this.props;
    const dialog = dialogs.find(d => d.type === 'individual' && d.users.includes(id));
    if (!dialog) {
      const newDialog = {
        type: 'individual',
        users: [user._id, id]
      }
      this.props.createDialog(newDialog);
    } else {
      this.props.setCurrentDialog(dialog);
    }
  }

  componentDidMount() {
    this.props.getUsers();
  }

  componentDidUpdate(prevProps) {
    const { currentDialog, user, users} = this.props;
    if (currentDialog !== prevProps.currentDialog) {
      const currentUserId = currentDialog.users.find(u => u !== user._id);
      const currentUser = users.find(u => u._id === currentUserId);
      this.props.navigation.navigate('Chat', {title: `${currentUser.firstName} ${currentUser.lastName}`});
    }
  }
  render () {
    const { users } = this.props;
    return (
      <ScrollView>
        {
          users.map(user => (
            <TouchableOpacity key={user._id} onPress={() => {this.chooseDialog(user._id)}}>
              <ListItem img={user.img} title={`${user.firstName} ${user.lastName}`}/>
            </TouchableOpacity>  
          ))
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  users: state.users,
  dialogs: state.dialogs,
  currentDialog: state.currentDialog,
});

export default connect(mapStateToProps, { getUsers, setCurrentDialog, createDialog })(Friends);