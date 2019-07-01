import React from 'react';
import { connect } from 'react-redux';
import {View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';

import {mainStyles, color} from '../constants';
import Head from '../components/Head';
import ListItem from '../components/ListItem';
import { getDialogs, setCurrentDialog } from '../redux/actions';

import Menu from '../components/Menu'

class Dialogs extends React.Component {
  static navigationOptions = {
    header: null,
  }
  chooseDialog = (id) => {
    const { dialogs } = this.props;
    const dialog = dialogs.find(d => d._id === id);
    this.props.setCurrentDialog(dialog);
    this.props.navigation.navigate('Chat', {title: dialog.title} );
  }
  componentDidMount() {
    const {user} = this.props;
    this.props.getDialogs(user._id);
  }
  render () {
    const { dialogs } = this.props;
    const groupDialogs = dialogs.filter(dialog => dialog.type === 'group');
    return (
      <View  style={mainStyles.container}>
        <SafeAreaView style={{backgroundColor: color}}></SafeAreaView>
        <Head title='Dialogs' style={{flex:1}} />
        <View style={{flex:9}}>
          <ScrollView>
            {
              groupDialogs.map(dialog => (
                <TouchableOpacity key={dialog._id} onPress={() => {this.chooseDialog(dialog._id)}}>
                  <ListItem img={dialog.img} title={dialog.title}/>
                </TouchableOpacity>  
              ))
            }
          </ScrollView>
        </View>
        
        <View style={{flex:1}}>
          <Menu navigation={this.props.navigation}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
})

const mapStateToProps = state => ({
  user: state.user,
  dialogs: state.dialogs,
});

export default connect(mapStateToProps, { getDialogs, setCurrentDialog })(Dialogs);