import React from 'react';
import { CheckBox } from 'react-native-elements';

import {color} from '../constants';

function MyCheckBox(props) {
  const { user, check, checked } = props;
  return (
    <CheckBox
      title={`${user.firstName} ${user.lastName}`}
      checkedColor={color}
      checked={checked?checked:false}
      onPress={check}
      />
  )
}

export default MyCheckBox;
