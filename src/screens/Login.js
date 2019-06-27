import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import {color, mainStyles} from '../../constants';
import LoginInput from '../components/LoginInput'
import {
  setLoginStatus, deleteLoginStatus, auth, login, createConnection,
} from '../redux/actions';


class Login extends React.Component {
  state = {
    email: '',
    password: '',
    status:''
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
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (user !== prevProps.user) {
      const socket = io('http://192.168.0.223:3020', {
        timeout: 10000,
        jsonp: false,
        transports: ['websocket'],
        autoConnect: false,
        agent: '-',
        path: '/', // Whatever your path is
        pfx: '-',
        key: '', // Using token-based auth.
        passphrase: '', // Using cookie auth.
        cert: '-',
        ca: '-',
        ciphers: '-',
        rejectUnauthorized: '-',
        perMessageDeflate: '-'
      });
      this.props.createConnection(socket);
      this.props.navigation.navigate('Dialogs');
    }
  }

  render() {
    const { status } = this.props;
    return (
      <View style={mainStyles.container}>
        <SafeAreaView></SafeAreaView>
          <View style={styles.header}>
            <Text style={styles.paragraph}>LOGIN</Text>
          </View>
       
        <View style={{flex:3, paddingTop:15}}>
          <View><Text style={mainStyles.status}>{status}</Text></View>
          <LoginInput text='email' type='emailAddress' handleChange={(email) => {this.setState({email}); this.props.deleteLoginStatus()}} 
            value={this.state.email}/>
          <LoginInput text='password' type='password' handleChange={(password) => {this.setState({password}); this.props.deleteLoginStatus()}} 
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
const mapStateToProps = state => ({
  status: state.loginStatus,
  user: state.user,
});
export default connect(mapStateToProps, {
  setLoginStatus, deleteLoginStatus, auth, login, createConnection,
})(Login);