import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import {StyleSheet, View, Text} from 'react-native';

export default class SignupSection extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Create Account</Text>
        <Text style={styles.text}>Forgot Password?</Text>
      </View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding:5
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
});
