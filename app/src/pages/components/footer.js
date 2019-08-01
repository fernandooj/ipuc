import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, Dimensions, SafeAreaView} from 'react-native'
import {style} from './style'
 
export default class FooterComponent extends Component{
	constructor(props) {
	  super(props);
	}
	render(){
		const {home, titulo, navigation} = this.props
		///console.log(navigation)
	    return <View style={style.contenedorFooter}> 
					<View style={style.contenedorFooter}>
						<TouchableOpacity style={style.subContenedorFooter} onPress={()=>navigation.navigate('Home')}>
							<Image source={require("../../assets/img/buscar.png")} style={style.imagen} />
							<Text style={style.textFooter}>EXPLORAR</Text>
						</TouchableOpacity>
						<TouchableOpacity style={style.subContenedorFooter} onPress={()=>navigation.navigate('Catalogo')}>
							<Image source={require("../../assets/img/bookmark.svg")} style={style.imagen}/>
							<Text style={style.textFooter}>EVENTOS</Text>
						</TouchableOpacity>
						<TouchableOpacity style={style.subContenedorFooter} onPress={()=>navigation.navigate('nuevoEvento')}>
							<Image source={require("../../assets/img/plus.png")} style={style.imagen}/>
							<Text style={style.textFooter}>NUEVO</Text>
						</TouchableOpacity>
						<TouchableOpacity style={style.subContenedorFooter}  onPress={()=>navigation.navigate('GanaMas')}>
							<Image source={require("../../assets/img/mensaje.png")} style={style.imagen} />
							<Text style={style.textFooter}>MENSAJES</Text>
						</TouchableOpacity>
						<TouchableOpacity style={style.subContenedorFooter} onPress={()=>navigation.navigate('Perfil')}>
							<Image source={require("../../assets/img/perfil.png")} style={style.imagen} />
							<Text style={style.textFooter}>PERFIL</Text>
						</TouchableOpacity>
					</View>
			   	</View>
	}
}


