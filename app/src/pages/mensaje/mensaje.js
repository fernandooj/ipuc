import React, {Component} from 'react'
import {View, Text, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity, Platform, Image, Dimensions, Modal, ActivityIndicator, Alert} from 'react-native'
import AsyncStorage   from '@react-native-community/async-storage';
import {style}   	    from './style'
import {connect} 	    from 'react-redux' 
import axios     		  from 'axios' 
import Icon 			    from 'react-native-fa-icons' 
import update 			  from 'react-addons-update';
 
 
import SocketIOClient from 'socket.io-client';
 
 
import {sendRemoteNotification} from '../push/envioNotificacion';
 
import { getMensajes } from "../../redux/actions/eventoActions.js";
import {URL} from "../../../App"
let size = Dimensions.get('window');
 
class Conversacion extends Component{
	constructor(props) {
	  super(props);
	  this.state={
		top:0,
		bottom:0,
		mensaje:"",
		mensajes:[],
		evento:{}
	  }
	  
	}
	async componentWillMount(){
		 
			const idUsuario = await AsyncStorage.getItem('idUsuario')
			 
		 
		// const {id} = this.props.navigation.state.params
		const id = "5d425e64f65ea6603d977ce1"
		// console.log(id)
		this.setState({id, idUsuario})
		this.props.getMensajes(id)
	 
		this.socket = SocketIOClient(URL);
		this.socket.on(`chatConversacion`, 	this.reciveMensanje.bind(this));
		 
	}  
	componentWillReceiveProps(props){
		this.setState({mensajes:props.mensajes, evento:props.evento})
	}
 
	reciveMensanje(messages) {
		console.log({messages})
		this.setState({
			mensajes: update(this.state.mensajes, {$push: [messages]})
	 	})
	}
	renderMensajes(){
		const {usuario, navigator} = this.props
		const {tokenPhone, mensajes} = this.state
		console.log(mensajes)
		return mensajes.map((e, key)=>{
			let imagen = e.tipo==2 ?e.imagen.split("-") :null
			return(
				<View style={tokenPhone==e.usuarioId.tokenPhone ?style.conMensaje2 :style.conMensaje1} key={key}>
					<View style={tokenPhone==e.usuarioId.tokenPhone ?style.mensaje2 :style.mensaje1}>
						<Text>{e.mensaje}</Text>	
					</View>
				</View>
			)
		})
	}
	renderCabezera(){
		const {idUsuario, evento} = this.state
		let avatar = idUsuario==evento.usuario._id || acceso=="solucion" ?null :usuarioId1.avatar
		// let nombre = acceso=="admin" || acceso=="solucion" ?usuarioId2.nombre :usuarioId1.nombre
		console.log(idUsuario)
		console.log(evento)
		return(
			<View style={style.contenedorCabezera}>
				{/* <TouchableOpacity onPress={()=>this.props.navigation.navigate("Home")}>
					<Icon name={'chevron-left'} style={style.iconCabezera} />
				</TouchableOpacity>
				<TouchableOpacity style={style.contenedorAvatar} >
					{
						avatar
						?<Image source={{uri:avatar}} style={style.avatar} />
						:<Icon name={'user-circle'} style={style.iconUser} />
					}
			 
				</TouchableOpacity>	
				<Text style={style.nombre}>{nombre}</Text> */}
				 
			</View>
		)
	}
	renderFooter(){
		const {mensaje, height} = this.state
		return(
			<View style={style.contenedorFooter}>
				 
				<TouchableOpacity onPress={()=> this.setState({subirImagen:true})} style={style.btnEnviar}>
					<Icon name={'camera'} style={style.icon} />
				</TouchableOpacity>
				<TextInput
					value={mensaje}
					onChangeText={mensaje => this.setState({ mensaje })}
					style={style.input}
					ref='username' 
				/>
				<TouchableOpacity onPress={mensaje.length==0 ?null :()=>this.handleSubmit()} style={style.btnEnviar}>
					<Icon name={'paper-plane'} style={style.icon} />
				</TouchableOpacity>
			</View>
		)
	}
	render(){
		const {activo, usuarioId1, usuarioId2} = this.props.conversacion
		const {acceso, height, mensajes} = this.state
		return (
			<View style={style.container}>
				{this.renderCabezera()}
				{/* <Text style={style.textoUnirse}>{acceso=="admin" || acceso=="solucion" ?usuarioId2.nombre :usuarioId1.nombre} se ha unido a esta conversación</Text> */}
				{mensajes.length<=6 ?<View style={style.contenedorMensajes}>{this.renderMensajes()}</View> :null}
			{
				Platform.OS=='android'
				?<View style={{flex:1}}>
					<KeyboardAvoidingView style={style.contenedorMensajes} keyboardVerticalOffset={0} behavior={"position"} >
						<ScrollView  ref={(view) => { this.scrollView = view }} style={style.subContenedorMensajes}
							onContentSizeChange={(width,height) => this.scrollView.scrollTo({y:height})}
						>
						{mensajes.length>6 &&this.renderMensajes()}
						</ScrollView>
					</KeyboardAvoidingView>
					<View style={mensajes.length<=6 ?style.contenedorFooter2 :null}>
						{activo &&this.renderFooter()}
					</View>
				</View>
				:<KeyboardAvoidingView style={style.contenedorMensajes} keyboardVerticalOffset={mensajes.length<=6 ?0 :32} behavior={"position"} >
					<ScrollView  ref={(view) => { this.scrollView = view }} style={style.subContenedorMensajes}
						onContentSizeChange={(width,height) => {this.scrollView.scrollTo({y:height}); this.setState({height}) }} > 
						{mensajes.length>6 &&this.renderMensajes()}
					</ScrollView> 
					<View style={mensajes.length<=6 ?style.contenedorFooter2 :null}>
						{activo &&this.renderFooter()}
					</View>
				</KeyboardAvoidingView>
			}
			</View>
		)
	}

  
	///////////////////////////////////////////////////////////////
	//////////////         ENVIO EL MENSAJE
	///////////////////////////////////////////////////////////////
	handleSubmit(){
		this.setState({showSpin:true})
		const {usuarioId1, usuarioId2, _id} = this.props.conversacion
		const {id, acceso} = this.state
		let userId 	   =  acceso=="admin" || acceso=="solucion" ?usuarioId1._id :usuarioId2._id
		let userId2    =  acceso=="admin" || acceso=="solucion" ?usuarioId2._id :usuarioId1._id
		let tokenPhone = acceso=="admin" || acceso=="solucion" ?usuarioId2.tokenPhone :usuarioId1.tokenPhone
		const {mensaje} = this.state
		const Fullmensaje = {
			mensaje: mensaje, 
			userId2: userId2, 
			usuarioId:{
				usuarioId:userId,
				tokenPhone:this.state.tokenPhone,
			},
			conversacionId:_id,
			tipo:1
		}
		this.socket = SocketIOClient(URL);
		this.socket.emit('chatConversacion', JSON.stringify(Fullmensaje))
	
		axios.post('men/mensaje/', {...Fullmensaje})
		.then(e=>{
			console.log(e.data)
			if(e.data.status){
				this.setState({mensaje:"", showSpin:false}) 
				sendRemoteNotification(1, tokenPhone, "conversacion", "nuevo mensaje", `: ${mensaje}`, null, null )
			
			}else{
				alert("Opss!! tuvimos un error intentalo nuevamente")
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
}
const mapState = state => {
	// console.log(state.evento)
	return {
		evento :state.evento.mensajes.evento,
		mensajes:state.evento.mensajes.mensajes,
	};
};
  
const mapDispatch = dispatch => {
	return {
		getMensajes: (id) => {
			dispatch(getMensajes(id));
		},
	};
};
Conversacion.defaultProps = {
	mensaje: [],
	conversacion: [{usuarioid1:{}, usuarioid2:{}}],
};
 
 
 
	   
export default connect(mapState, mapDispatch)(Conversacion) 
