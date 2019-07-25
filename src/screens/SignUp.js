import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import {
  Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions';

import {color, mainStyles, HOST, randomInteger} from '../constants';
import LoginInput from '../components/LoginInput';
import {setLoginStatus, deleteLoginStatus, signUp, createConnection} from '../redux/actions';

class SignUp extends React.Component {
  state ={
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    img: '',
  }
  
  static navigationOptions = {
    title: 'Sign Up Form',
  }
  
  handleSubmit = () => {
    const {email, firstName, lastName, password, img} = this.state;
    if(!email || !firstName || !lastName || !password){
      this.props.setLoginStatus("Some fields are empty");
      return;
    }
    const user = {email, firstName, lastName, password}
    this.props.signUp(user, img);
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    console.log(user !== prevProps.user)
    if (user !== prevProps.user) {
      const socket = io(HOST);
      socket.emit('email', user);
      socket.on('chat', (data) => {
        const {currentDialog} = this.props;
        if (currentDialog && currentDialog._id === data.currentDialog) {
          this.props.addMessage(data);       
        }
      });
      this.props.createConnection(socket);
      this.props.navigation.navigate('MenuPage');
    }
  }

  componentWillUnmount(){
   this.props.deleteLoginStatus(); 
  }

  selectPic = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowEditing: true,
    });
    const photo = {
      uri,
      type: 'image/jpeg',
      name: randomInteger(1, 999) + randomInteger(1, 999)  + '.jpg',
    };
    this.setState({img: photo}); 
  };
 takePic = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      allowEditing: false,
    });
    const photo = {
      uri,
      type: 'image/jpeg',
      name: randomInteger(1, 999) + randomInteger(1, 999)  + '.jpg',
    };
    this.setState({img: photo});  
  };

  render () {
    const {email, firstName, lastName, password, img} = this.state;
    const {status} = this.props;
    return (
      <View style={mainStyles.container}>
        <SafeAreaView></SafeAreaView>
        <View><Text style={mainStyles.status}>{status}</Text></View>
        <View>
          <LoginInput text='First Name' name='firstName' value={firstName} 
            handleChange={(firstName) => {this.setState({firstName}); this.props.deleteLoginStatus()}} />
          <LoginInput text='Last Name' name='lastName' value={lastName}
            handleChange={(lastName) => {this.setState({lastName}); this.props.deleteLoginStatus()}}/>
          <LoginInput text='Email' name='email' type='emailAddress' value={email}
            handleChange={(email) => {this.setState({email}); this.props.deleteLoginStatus()}}/>
          <LoginInput text='Password' type='password' name='password' value={password}
            handleChange={(password) => {this.setState({password}); this.props.deleteLoginStatus()}}/>
        </View>
        <View style={styles.container}>
            <Text style={{color: color}}>Photo</Text>
        </View>
        <View  style={styles.photo}>
          <View>
            <TouchableOpacity onPress={this.selectPic}>
              <View style={styles.buttonPic}>
                <Text style={styles.login}>Gallery</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.takePic}>
              <View style={styles.buttonPic}>
                <Text style={styles.login}>Camera</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            {img?<Image source={{ uri: img.uri }} style={{ width: 100, height: 100 }} />:null}
          </View>
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
  container: {
    marginHorizontal:'10%',
    marginTop: 15,
  },
  photo: {
    marginHorizontal:'10%',
    marginTop: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button:{
    backgroundColor: color,
    width:'70%',
    borderRadius:25,
    marginVertical: 35,
    marginHorizontal:'15%',
  },
  buttonPic:{
    backgroundColor: color,
    width:'70%',
    borderRadius:25,
    marginVertical: 5,
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