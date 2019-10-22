import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, Animated, Button, ScrollView, ActivityIndicator} from 'react-native'
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import FBSDK from "react-native-fbsdk";
import {style} from './style'
import {connect}   from 'react-redux' 
import { GoogleSignin } from 'react-native-google-signin';
import Icon from 'react-native-fa-icons'; 
import axios from 'axios'
import FCM, { NotificationActionType } from "react-native-fcm";
import CodeInput from 'react-native-confirmation-code-input';
import KeyboardListener from 'react-native-keyboard-listener';
 
const {
	GraphRequest, GraphRequestManager,
	LoginManager,
	AccessToken
  } = FBSDK;

  class Login extends Component{
	constructor(props) {
	  super(props);
	  this.state={
			userInfo:{},
			username:"",
			password:"",
			email:"",
			token:"0000",
			inputEmail:new Animated.Value(0),
			inputPassword:new Animated.Value(500),
	  }
	}
	async componentWillMount(){
		GoogleSignin.configure()
		FCM.getFCMToken().then(tokenPhone => {
		console.log("TOKEN (getFCMToken)", tokenPhone);
			this.setState({ tokenPhone: tokenPhone || "" });
		});
	}
	 
	signIn(e){
		const {tokenPhone} = this.state
		if (e===1) {
			LoginManager.logInWithPermissions(['email']).then((result)=> {
			
				AccessToken.getCurrentAccessToken().then((token) => {
					const responseCallback = ((error, res) => {
						if (error) {
							console.log(JSON.stringify(err))
						} else {
							res.ok = true
							res.json = result
							console.log("e")
							console.log(res)
							if(!res.json.isCancelled){
								axios.post("user/redes", {tokenPhone, token: token.accessToken, username:res.email, email:res.email, tipo:"facebook", nombre:res.first_name, apellido:res.last_name, avatar:res.picture.data.url}).then(e=>{
									this.loginRedesExitoso(e.data.code, e.data.user._id)
								})	
							}
						}
					 })
					 
					const profileRequestParams = {
						fields: {
							string: 'id, name, email, first_name, last_name, gender, picture.type(large)'
						}
					}
					const profileRequest = new GraphRequest(
								'/me',
								{httpMethod: 'GET', version: 'v2.5', parameters: profileRequestParams, accessToken: token.accessToken.toString()},
								responseCallback,
					)
					new GraphRequestManager().addRequest(profileRequest).start();
				})
			})
 
		}else{
			GoogleSignin.signIn()
			.then((result) => {
				console.log({result})
				let {name, photo, email, givenName, familyName} = result.user
				axios.post("user/redes", {tokenPhone, token:result.accessToken, username:email, email, tipo:'google', nombre:givenName, apellido:familyName, avatar:photo}).then((e)=>{
					// e.data.code==1 ?this.props.navigation("editarPerfil") :e.data.code==2 ?this.props.navigation("Home") :alert("Intenta Nuevamente")
					this.loginRedesExitoso(e.data.code, e.data.user._id)
				})
				.catch((err)=>{
					console.log(err)
				})
			})
			.catch((err) => {
				console.log(JSON.stringify(err))
			})
			.done();
		}
	}
	 
	renderLogin(){
		const {iniciarSesion, email, password, showPassword, loading, err} = this.state
		console.log({iniciarSesion})
		return(
			<View style={style.contenedorForm}>
				<Text style={style.titulo}>UNETE A PICPUC</Text>
				<View style={style.contenedorRedes}>
					{/* <TouchableOpacity style={style.btnFacebook} onPress={()=>this.signIn(1)}>
						<Text style={style.textBtn}>FACEBOOK</Text>
					</TouchableOpacity>  */}
					<TouchableOpacity style={style.btnGoogle}  onPress={()=>this.signIn(2)}>
						<Text style={style.textBtn}>GOOGLE</Text>
					</TouchableOpacity>
				</View>
				 
				<View style={style.contenedorSeparador}>
					<View style={style.separador}></View>
					<Text style={style.textSeparador}>O</Text>
					<View style={style.separador}></View>
				</View>
			 
				<Animated.View style={{left:this.state.inputEmail}}>
					<TextInput
						style={style.input}
						onChangeText={(email) => this.verifyEmail(email) }
						value={email}
						underlineColorAndroid='transparent'
						placeholder="Email"
						placeholderTextColor='#8F9093' 
						autoCapitalize = 'none'
						keyboardType='email-address'
						onFocus={() => {
							 
							this.setState({ alertErrorLogin:false, usuarioNoExiste:false }); 
						}}
					/>
				</Animated.View>
				<Animated.View style={[style.contenedorPass, {left:this.state.inputPassword}]}> 
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
				</Animated.View>
				<TouchableOpacity onPress={() => {loading ?null :iniciarSesion ?this.login() :this.handleSubmit()}} style={style.btnEnviar}>
						<Text style={style.textEnviar}>{loading ?"INICIANDO" :iniciarSesion ?"INICIAR SESIÓN" :"INICIAR"}</Text>
						{loading &&<ActivityIndicator size="small" color="#fff" />}
				</TouchableOpacity> 
					 
				{
					iniciarSesion
					?<Button 
						title="OLVIDE MI CONTRASEÑA"
						color="#0071bb" loading={loading} onPress={() => this.setState({recuperarContrasena:true})}
					/>
					:null		
				}
				{
					err
					&&<Text style={style.err}>{err}</Text>
					
				}
			</View>
		)
	}
	login(){
		const { email, password, tokenPhone } = this.state;
		axios.post("user/login", { username:email, password, tokenPhone })
    .then(e => {		 
			e.data.code==1 ?this.loginExitoso(e.data.user._id) :Toast.show("Datos Incorrectos")
		})
	}
	async loginRedesExitoso(code, idUsuario){
		console.log(idUsuario)
		AsyncStorage.setItem('idUsuario', idUsuario)
		const {navigation} = this.props	
		code==1 ?navigation("editarPerfil", {editar:true}) :code==2 ?navigation("Home") :alert("Intenta Nuevamente")
	}
	async loginExitoso(idUsuario){
		console.log(idUsuario)
		AsyncStorage.setItem('idUsuario', idUsuario)
		const {navigation} = this.props	
		navigation("Home")
	}
	handleSubmit(e){
		this.setState({loading:true})
		const {email, inputEmail, inputPassword } = this.state
		axios.post('user/sign_up', {username:email, email})
		.then(res=>{
			console.log(res.data)
			if(res.data.code==0){
				this.setState({iniciarSesion:true, loading:false})
				Animated.timing(inputEmail,{
					toValue:-900,
					duration:400,
				}).start()
				Animated.timing(inputPassword,{
					toValue:0,
					duration:400,
				}).start()
			}
			if(res.data.code==2){
				this.setState({showInsertarCodigo:true, token:res.data.token.toString()})
			}
			if(res.data.code==1){
				this.setState({showInsertarCodigo:true, token:res.data.token.toString()}) 
			}
		})
		.catch(err=>{
			this.setState({loading:false})
		})
	}

	renderRecuperarContrasena(){
		const {showLoading, email, emailVerify} = this.state
		return(
			<View>
				<View style={style.regresarContenedor}>
					<TouchableOpacity onPress={()=>this.setState({recuperarContrasena:false, email:""})}>
						<Icon name={'arrow-left'} allowFontScaling style={style.iconRegresar} />
					</TouchableOpacity>
					<Text style={style.tituloRegresar}>Recuperar Contraseña</Text>
				</View>
				<View style={style.contenedorEmailRegistro}>
					<TextInput 
						style={emailVerify ?[style.input] : [style.input, style.inputRequired]}
						onChangeText={(email) => this.verifyEmail(email)}
						value={email}
						underlineColorAndroid='transparent'
						placeholder="Email"
						placeholderTextColor="#8F9093" 
						autoCapitalize = 'none'
					/>
				</View>
				<Button 
					title="RECUPERAR"
					color="#0071bb"
					loading={showLoading} onPress={() => this.olvidoContrasena()}>
					
				</Button>
				 
			</View>
		)
	}
	renderInsertarCodigo(){
		return(
			<View>
				<View style={style.regresarContenedor}>
					 
					<Text style={style.tituloRegresar}>Inserta el codigo que te hemos enviado</Text>
				</View>
				<View style={style.contenedorEmailRegistro}>
					<CodeInput
						ref="codeInputRef2"
						keyboardType="numeric"
						codeLength={4}
						className={'border-b'}
						compareWithCode={this.state.token}
						autoFocus={true}
						activeColor='#0071bb'
						inactiveColor='rgba(49, 180, 4, 1.3)'
						codeInputStyle={{ fontWeight: '800' }}
						onFulfill={(isValid, code) => this.onFinish(isValid, code)}
					/>
				</View>
			</View>
		)
	}
	async onFinish(isValid, token){
		const {tokenEnviado, email, recuperar} = this.state
		const {navigation} = this.props	
		console.log({isValid, token, recuperar})
		if(isValid){
			axios.post('user/verificaToken', {username:email, token})
			.then(e=>{
				if(recuperar){
					e.data.code==1 
					?navigation("recuperar", {email})
					:this.setState({showError:true})
				}else{
					e.data.code==1 
					?navigation("editarPerfil", {editar:false})
					:this.setState({showError:true})
				}
			})
			.catch(err=>{
				console.log(err)
			})
		}else{
			Toast.show('Opss!! codigo incorrecto', Toast.LONG);
		}
	}
	verifyEmail(email){
		let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		let emailVerify = re.test(String(email).toLowerCase());
		this.setState({email, emailVerify})
		console.log(emailVerify)
	}
 
	render(){
		const {showInsertarCodigo, recuperarContrasena}  = this.state
		return (
			<View style={style.contenedorLogin}>
				<KeyboardListener
					onWillShow={() => { this.setState({ keyboardOpen: true }); }}
					onWillHide={() => { this.setState({ keyboardOpen: false }); }}
				/>
				{
					recuperarContrasena
					?this.renderRecuperarContrasena()					
					:showInsertarCodigo
					?this.renderInsertarCodigo() 
					:<ScrollView style={{flex:1}} keyboardDismissMode="on-drag">{this.renderLogin()}</ScrollView>
				}
			</View>	 
	    )
	}
	
	olvidoContrasena(){
		const { email, password } = this.state;
		axios.post("user/recover/", { username:email })
		.then(e => {
			if(e.data.code==1){
				Toast.show('Hemos enviado un codigo a este email.', Toast.LONG);
			this.setState({tokenEnviado:true, showInsertarCodigo:true, recuperar:true, recuperarContrasena:false,  token:e.data.token.toString() })
			}else{
				this.setState({usuarioNoExiste:true})
				Toast.show('Este Usuario no existe.', Toast.LONG);
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}

}

const mapStatetoPros =(state) =>{
	return{
		carrito:state.carrito,
		loginFailure: state.usuario.loginFailure,
		loginSuccess: state.usuario.loginSuccess,
	}
}
const mapDispatch = dispatch => {
	return {
	  loginRequest: (email, password) => {
			dispatch(loginRequest(email, password));
	  }
	};
};
	   
export default connect(mapStatetoPros, mapDispatch)(Login) 
