import React from 'react';
import { Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {color, mainStyles} from '../../constants';

import Menu from '../components/Menu'

class Dialogs extends React.Component {
  static navigationOptions = {
    title: 'Dialogs',
  }
  render () {
    return (
      <View  style={mainStyles.container}>
        <SafeAreaView></SafeAreaView>
        <View style={{flex:9}}>
          <Text>Dialogs</Text>
        </View>
        <View style={{flex:1}}>
          <Menu/>
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
    marginVertical: 35,
    marginHorizontal:'15%',
  },
  login: {
    paddingVertical:15, 
    color:'white',
    fontSize:17,
    textAlign:'center',
  },
})
  
export default Dialogs;