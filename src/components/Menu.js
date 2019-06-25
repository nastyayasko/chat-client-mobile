import React from 'react';
import { Image, View, StyleSheet, SafeAreaView} from 'react-native';
import {color} from '../../constants';

function Menu() {
  return (
    <View style={styles.container}>
      <Image
          source={require('../images/users-solid.svg')}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:color, 
    margin: 0,
  }
})

export default Menu;
