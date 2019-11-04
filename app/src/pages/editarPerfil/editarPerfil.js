import React, {Component} from 'react'
import {View, Text, Platform, TouchableOpacity, TextInput} from 'react-native'
import {style}          from './style'
import publicIP         from 'react-native-public-ip';
import FCM              from "react-native-fcm";
import Icon             from 'react-native-fa-icons' 
import axios            from 'axios';
import Toast            from 'react-native-simple-toast';
import { connect }      from "react-redux";
import AsyncStorage     from '@react-native-community/async-storage';
import TomarFoto        from "../components/tomarFoto";
import Footer           from '../components/footer'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
 
 
class perfil extends Component{
	constructor(props) {
	  super(props);
	  this.state={
        user:{},
        password:"",
        nombre:"",
        apellido:"",
        imagenes:[]
	  }
    }
    componentWillMount(){
        FCM.getFCMToken().then(token => {
			console.log("TOKEN (getFCMToken)", token);
			this.setState({ token: token || "" });
        });
        let {editar} = this.props.navigation.state.params
        console.log({editar})
        axios.get("user/perfil") 
        .then(res=>{
            console.log(res.data.user)
            let imagenes = []
            res.data.user.avatar &&imagenes.push({uri:res.data.user.avatar})
            editar
            ?this.setState({
                id      :res.data.user._id, 
                nombre  :res.data.user.nombre, 
                apellido:res.data.user.apellido, 
                tipo    :res.data.user.tipo, 
                imagenes
            })
            :this.setState({id :res.data.user._id })
                
        })
        //////////////////////////////////////////////////////////////////////////////////////////////////  		ACCESO GEOLOCALIZACION
        if (Platform.OS==='android') {
            navigator.geolocation.getCurrentPosition(e=>{
                let lat =parseFloat(e.coords.latitude)
                let lng = parseFloat(e.coords.longitude)
                this.setState({lat, lng})
            }, 
                (error)=>this.watchID = navigator.geolocation.watchPosition(e=>{
                let lat =parseFloat(e.coords.latitude)
                let lng = parseFloat(e.coords.longitude)
                this.setState({lat, lng})
            },
                (error) => alert("error"),
                {enableHighAccuracy: true, timeout:5000, maximumAge:0})
            )
        }else{
            navigator.geolocation.getCurrentPosition(e=>{
                let lat =parseFloat(e.coords.latitude)
                let lng = parseFloat(e.coords.longitude)
                this.setState({lat, lng})
            }, 
                (error)=>this.watchID = navigator.geolocation.watchPosition(e=>{
                let lat =parseFloat(e.coords.latitude)
                let lng = parseFloat(e.coords.longitude)
                this.setState({lat, lng})
            },
                (error) => alert("error"),
                {enableHighAccuracy: true, timeout:5000, maximumAge:0})
            )
        }
            
    }
     
    renderPerfil(){
        const {nombre, apellido, avatar, showPassword, tipo } = this.state
        const {password, imagenes, loading} = this.state
       
        return (
            <View style={style.perfilContenedor}>
                <TextInput
                    style={style.input}
                    onChangeText={(nombre) => this.setState({nombre}) }
                    value={nombre}
                    underlineColorAndroid='transparent'
                    placeholder="Nombre"
                    placeholderTextColor='#8F9093' 
                    autoCapitalize = 'none'
                />
                <TextInput
                    style={style.input}
                    onChangeText={(apellido) => this.setState({apellido}) }
                    value={apellido}
                    underlineColorAndroid='transparent'
                    placeholder="Apellido"
                    placeholderTextColor='#8F9093' 
                    autoCapitalize = 'none'
                />
                {
                    (tipo=="google" || tipo=="facebook")
                    ?<Text></Text>
                    :<View style={style.contenedorPass}> 
                        <TextInput 
                            style={style.input}
                            onChangeText={(password) => this.setState({password})}
                            value={password}
                            underlineColorAndroid='transparent'
                            placeholder="Contraseña"
                            placeholderTextColor="#8F9093" 
                            secureTextEntry={showPassword ?false :true}
                            autoCapitalize = 'none'
                            onFocus={() => {
                                this.setState({ alertErrorLogin:false, usuarioNoExiste:false }); 
                            }}
                        />
                        <TouchableOpacity onPress={()=>this.setState({showPassword:!showPassword})} style={style.btnIconPass} > 
                            <Icon name={showPassword ?'eye-slash' :'eye'} allowFontScaling style={style.iconPass} />
                        </TouchableOpacity>
                    </View>
                }
              

                <TomarFoto 
                    source={avatar}
                    avatar
                    width={120}
                    limiteImagenes={1}
                    imagen={imagenes}
                    imagenes={(imagenes) => {  this.setState({imagenes, showLoading:false}) }}
                /> 
                <TouchableOpacity style={style.btnEnviar} onPress={loading ?null :()=>this.guardarPerfil()}  >
                    <Text style={style.textEnviar}>{loading ?"Guardando ..." :"Editar perfil"}</Text> 
                </TouchableOpacity>
            </View>	 
        )
    }
	render(){
        const {statusPerfil} = this.props
        const {navigation} = this.props
        console.log(this.state.lat, this.state.lng)
        return (
            <View style={style.container}>
                <Text style={style.textTitulo}>Completa tu perfil</Text>
                {this.renderPerfil() }
                <Footer navigation={navigation} />
            </View>
            
        )
    }	 
    guardarPerfil(){
        this.setState({loading:true})
        const {nombre, password, apellido, imagenes, tipo, id, lat, lng} = this.state
        let {editar} = this.props.navigation.state.params
        editar = editar ?true :password.length<3 ?false :true 
        let contraseña = (tipo==="google" || tipo==="facebook" ) ?true :!editar ?false :true   //////// la contraseña solo es obligatoria si no ingresa por las redes
        console.log({nombre, password, apellido, imagenes, tipo, id, contraseña, editar})
        if(nombre.length<3 || !contraseña || apellido.length<3   || !id){
            Toast.show("Todos los campos son obligatorios")
            this.setState({loading:false})
        }else{
            publicIP()
            .then(ip => {
                ip = ip ?ip :"186.155.13.27"
               
                axios.put(`user/update/${id}/${ip}/${lat}/${lng}`, {nombre, apellido})
                .then(res=>{
                    if(res.data){
                        if(password){
                            this.password(password)
                        } 
                        if(imagenes.length>0){
                            this.avatar(imagenes, id)
                        }
                        this.edicionExitoso(res.data.usuario._id) 
                    }else{
                        Toast.show("Tenemos un problema intentalo mas tarde")
                    }
                })
            })
        }
    }
    async edicionExitoso(idUsuario){
		console.log(idUsuario)
		AsyncStorage.setItem('idUsuario', idUsuario)
        Toast.show("Datos Actualizados")
        this.setState({loading:false})
        this.props.navigation.navigate("Home")
    }
    
    password(password){
        axios.put("user/password", {password})
        .then(res=>{
            console.log(res.data)
        })
    }
    avatar(imagen, idUser){
        console.log({imagen, idUser})
        this.setState({showLoading:true})
        let data = new FormData();
        imagen = imagen[0]
 
        data.append('imagen', imagen);
        data.append('idUser', idUser);
        axios({
            method: 'post',  
            url: 'user/avatar',
            data: data,
        })
        .then((res)=>{
            console.log(res.data)
        })
        .catch(err=>{
            this.setState({cargando:false})
        })
    }
}
const mapState = state => {
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
