import React from 'react';
import { Text, View, StyleSheet} from 'react-native';

export default function Message (props) {
 const {message, email} = props;
  return (
    <View style={email === message.email ? styles.myMessage : styles.message}>
      <View style={[styles.item, email === message.email ? {backgroundColor: '#e2ffc5'} : {backgroundColor:'white'}]}>
        <Text style={styles.name}>{message.email}</Text>
        <Text style={styles.time}>{message.time}</Text>
        <Text style={styles.name}>{message.message}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '75%',
    margin: 8,
    borderRadius: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  message: {
    flex: 1,
  },
  myMessage: {
    flex: 1,
    alignItems: 'flex-end',
  }
});
