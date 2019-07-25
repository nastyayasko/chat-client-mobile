import React from 'react';
import { connect } from 'react-redux';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';

import {deleteConnection, changePage} from '../redux/actions';

class Menu extends React.Component {
  handleLogout = () => {
    const {connection} = this.props;
    connection.disconnect();
    this.props.deleteConnection();
    this.props.changePage('Friends');
    this.props.navigation.navigate('Login');
  }
  render(){
    const { currentPage, changePage } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => changePage('Friends')}> 
          <Image style={styles.img} 
            source={currentPage === 'Friends' ? require('../images/users-c.png') : require('../images/users.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changePage('Dialogs')}>
          <Image style={styles.img} 
          source={currentPage === 'Dialogs' ? require('../images/comment-c.png') : require('../images/comment.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleLogout}>
          <Image style={styles.img} source={require(`../images/off.png`)}></Image>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#f7f7f7', 
    borderTopColor: '#a4a4a4',
    borderTopWidth: 0.5,
    margin: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  img: {
    width: 32,
    height: 32,
  }
})
const mapStateToProps = state => ({
  connection: state.connection,
  currentPage: state.currentPage,
});
export default connect(mapStateToProps, {deleteConnection, changePage})(Menu);
