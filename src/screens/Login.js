import React from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import {color, mainStyles} from '../../constants';
import LoginInput from '../components/LoginInput'
 


class Login extends React.Component {
  state = {
    email: '',
    password: '',
    loginURL: 'http://localhost:3020/api/log-in',
    status:''
  }
  static navigationOptions = {
    header: null
  }
  
  handleSubmit = () => {
    const {email,password, loginURL} = this.state;
    if (!email || !password) {
      this.setState({status: "Some fields are empty"});
      return;
    }
    const user = {email, password};
    console.log(user);
    axios.post(loginURL, user)
      .then(response => {
        if (response.data.new) {
          this.setState({status: "Invalid email or password."});
          return;
        }
        console.log(response.data);
        this.props.navigation.navigate('Dialogs')
      })
  }
  render() {
    const {status} = this.state;
    return (
      <View style={mainStyles.container}>
        <SafeAreaView></SafeAreaView>
          <View style={styles.header}>
            <Text style={styles.paragraph}>LOGIN</Text>
          </View>
       
        <View style={{flex:3, paddingTop:15}}>
          <View><Text style={mainStyles.status}>{status}</Text></View>
          <LoginInput text='email' type='emailAddress' handleChange={(email) => this.setState({email})} 
            value={this.state.email}/>
          <LoginInput text='password' type='password' handleChange={(password) => this.setState({password})} 
            value={this.state.password}/>
          
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
        <View style={{flex:2}}>
          <TouchableOpacity>
            <View style={styles.google}>
              <Text style={styles.login}>Login with Google</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.google}>
              <Text style={styles.login}>Login with Facebook</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  header: {
    flex:1, 
    justifyContent: 'flex-end', 
    flexDirection: 'column'
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
    marginVertical: 25,
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
  google: {
    backgroundColor: color,
    width:'70%',
    borderRadius:25,
    marginBottom: 25,
    marginHorizontal:'15%'
  }

});

export default Login;