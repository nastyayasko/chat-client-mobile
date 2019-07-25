import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, TouchableOpacity, StyleSheet, Text} from 'react-native';


import ListItem from './ListItem';
import { getDialogs, setCurrentDialog } from '../redux/actions';

class Dialogs extends React.Component {
  
  chooseDialog = (id) => {
    const { dialogs } = this.props;
    const dialog = dialogs.find(d => d._id === id);
    this.props.setCurrentDialog(dialog);
    this.props.navigation.navigate('Chat', {title: dialog.title} );
  }
  componentDidMount() {
    const {user} = this.props;
    this.props.getDialogs(user._id);
  }
  render () {
    const { dialogs, navigation } = this.props;
    const groupDialogs = dialogs.filter(dialog => dialog.type === 'group');
    return (
      <View style={{flex:1}}>
        <View style={{flex:8}}>
          <ScrollView>
            {
              groupDialogs.map(dialog => (
                <TouchableOpacity key={dialog._id} onPress={() => {this.chooseDialog(dialog._id)}}>
                  <ListItem img={dialog.img} title={dialog.title}/>
                </TouchableOpacity>  
              ))
            }
          </ScrollView>
        </View>
        <View style={{flex:1, justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('GroupForm')}>
            <View style={styles.button}>
              <Text style={styles.login}>New Group</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button:{
    backgroundColor: '#30d0fe',
    width:'70%',
    borderRadius:25,
    marginHorizontal:'15%',
  },
  login: {
    paddingVertical:13, 
    color:'white',
    fontSize:17,
    textAlign:'center',
  },
});

const mapStateToProps = state => ({
  user: state.user,
  dialogs: state.dialogs,
});

export default connect(mapStateToProps, { getDialogs, setCurrentDialog })(Dialogs);