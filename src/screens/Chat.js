import React from 'react';
import { connect } from 'react-redux';
import {View, ScrollView, SafeAreaView, TouchableOpacity, Text, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native';

import {mainStyles, color} from '../../constants';
import { getMessages } from '../redux/actions';
import Message from '../components/Message';

class Chat extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  })

  componentDidMount() {
    const {currentDialog} = this.props;
    if (currentDialog.type === 'group') {
      dialogName = currentDialog.title;
    } else {
      dialogName = 'hello';
    }
    this.props.getMessages(currentDialog._id);
  }

  render() {
    const {messages, user} = this.props;
    return(
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
        
        
        <View style={{flex:1, backgroundColor:'white',borderTopColor: 'lightgrey', borderTopWidth: 1,}}>
          <TextInput style={styles.input}></TextInput>
        </View>
      </View>
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
  }
})

const mapStateToProps = state => ({
    currentDialog: state.currentDialog,
    messages: state.messages,
    user: state.user,
    users: state.users,
  });

export default connect(mapStateToProps, {getMessages})(Chat);