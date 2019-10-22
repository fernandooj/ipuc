import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import Icon from 'react-native-fa-icons'; 
import AsyncStorage from '@react-native-community/async-storage';

import {style} from './style'
 
export default class FooterComponent extends Component{
	constructor(props) {
		super(props);
		this.state={
			idUsuario:null
		}
	}
	async componentWillMount(){
		const idUsuario = await AsyncStorage.getItem('idUsuario')
		idUsuario ?this.setState({idUsuario}) :null
  }
	render(){
		const {home, titulo, navigation} = this.props
		const {idUsuario} = this.state
		return (
			<View style={style.contenedorFooter}> 
				<TouchableOpacity style={style.subContenedorFooter} onPress={()=>navigation.navigate('Home')}>
					{/* <Image source={require("../../assets/img/buscar.png")} style={style.imagen} /> */}
					<Icon name={'search'} allowFontScaling style={style.iconFooter} />
					<Text style={style.textFooter}>EXPLORAR</Text>
				</TouchableOpacity>
				<TouchableOpacity style={style.subContenedorFooter} onPress={()=>navigation.navigate(idUsuario ?'eventosGuardados' :"Perfil")}>
					{/* <Image source={require("../../assets/img/bookmark.svg")} style={style.imagen}/> */}
					<Icon name={'bookmark-o'} allowFontScaling style={style.iconFooter} />
					<Text style={style.textFooter}>EVENTOS</Text>
				</TouchableOpacity>
				<TouchableOpacity style={style.subContenedorFooter} onPress={()=>navigation.navigate(idUsuario ?'nuevoEvento' :"Perfil")}>
					{/* <Image source={require("../../assets/img/plus.png")} style={style.imagen}/> */}
					<Icon name={'plus-square-o'} allowFontScaling style={style.iconFooter} />
					<Text style={style.textFooter}>NUEVO</Text>
				</TouchableOpacity>
				{/* <TouchableOpacity style={style.subContenedorFooter}  onPress={()=>navigation.navigate('eventoMensajes')}>
					
					<Icon name={'commenting-o'} allowFontScaling style={style.iconFooter} />
					<Text style={style.textFooter}>MENSAJES</Text>
				</TouchableOpacity> */}
				<TouchableOpacity style={style.subContenedorFooter} onPress={()=>navigation.navigate('Perfil')}>
					{/* <Image source={require("../../assets/img/perfil.png")} style={style.imagen} /> */}
					<Icon name={'user-o'} allowFontScaling style={style.iconFooter} />
					<Text style={style.textFooter}>PERFIL</Text>
				</TouchableOpacity>
			</View>
		)
	}
}


