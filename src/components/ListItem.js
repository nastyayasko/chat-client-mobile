import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Avatar } from 'react-native-elements'

export default function ListItem (props) {
  const {img, title} = props;
  return (
    <View style={styles.item}>
      <View style={{flex:1, marginVertical:4}}>
        <Avatar size="medium" 
          overlayContainerStyle={{ backgroundColor: 'transparent' }} 
          rounded 
          source={{uri: img}}></Avatar>
      </View>
      <View style={{flex:4, justifyContent: 'center'}}>
        <View>
          <Text style={styles.name}>{title}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingLeft: 5
  },
  name: {
    flex:1,
    fontSize: 20,
    // paddingTop: 12
  },
});
