import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default function ListItem (props) {
 const {img, title} = props;
  return (
    <View style={styles.item}>
      <View style={{flex:1}}>
        <Image style={styles.img} source={{uri: img}}></Image>
      </View>
      <View style={{flex:4}}>
        <Text style={styles.name}>{title}</Text>
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
  img: {
    width: 50,
    height: 50
  },
  name: {
    flex:1,
    fontSize: 20,
    paddingTop: 12
  },
});
