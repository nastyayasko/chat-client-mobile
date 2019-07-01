import React from 'react';
import { connect } from 'react-redux';
import { Image, View, StyleSheet, TouchableOpacity} from 'react-native';

import {color} from '../../constants';
import {deleteConnection} from '../redux/actions';

class Menu extends React.Component {
  handleLogout = () => {
    const {connection} = this.props;
    connection.disconnect();
    this.props.deleteConnection();
    this.props.navigation.navigate('Login')
  }
  render(){
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Dialogs')}>
          <Image style={styles.img} source={require('../images/comment.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Friends')}> 
          <Image style={styles.img} source={require('../images/users.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('GroupForm')}>
          <Image style={styles.img} source={require('../images/add.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleLogout}>
          <Image style={styles.img} source={require('../images/off.png')}></Image>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:color, 
    margin: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  img: {
    width: 40,
    height: 40,
  }
})
const mapStateToProps = state => ({
  connection: state.connection,
});
export default connect(mapStateToProps, {deleteConnection})(Menu);
