import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

import {color} from '../../constants';

function MyCheckBox(props) {
  let checked = true;
  const { user } = props;
  return (
    <View>
      <CheckBox
        title={`${user.firstName} ${user.lastName}`}
        // checkedColor={color}
        checked={checked}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  

})

export default MyCheckBox;
