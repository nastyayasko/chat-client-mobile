import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import {color, mainStyles} from '../../constants';
import LoginInput from '../components/LoginInput'

class SignUp extends React.Component {
  state ={
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    status:'',
    url: 'http://localhost:3020/api/sign-up',
  }
  
  static navigationOptions = {
    title: 'Sign Up Form',
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const {email, firstName, lastName, password, robot, url} = this.state;
    if(!email || !firstName || !lastName || !password || !robot){
      this.setState({status: "Some fields are empty"});
      return;
    }
    const user = {email, firstName, lastName, password}
    // axios.post(url, user)
    //   .then(response => {
    //     if (response.data.client) {
    //       this.setState({status: "User with this email already exists."});
    //       return;
    //     }
    //     login(response.data);
    //   })
    console.log('done')
    console.log(user)
  }
  render () {
    const {email, firstName, lastName, password, status} = this.state;
    return (
      <View  style={mainStyles.container}>
        <SafeAreaView></SafeAreaView>
        <View><Text style={mainStyles.status}>{status}</Text></View>
        <View>
          <LoginInput text='First Name' onChange={this.handleChange} name='firstName' value={firstName}/>
          <LoginInput text='Last Name' onChange={this.handleChange} name='lastName' value={lastName}/>
          <LoginInput text='Email' onChange={this.handleChange} name='email' value={email}/>
          <LoginInput text='Password' onChange={this.handleChange} name='password' value={password}/>
        </View>
        
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Dialogs')}>
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
})

export default SignUp;