import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';

import {color, mainStyles} from '../../constants';
import LoginInput from '../components/LoginInput';
import MyCheckBox from '../components/MyCheckBox';
import {createDialog, setLoginStatus, deleteLoginStatus} from '../redux/actions';

class GroupForm extends React.Component {
  state ={
    title: '',
    chosen: {},
    img: 'https://www.applozic.com/resources/lib/advanced/css/app/images/mck-icon-group.png',
  }
  
  static navigationOptions = {
    title: 'Create a new group',
  }
  
  handleSubmit = () => {
    const {title, img} = this.state;
    if(!title){
      this.props.setLoginStatus("Some fields are empty");
      return;
    }
    const dialog = {type: 'group', title, img}
    // this.props.createDialog(dialog);
  }

  componentDidUpdate(prevProps) {
    const { currentDialog } = this.props;
    if (currentDialog !== prevProps.currentDialog) {
      this.props.navigation.navigate('Chat', {title: currentDialog.title});
    }
  }

  render () {
    const {title} = this.state;
    const {status, users} = this.props;
    return (
      <View  style={mainStyles.container}>
        <SafeAreaView></SafeAreaView>
        <View><Text style={mainStyles.status}>{status}</Text></View>
        <View>
          <LoginInput text='Title' name='title' value={title} 
            handleChange={(title) => {this.setState({title}); this.props.deleteLoginStatus()}} />
          <ScrollView>
            {users.map(user => {
              return (<MyCheckBox user={user}  key={user._id} />)
            })}
          </ScrollView>
        </View>
        <TouchableOpacity onPress={this.handleSubmit}>
          <View style={styles.button}>
            <Text style={styles.login}>Create</Text>
          </View>
        </TouchableOpacity>
        
      </View>
    )
  }
}


const styles = StyleSheet.create({
  button:{
    backgroundColor: color,
    width:'70%',
    borderRadius:25,
    marginVertical: 35,
    marginHorizontal:'15%',
  },
  login: {
    paddingVertical:15, 
    color:'white',
    fontSize:17,
    textAlign:'center',
  },
  paragraph: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: color,
  },
});

const mapStateToProps = state => ({
  user: state.user,
  users: state.users,
  status: state.loginStatus,
  currentDialog: state.currentDialog,
});

export default connect(mapStateToProps, {createDialog, setLoginStatus, deleteLoginStatus})(GroupForm);