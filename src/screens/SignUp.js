import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';

import {color, mainStyles} from '../constants';
import LoginInput from '../components/LoginInput';
import {setLoginStatus, deleteLoginStatus, signUp, createConnection} from '../redux/actions';

class SignUp extends React.Component {
  state ={
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  }
  
  static navigationOptions = {
    title: 'Sign Up Form',
  }
  
  handleSubmit = () => {
    const {email, firstName, lastName, password} = this.state;
    if(!email || !firstName || !lastName || !password){
      this.props.setLoginStatus("Some fields are empty");
      return;
    }
    const user = {email, firstName, lastName, password}
    this.props.signUp(user);
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (user !== prevProps.user) {
      const socket = io('http://192.168.0.99:3020');
      socket.emit('email', user);
      socket.on('chat', (data) => {
        const {currentDialog} = this.props;
        if (currentDialog && currentDialog._id === data.currentDialog) {
          this.props.addMessage(data);       
        }
      });
      this.props.createConnection(socket);
      this.props.navigation.navigate('Dialogs');
    }
  }

  render () {
    const {email, firstName, lastName, password} = this.state;
    const {status} = this.props;
    return (
      <View  style={mainStyles.container}>
        <SafeAreaView></SafeAreaView>
        <View><Text style={mainStyles.status}>{status}</Text></View>
        <View>
          <LoginInput text='First Name' name='firstName' value={firstName} 
            handleChange={(firstName) => {this.setState({firstName}); this.props.deleteLoginStatus()}} />
          <LoginInput text='Last Name' name='lastName' value={lastName}
            handleChange={(lastName) => {this.setState({lastName}); this.props.deleteLoginStatus()}}/>
          <LoginInput text='Email' name='email' value={email}
            handleChange={(email) => {this.setState({email}); this.props.deleteLoginStatus()}}/>
          <LoginInput text='Password' name='password' value={password}
            handleChange={(password) => {this.setState({password}); this.props.deleteLoginStatus()}}/>
        </View>
        
        <TouchableOpacity onPress={this.handleSubmit}>
          <View style={styles.button}>
            <Text style={styles.login}>Sign Up</Text>
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
  status: state.loginStatus,
});

export default connect(mapStateToProps, {setLoginStatus, deleteLoginStatus, signUp, createConnection})(SignUp);