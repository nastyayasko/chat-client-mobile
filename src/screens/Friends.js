import React from 'react';
import { Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {mainStyles} from '../../constants';

class Friends extends React.Component {
  static navigationOptions = {
    title: 'Friends',
  }
  render () {
    return (
      <View  style={mainStyles.container}>
        <SafeAreaView></SafeAreaView>
        <Text>Friends</Text>
      </View>
    )
  }
}
export default Friends;