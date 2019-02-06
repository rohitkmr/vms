import React, {Component} from 'react';
import {StyleSheet,View,Text,Image} from 'react-native';
import Wallpaper from '../Wallpaper';
import SignupSection from './SignupSection';
import { Form, Item, Input, Label ,Button} from 'native-base';



export default class Login extends Component{
  render(){
      return(
        <Wallpaper>
          <View style={styles.container}>
          <View style={styles.logoContainer}>
          <Image style={styles.logo}
          source={require('../../images/logo.png')}
          />
          <Text style={styles.title}>VMS
          </Text>
          </View>
          <View style={styles.formContainer}>
          <Form>
            <Item floatingLabel style={styles.item}>
              <Label style={styles.label}>Username</Label>
              <Input style={styles.input}
              />
            </Item>
            <Item floatingLabel  style={styles.item}>
              <Label style={styles.label}>Password</Label>
              <Input style={styles.input}
              />
            </Item>
          </Form>
          <Button full style={{margin:20}} >
            <Text style={{color:'#FFF'}}>SIGN IN</Text>
          </Button>
          <SignupSection />
          </View>
          </View>
          </Wallpaper>
      );
  }
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo:{
       width:100,
       height:100
    }, 
    title:{
     color:'#FFF',
     textAlign:'center',
     opacity:0.9
    },
    formContainer:{
        flex: 1,
        marginTop:-40
    },item:{
       marginRight:15, 
    },label:{
       color:'#FFF'
    },input:{
      color:'#FFF'
    }
  });
  