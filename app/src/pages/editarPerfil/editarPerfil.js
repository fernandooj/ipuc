import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native'
import {style}   from './style'
import {connect} from 'react-redux' 
import Icon from 'react-native-fa-icons' 
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import TomarFoto from "../components/tomarFoto";
import Footer    from '../components/footer'

 
 
class perfil extends Component{
	constructor(props) {
	  super(props);
	  this.state={
        user:{},
        imagenes:[]
	  }
    }
    componentWillMount(){
       
        axios.get("user/perfil")
        .then(res=>{
            console.log(res.data.user)
            let imagenes = []
            imagenes.push({uri:res.data.user.avatar})
            this.setState({
                id      :res.data.user._id, 
                nombre  :res.data.user.nombre, 
                apellido:res.data.user.apellido, 
                tipo    :res.data.user.tipo, 
                imagenes
            })
        })
    }
     
    renderPerfil(){
        const {nombre, apellido, avatar, showPassword, tipo } = this.state
        const {password, imagenes} = this.state
        console.log({tipo})
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
                <TouchableOpacity style={style.btnEnviar} onPress={()=>this.guardarPerfil()} >
                    <Text style={style.textEnviar}>Editar perfil</Text> 
                </TouchableOpacity>
            </View>	 
        )
    }
	render(){
        const {statusPerfil} = this.props
        const {navigation} = this.props
       
        return (
            <View style={style.container}>
                <Text style={style.textTitulo}>Completa tu perfil</Text>
                {this.renderPerfil() }
                <Footer navigation={navigation} />
            </View>
            
        )
    }	 
    guardarPerfil(){
        const {nombre, password, apellido, imagenes, tipo, id} = this.state
        const {editar} = this.props.navigation.state.params
        let contraseña =  editar ?true :false
        console.log({nombre, password, apellido, imagenes, tipo, id, contraseña, editar})
        if(nombre.length<3 || !contraseña || apellido.length<3 || imagenes.length<1 || !id){
            Toast.show("Todos los campos son obligatorios")
        }else{
            axios.put(`user/update/${id}`, {nombre, apellido})
            .then(res=>{
                if(res.data){
                    if(password){
                        this.password(password)
                    } 
                    if(imagenes){
                        this.avatar(imagenes, id)
                    }
                    console.log(res.data)
                    this.edicionExitoso(res.data.usuario._id) 
                }else{
                    Toast.show("Tenemos un problema intentalo mas tarde")
                }
            })
        }
    }
    async edicionExitoso(idUsuario){
		console.log(idUsuario)
		AsyncStorage.setItem('idUsuario', idUsuario)
        Toast.show("Datos Actualizados")
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
    console.log(state)
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
