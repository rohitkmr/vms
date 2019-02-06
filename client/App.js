import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import Login from './app/components/login/login';



export default class App extends Component {
  render(){
    return ( 
	   <Login></Login>
    )
  };

} 
