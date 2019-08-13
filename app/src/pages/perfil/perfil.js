import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import {style}   from './style'
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux' 
import Icon from 'react-native-fa-icons' 
import Login     from '../components/login'
import Footer    from '../components/footer'
import { getPerfil, getCerrarSesion } from "../../redux/actions/usuarioActions"; 
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
            console.log(res.data.user)
            this.setState({user:res.data.user, status:res.data.status})
        })
    }
    renderLogin(){
        const {navigate} = this.props.navigation
        return <View style={style.container}>
            <Login navigation={navigate} login={()=>this.props.getPerfil()} />
            <Footer navigation={navigate} />
        </View>	 
    }
    renderPerfil(){
        let {nombre, idUsuario, avatar, email, err, user} = this.state
        console.log(user.nombre)
       
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
                    <TouchableOpacity style={style.btnLista} onPress={()=>navigation.navigate("editarPerfil", {tipoAcceso:null})} >
                        <Text style={style.txtLista}>Editar perfil</Text> 
                        <Icon name={'user-o'} style={style.icon} />
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
	render(){
        const {status} = this.state
        const {navigation} = this.props
        return (
            <View  style={style.container}>
                {status ?this.renderPerfil() :this.renderLogin()}
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
    console.log(state.usuario.cerrarSesion)
	return {
        perfil:state.usuario.perfil.user,
        cerrarSesiones:state.usuario.cerrarSesion,
        statusPerfil:state.usuario.perfil.status,
	};
};
  
const mapDispatch = dispatch => {
	return {
		getPerfil: () => {
			dispatch(getPerfil());
        },
		getCerrarSesion: () => {
			dispatch(getCerrarSesion());
        },
         
	};
};

export default connect(mapState, mapDispatch)(perfil) 
