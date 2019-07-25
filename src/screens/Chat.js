import React from 'react';
import { connect } from 'react-redux';
import { Header } from 'react-navigation';
import {View, ScrollView, SafeAreaView, TouchableOpacity, Image, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native';

import {mainStyles} from '../constants';
import { getMessages, addMessage } from '../redux/actions';
import Message from '../components/Message';

class Chat extends React.Component {
  state = {
    message: '',
  }
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  })
  sendMessage = () => {
    const {message} = this.state;
    const {user, currentDialog, connection} = this.props;
    if (!message) return;
    const time = new Date().toString().split(' ');
    const newTime = `${time[2]} ${time[1]} ${time[3]} ${time[4]}`;
    const myMesage = {
      email: user.email, message, time: newTime, currentDialog: currentDialog._id,
    };
    this.setState({ message: '' });
    connection.emit('chat', myMesage);
  }
  componentDidMount() {
    const {currentDialog, connection} = this.props;
    this.props.getMessages(currentDialog._id);
    connection.on('chat', (data) => {
      const {currentDialog} = this.props;
      if (currentDialog && currentDialog._id === data.currentDialog) {
        this.props.addMessage(data);       
      }
    });
  }

  render() {
    const {messages, user} = this.props;
    const {message} = this.state;
    return(
      <KeyboardAvoidingView
        keyboardVerticalOffset = {Header.HEIGHT + 27}
        style = {{ flex: 1 }}
        behavior = "height" >
      <View style={mainStyles.container} >
        <SafeAreaView></SafeAreaView>
        <View style={{flex:9}}>
          <ScrollView ref={ref => this.scrollView = ref}
                      onContentSizeChange={()=>{        
                        this.scrollView.scrollToEnd({animated: true});
                      }}>
            {
              messages.map(message => (
                <Message message={message} key={message._id} email={user.email}/>
              ))
            }
          </ScrollView>
        </View>
        
        <View style={{flex:1, justifyContent:'center'}}>
          <View style={styles.message}>
            <View style={{flex:5,height: 60}}>
              <TextInput style={styles.input} value={message} placeholder='Message'
              onChangeText={(message) => this.setState({message})}></TextInput>
            </View>
            <View style={{flex:1}}>
              <TouchableOpacity onPress={this.sendMessage}>
                <Image style={styles.img} source={require('../images/send.png')}></Image>
              </TouchableOpacity>
            </View>
            </View>
        </View>
      </View>
      </KeyboardAvoidingView>
      
    )
  }
}
const styles = StyleSheet.create({
  input: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    fontSize:16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 15,
  },
  img: {
    width: 50,
    height: 50,
    marginTop: 4,
  },
  message: {
    flex:1, 
    backgroundColor:'white',
    borderTopColor: 'lightgrey', 
    borderTopWidth: 1,
    flexDirection: 'row',
  }
})

const mapStateToProps = state => ({
    currentDialog: state.currentDialog,
    messages: state.messages,
    user: state.user,
    users: state.users,
    connection: state.connection,
  });

export default connect(mapStateToProps, {getMessages, addMessage})(Chat);