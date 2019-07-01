import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {color} from '../constants';

function Head(props) {
  const { title } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.head}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:color, 
    margin: 0,
  },
  head: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 15,
    fontWeight: 'bold',
  }
})

export default Head;