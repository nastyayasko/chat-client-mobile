import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import {color} from '../../constants'

export default function LoginInput (props) {
 const {text, handleChange, value, type} = props;
  return (
    <View style={styles.container}>
      <Text style={{color: color}}>{text}</Text>
      <TextInput placeholder={text} textContentType={type} onChangeText={handleChange} value={value} name={text} style={styles.input}></TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:'10%',
    marginTop: 15,
  },
  input: {
    borderBottomColor: color,
    borderBottomWidth: 2,
    fontSize:18,
    paddingVertical:10,
  },
  
});
