import React, {Component} from 'react'
import {View, Text, ScrollView, Image, Platform, ImageBackground, TouchableOpacity} from 'react-native'
import PropTypes from "prop-types";
import firebase from 'react-native-firebase';
import Cabezera from '../components/cabezera'
import Footer   from '../components/footer'
import axios    from 'axios'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { getCategorias } from "../../redux/actions/categoriaActions.js";
import { connect } from "react-redux";
import Toast from 'react-native-simple-toast';
 
import {style} from './style'
 

 
class Home extends Component{
	constructor(props) {
	  super(props);
	  this.state={
			filteredData:[]
	  }
	}
	 
	async componentWillMount(){
		this.props.getCategorias();
		/////////////////////////////////////////////////////////////////////
		////////////////////		OBTENGO EL TOKEN DEL CELULAR Y LO GUARDO EN EL SERVIDOR
		/////////////////////////////////////////////////////////////////////
		// const fcmToken = await firebase.messaging().getToken();
		// if (fcmToken) {
		// 	console.log(fcmToken)
		// 	/////////////////////////////////////////////////////////////////////
		// 	////////////////////		OBTENGO EL VALOR DEL CODIGO DEL USUARIO
		// 	/////////////////////////////////////////////////////////////////////
		// 	const result = await AsyncStorage.getItem('codeUser');
		// 	if (result) {
		// 		axios.get(`users/${result}`)
		// 		.then(res=>{
		// 			axios.patch(`users/${result}`, {email:res.data.email, tokenPhone:fcmToken})
		// 			.then(e=>{
		// 				console.log("fcmToken")
		// 			})
		// 		})
		// 	}
		// } else {
		// 	alert("tu dispositivo no tiene token, por favor actualizalo")
		// }
		// const enabled = await firebase.messaging().hasPermission();
		// if (enabled) {
		// 	// user has permissions
		// } else {
		// 	// user doesn't have permission
		// }
		//////////////////////////////////////////////////////////////////////////////////////////////////  		ACCESO GEOLOCALIZACION
		if (Platform.OS==='android') {
			RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
		   .then(data => {
		    	navigator.geolocation.getCurrentPosition(e=>{
				let lat =parseFloat(e.coords.latitude)
				let lng = parseFloat(e.coords.longitude)
				this.setState({lat, lng})
				this.getEventos(lat, lng)
			}, 
				(error)=>this.watchID = navigator.geolocation.watchPosition(e=>{
				let lat =parseFloat(e.coords.latitude)
				let lng = parseFloat(e.coords.longitude)
				this.setState({lat, lng})
				this.getEventos(lat, lng)
			},
				(error) => this.getEventos(undefined, undefined),
				{enableHighAccuracy: true, timeout:5000, maximumAge:0})
	      	)
		  	}).catch(err => {
			  	axios.get(`eve/evento/cercanos/${undefined}/${undefined}`)
					.then(e=>{
						if (e.data.code===1) {
							this.setState({filteredData: e.data.planes, cargado:true})
						}
					})
		  	});
		  }else{
		  	navigator.geolocation.getCurrentPosition(e=>{
				let lat =parseFloat(e.coords.latitude)
				let lng = parseFloat(e.coords.longitude)
				this.setState({lat, lng})
				this.getEventos(lat, lng)
			}, 
				(error)=>this.watchID = navigator.geolocation.watchPosition(e=>{
				let lat =parseFloat(e.coords.latitude)
				let lng = parseFloat(e.coords.longitude)
				this.setState({lat, lng})
				this.getEventos(lat, lng)
			},
				(error) => this.getEventos(undefined, undefined),
				{enableHighAccuracy: true, timeout:5000, maximumAge:0})
	      	)
		}
	}
	getEventos(lat, lng){
		axios.get(`eve/evento/cercanos/${lat}/${lng}`)
		.then(res=>{
			console.log(res.data)
			res.data.status 
				?this.setState({filteredData: res.data.evento, cargado:true})  
				:Toast.show('Houston tenemos un problema, reinicia la app')
		})
		.catch(err=>{
			console.log(err)
		})
	}

	componentDidMount() {
		this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
			console.log("eee")
		});
	}
	
	componentWillUnmount() {
		this.messageListener();
	}
	renderCategorias(){
		return this.props.categorias.map((e, key)=>{
			let imagen = e.imagen.split("-")
			imagen = `${imagen[0]}Miniatura${imagen[2]}`
			return (
				<ImageBackground key={key} style={style.contenedorCategoria} source={{uri: imagen}} imageStyle={{ borderRadius: 10 }}>
					<TouchableOpacity style={style.subContenedorCategoria} onPress={()=>this.props.navigation.navigate('eventoMapa', {tipo:"categoria", id:e._id})}>
						<Text  style={style.textoCategoria}>{e.nombre}</Text>
						<View style={style.explorarCategoria}>
							<Text style={style.textExplorarCategoria}>Explorar</Text>
						</View>
					</TouchableOpacity>
				</ImageBackground>
			)
		})
	}
	renderCercanos(){
		return this.state.filteredData.map((e, key)=>{
			let imagen = e.imagen[0].split("-")
			imagen = `${imagen[0]}Miniatura${imagen[2]}`
			return (
				<TouchableOpacity key={key} style={style.contenedorEventos} onPress={()=>this.props.navigation.navigate('eventoMapa', {tipo:"evento", id:e._id})}>
					<Image source={{uri: imagen}} style={style.imagenEventos}  />
					<Text  style={style.textoEventos}>{e.nombre}</Text>
				</TouchableOpacity>
			)
		})
	}
	render(){
		const {navigation} = this.props
		return (
			<View style={style.container}>
				<Cabezera navigation={navigation} />
				<ScrollView style={style.subContainerMenu}>
					<Text style={style.titulo}>Explora ipuc</Text>
					<ScrollView  horizontal={true}>
						{this.renderCategorias()}
					</ScrollView>
				 
					<Text style={style.titulo2}>Cercanos a ti</Text>
					<ScrollView  horizontal={true}>
						{this.renderCercanos()}
					</ScrollView>
				 
					<Text style={style.titulo2}>Proximos</Text>
					<ScrollView  horizontal={true}>
						{this.renderCercanos()}
					</ScrollView>
				</ScrollView>
				<Footer navigation={navigation} />
			</View>
		)
	}
}

const mapState = state => {
	return {
		categorias: state.categoria.categorias,
	};
};
  
const mapDispatch = dispatch => {
	return {
	  getCategorias: () => {
			dispatch(getCategorias());
	  },
	};
};
  
Home.defaultProps = {
	categorias:[],
};

Home.propTypes = {
	categorias: PropTypes.array.isRequired
};

export default connect(
mapState,
mapDispatch
)(Home);
  