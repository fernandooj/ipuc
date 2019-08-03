import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native'
import {style}   from './style'
import {connect} from 'react-redux' 
import Icon from 'react-native-fa-icons' 
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import TomarFoto from "../components/tomarFoto";
import Footer    from '../components/footer'
import { getPerfil, getCerrarSesion } from "../../redux/actions/usuarioActions"; 
 
 
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
            this.setState({id:res.data.user._id})
        })
    }
     
    renderPerfil(){
        const {nombre, apellido, password, avatar, showPassword } = this.props
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
                <View style={style.contenedorPass}> 
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

                <TomarFoto 
                    source={avatar}
                    avatar
                    limiteImagenes={1}
                    imagenes={(imagen) => {  this.setState({imagen, showLoading:false}) }}
                /> 
                <TouchableOpacity style={style.btnEnviar} onPress={()=>this.guardarPerfil()} >
                    <Text style={style.textEnviar}>Editar perfil</Text> 
                </TouchableOpacity>
            </View>	 
        )
    }
	render(){
        const {statusPerfil} = this.props
        const {navigate} = this.props.navigation
       
        return (
            <View style={style.container}>
                <Text style={style.textTitulo}>Completa tu perfil</Text>
                {this.renderPerfil() }
                <Footer navigation={navigate} />
            </View>
            
        )
    }	 
    guardarPerfil(){
        const {nombre, password, apellido, imagen, id} = this.state
        if(!nombre || !password || !apellido || !imagen || !id){
            Toast.show("Todos los campos son obligatorios")
        }else{
            axios.put(`user/update/${id}`, {nombre, apellido})
            .then(res=>{
                if(res.data){
                    if(password){
                        this.password(password)
                    } 
                    if(imagen){
                        this.avatar(imagen, id)
                    }
                    Toast.show("Datos Actualizados")
                    this.props.navigation.navigate("Perfil")
                }else{
                    Toast.show("Tenemos un problema intentalo mas tarde")
                }
            })
        }
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
