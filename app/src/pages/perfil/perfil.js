import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, Switch} from 'react-native'
import {style}   from './style'
import AsyncStorage from '@react-native-community/async-storage';
import FCM, { NotificationActionType } from "react-native-fcm";
import {connect} from 'react-redux' 
import Icon from 'react-native-fa-icons' 
import Login     from '../components/login'
import Footer    from '../components/footer'
import { getPerfil, getCerrarSesion, getInfoToken } from "../../redux/actions/usuarioActions"; 
import axios from 'axios';
 
 
class perfil extends Component{
	constructor(props) {
	  super(props);
	  this.state={
	   
	  }
    }
    componentWillMount(){
        axios.get("user/perfil")
        .then(res=>{
            this.setState({user:res.data.user, status:res.data.status})
        })
        FCM.getFCMToken().then(token => {
            this.props.getInfoToken(token)
            this.setState({token})
		});
    }
    componentWillReceiveProps(props){
        this.setState({infoToken:props.infoToken}) ///// recibo la informacion sobre si el usuario quiere recibir notificaciones
    }
    renderLogin(){
        const {navigation} = this.props
        const {navigate}   = this.props.navigation
        return (
            <View style={style.container}>
                <Login navigation={navigate} login={()=>this.props.getPerfil()} />
            </View>	 
        )
    }
    renderPerfil(){
        let {nombre, idUsuario, avatar, email, err, user} = this.state
        console.log(user.nombre)
        const {navigate} = this.props.navigation
        return (
            <View style={style.containerRegistro}>
                <View style={style.perfilContenedor}>
                    <View style={style.columna1}>
                        {
                            avatar=="null"
                            ?<Icon name={'user-circle'} style={style.iconAvatar} />
                            :<Image source={{uri:user.avatar}} style={style.avatar} />
                        } 
                    </View>
                    <View style={style.columna2}>
                        <Text style={style.nombre}>{user.nombre} {user.apellido}</Text>
                        <Text style={style.nombre}>{user.email}</Text>
                    </View>
                </View>	 
                <View>
                    <TouchableOpacity style={style.btnLista} onPress={()=>navigate("editarPerfil", {editar:true})} >
                        <Text style={style.txtLista}>Editar perfil</Text> 
                        <Icon name={'user-o'} style={style.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.btnLista} onPress={()=>navigate("misEventos", {editar:true})} >
                        <Text style={style.txtLista}>Mis Eventos</Text> 
                        <Icon name={'calendar-o'} style={style.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity  style={style.btnLista} onPress={()=>{this.cerrarSesion()}}>
                        <Text style={style.txtLista}>Cerrar Sesion</Text> 
                        <Icon name={'sign-out'} style={style.icon} />
                    </TouchableOpacity> 
                </View>	 
                {
                    err
                    &&<Text>{err}</Text>
                }
            </View>	     
        )
    }
    renderNotificaciones(){
        const {infoToken} = this.state
        return (
            <View style={style.containerNotificaciones}>
                <Text style={style.textNotificaciones}>Recibir notificaciones</Text>
                <Switch onValueChange = {(e)=>this.updateInfo(e)} value={infoToken} />
            </View>
        )
    }
    updateInfo(showNotificacion){
        const { infoToken, token } = this.state
        this.setState({infoToken:!infoToken})
        console.log("fercha")
        axios.put(`tok/tokenPhone`,{token, showNotificacion })
        .then(res=>{
            console.log(res.data)
        })

    }
	render(){
        const {status} = this.state
        const {navigation} = this.props
        return (
            <View  style={style.container}>
                {status ?this.renderPerfil() :this.renderLogin()}
                {this.renderNotificaciones()}
                <Footer navigation={navigation} />
            </View>
        )
    }	 
    cerrarSesion(){
        axios.get(`user/logout`)
        .then(res => {
            AsyncStorage.removeItem('idUsuario')
            this.setState({userId:null, status:false})
        })
        .catch(err => {
            console.log(err)
            this.setState({err})
        });
    }	 

}
const mapState = state => {
	return {
        perfil:state.usuario.perfil.user,
        cerrarSesiones:state.usuario.cerrarSesion,
        statusPerfil:state.usuario.perfil.status,
        infoToken:state.usuario.getInfoToken,
	};
};
  
const mapDispatch = dispatch => {
	return {
		getPerfil: () => {
			dispatch(getPerfil());
        },
		getInfoToken: (token) => {
			dispatch(getInfoToken(token));
        },
		getCerrarSesion: () => {
			dispatch(getCerrarSesion());
        },
         
	};
};

export default connect(mapState, mapDispatch)(perfil) 
