import React, { Component }        from 'react'
import { YellowBox } from 'react-native'
import axios                       from 'axios' 
import {Provider}                  from 'react-redux';
import MainRoutes                  from './src/routes/MainRoutes'
import configStore                 from './src/redux/store.js' //redux config
const store = configStore();
// import {searchUser, getCarrito, getCarrito2, getCatalogo, getOrders, getProductos} from './src/redux/actionCreator' 
YellowBox.ignoreWarnings(['Remote debugger']);
YellowBox.ignoreWarnings(['Require cycle:']);

//////////////////////////////////////////////////////////////////////////////////////////
//////  RUTA GENERAL DE LA URL PARA EL API
//////////////////////////////////////////////////////////////////////////////////////////
export const URL = 'http://192.168.0.6:8080/x/v1/';  //// test imdb
export const VERSION = "1.0.11"
axios.defaults.baseURL = URL;


//////////////////////////////////////////////////////////////////////////////////////////
//////  CREO EL COMPONENTE 
//////////////////////////////////////////////////////////////////////////////////////////
export default class App extends Component<{}> {
  
  componentDidMount(){
    // store.dispatch(getCarrito())
    // store.dispatch(getCarrito2())
    // store.dispatch(getCatalogo())
    // store.dispatch(getProductos()) 
  }
 
  render(){
    return (
      <Provider store={store}>
        <MainRoutes />
      </Provider> 
    )
  }
}