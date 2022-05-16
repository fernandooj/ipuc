import React, { Component }        from 'react'
import { YellowBox, Text, NetInfo, StyleSheet  } from 'react-native'
import axios                       from 'axios' 
import {Provider}                  from 'react-redux';
import MainRoutes                  from './src/routes/MainRoutes'
import configStore                 from './src/redux/store.js' //redux config
import AsyncStorage from '@react-native-community/async-storage';
import FCM, { NotificationActionType } from "react-native-fcm";
const store = configStore();
// import {searchUser, getCarrito, getCarrito2, getCatalogo, getOrders, getProductos} from './src/redux/actionCreator' 
YellowBox.ignoreWarnings(['Remote debugger']);
YellowBox.ignoreWarnings(['Require cycle:']);

//////////////////////////////////////////////////////////////////////////////////////////
//////  RUTA GENERAL DE LA URL PARA EL API
//////////////////////////////////////////////////////////////////////////////////////////
// export const URL = 'https://picpuc.co/x/v1/';  //// prod 
// export const URL = 'http://134.209.147.143:8080/x/v1/';  //// test 
export const URL = 'http://192.168.0.4:3030/x/v1/';      //// test local
export const VERSION = "1.0.11"
axios.defaults.baseURL = URL;


//////////////////////////////////////////////////////////////////////////////////////////
//////  CREO EL COMPONENTE 
//////////////////////////////////////////////////////////////////////////////////////////
export default class App extends Component<{}> {
  constructor(){
    super();
    this.state={
      connection_Status : true
    }
  }
  async componentWillMount(){
    try {
		  let result = await FCM.requestPermissions({
			badge: false,
			sound: true,
			alert: true
		  });
		} catch (e) {
		  console.error(e);
		}
    let userId = await AsyncStorage.getItem('idUsuario');
    
    if (userId===null || userId==='0') {
      axios.get('user/perfil/')
      .then((res)=>{
        if(res.data.status){
          AsyncStorage.setItem('idUsuario', res.data.usuario._id)
        } 
       })
      .catch((err)=>{
         console.log(err)
      })
   }else{
      axios.get(`user/perfil/${userId}`)
      .then((res)=>{
        if(res.data.status){
          AsyncStorage.setItem('idUsuario', res.data.usuario._id)
        }
      })
      .catch((err)=>{
         console.log(err)
      })
    }
  }
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
        'connectionChange',
        this.handleConnectivityChange
    );
    NetInfo.isConnected.fetch().done((isConnected) => {
      isConnected ?this.setState({connection_Status :true}) : this.setState({connection_Status :false})
    });
  }
  handleConnectivityChange = (isConnected) => {
    isConnected ?this.setState({connection_Status :true}) : this.setState({connection_Status :false})
  };
 
  render(){
    return (
      <Provider store={store}>
        {
          !this.state.connection_Status
          ?<Text style={style.alert}>actualmente estas Offline</Text>
          :null
        }
        <MainRoutes />
      </Provider> 
    )
  }
}

const style = StyleSheet.create({
  alert: {
    color:"red"
  }
}); 