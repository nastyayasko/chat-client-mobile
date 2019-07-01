import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';

import {color, mainStyles} from '../constants';
import LoginInput from '../components/LoginInput';
import MyCheckBox from '../components/MyCheckBox';
import {createDialog, setLoginStatus, deleteLoginStatus, getUsers} from '../redux/actions';

class GroupForm extends React.Component {
  state ={
    title: '',
    chosen: {},
    img: 'https://www.applozic.com/resources/lib/advanced/css/app/images/mck-icon-group.png',
  }
  
  static navigationOptions = {
    title: 'Create a new group',
  }
  checkedBoxes = (id) => {
    const { chosen } = this.state;
    chosen[id] = !chosen[id];
    this.setState({ chosen });
  }
  handleSubmit = () => {
    const { user } = this.props;
    const { title, chosen, img } = this.state;
    const users = [];
    for (const key in chosen) {
      if (chosen[key]) {
        users.push(key);
      }
    }
    if (!title || !users.length) {
      this.props.setLoginStatus("Some fields are empty");
      return;
    }
    users.push(user._id);
    const dialog = {type: 'group', title, img, users};
    console.log(dialog);
    this.props.createDialog(dialog);
  }
  componentDidMount(){
    this.props.getUsers();
  }
  componentDidUpdate(prevProps) {
    const { currentDialog } = this.props;
    if (currentDialog !== prevProps.currentDialog) {
      this.props.navigation.navigate('Chat', {title: currentDialog.title});
    }
  }

  render () {
    const {title, chosen} = this.state;
    const {status, users, user} = this.props;
    return (
      <View  style={mainStyles.container}>
        <SafeAreaView></SafeAreaView>
        <View style={{flex:5}}>
          <View><Text style={mainStyles.status}>{status}</Text></View>
          <LoginInput text='Title' name='title' value={title} 
            handleChange={(title) => {this.setState({title}); this.props.deleteLoginStatus()}} />
          <ScrollView style={{marginTop: 5}}>
            {
              users.map(user => {
                return (<MyCheckBox user={user} checked={chosen[user._id]} 
                  check={() => {this.checkedBoxes(user._id)}} key={user._id} />)
            })}
          </ScrollView>
        </View>
        <View style={{flex:1}}>
          <TouchableOpacity onPress={this.handleSubmit}>
            <View style={styles.button}>
              <Text style={styles.login}>Create</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  button:{
    backgroundColor: color,
    width:'70%',
    borderRadius:25,
    marginVertical: 25,
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

export default connect(mapStateToProps, {createDialog, setLoginStatus, deleteLoginStatus, getUsers})(GroupForm);