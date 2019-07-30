import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { 
  Text, View, StyleSheet, TouchableOpacity, SafeAreaView, YellowBox, KeyboardAvoidingView,
} from 'react-native';

import {color, mainStyles, HOST} from '../constants';
import LoginInput from '../components/LoginInput'
import {
  setLoginStatus, deleteLoginStatus, auth, login, createConnection,
} from '../redux/actions';

YellowBox.ignoreWarnings(['Remote debugger']);

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }
  static navigationOptions = {
    header: null
  }
  
  handleSubmit = () => {
    const { email, password } = this.state;
    if (!email || !password) {
      this.props.setLoginStatus('Some fields are empty');
      return;
    }
    const user = { email, password };
    this.props.login(user);
    this.setState({email:'', password:''});
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (user !== prevProps.user) {
      const socket = io(HOST);
      socket.emit('email', user);
      this.props.createConnection(socket);
      this.props.navigation.navigate('MenuPage');
    }
  }
  
  componentWillUnmount(){
    this.props.deleteLoginStatus(); 
   }

  render() {
    const { status } = this.props;
    const { email, password } = this.state;
    return (
      <KeyboardAvoidingView
        style = {{ flex: 1 }}
        behavior = "height" >
        <View style={[mainStyles.container, {justifyContent: 'center'}]}>
          <SafeAreaView></SafeAreaView>
          <View style={{ paddingTop:15}}>
            <Text style={styles.paragraph}>LOGIN</Text>
            <View><Text style={mainStyles.status}>{status}</Text></View>
            <LoginInput text='email' type='emailAddress' value={email} handleChange={(email) => {this.setState({email}); this.props.deleteLoginStatus()}} />
            <LoginInput text='password' type='password' value={password} handleChange={(password) => {this.setState({password}); this.props.deleteLoginStatus()}} />
            
            <TouchableOpacity onPress={this.handleSubmit}>
              <View style={styles.button}>
                <Text style={styles.login}>Login</Text>
              </View>
            </TouchableOpacity>
            <View>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignUp')}>
                <Text style={styles.signup}>Don’t have an account? 
                  <Text style={{textDecorationLine:'underline' }}> Sign up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  } 
}

const styles = StyleSheet.create({
  header: {
    flex:1,
    justifyContent: 'flex-end', 
  },
  paragraph: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: color,
  },
  button:{
    backgroundColor: color,
    width:'70%',
    borderRadius:25,
    marginVertical: 30,
    marginHorizontal:'15%',
  },
  login: {
    paddingVertical:15, 
    color:'white',
    fontSize:17,
    textAlign:'center',
  },
  signup: {
    color: color,
    textAlign:'center',
  },
});

const mapStateToProps = state => ({
  status: state.loginStatus,
  user: state.user,
});

export default connect(mapStateToProps, {
  setLoginStatus, deleteLoginStatus, auth, login, createConnection,
})(Login);