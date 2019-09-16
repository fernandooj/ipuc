import React, {Component} from 'react'
import {View, Text, ScrollView, Image, Platform, ImageBackground, TouchableOpacity} from 'react-native'
import PropTypes from "prop-types";
import Icon 				from 'react-native-fa-icons'
import FCM, { NotificationActionType } from "react-native-fcm";
import Cabezera from '../components/cabezera'
import Footer   from '../components/footer'
import axios    from 'axios'
import moment    from 'moment'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { getCategorias } from "../../redux/actions/categoriaActions.js";
import { getEventosProximos } from "../../redux/actions/eventoActions.js";
import { registerKilledListener, registerAppListener } from "../push/Listeners";
import { connect } from "react-redux";
import Toast from 'react-native-simple-toast';
import { createFilter } from 'react-native-search-filter';
import {style} from './style'

registerKilledListener();
const KEYS_TO_FILTERS = ['descripcion', 'nombre']
class Home extends Component{
	constructor(props) {
	  	super(props);
		this.state={
			filteredData:[],
			inicio:0,
			final:3,
			inicioProximos:0,
			finalProximos:3,
			terminoBuscador:""
		}
	}
	 
	async componentWillMount(){
		this.props.getCategorias();
		this.props.getEventosProximos();
		//////////////////////////////////////////////////////////////////////////////////////////////////  		ACCESO GEOLOCALIZACION
		if (Platform.OS==='android') {
			RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
		   .then(data => {
			   	console.log({data})
		    	navigator.geolocation.getCurrentPosition(e=>{
				let lat =parseFloat(e.coords.latitude)
				let lng = parseFloat(e.coords.longitude)
				this.setState({lat, lng})
				this.getEventos(lat, lng)
				console.log("{data}")
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
		FCM.getFCMToken().then(token => {
			console.log("TOKEN (getFCMToken)", token);
			this.setState({ token: token || "" });
			axios.post("tok/tokenPhone", {tokenPhone:token, lat, lng})
			.then(res=>{
				  console.log(res.data)
			})
		});

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

	async componentDidMount() {
		//FCM.createNotificationChannel is mandatory for Android targeting >=8. Otherwise you won't see any notification
		FCM.createNotificationChannel({
		  id: 'default',
		  name: 'Default',
		  description: 'used for example',
		  priority: 'high'
		})
		registerAppListener(this.props.navigation);
		FCM.getInitialNotification().then(notif => {
		  this.setState({
			initNotif: notif
		  });
			console.log(notif)
		  if (notif && notif.targetScreen === "Home") {
			setTimeout(() => {
			  this.props.navigation.navigate("Detail");
			}, 500);
		  }
		});
	
		try {
		  let result = await FCM.requestPermissions({
			badge: false,
			sound: true,
			alert: true
		  });
		} catch (e) {
		  console.error(e);
		}
	
	
	
		if (Platform.OS === "ios") {
		  FCM.getAPNSToken().then(token => {
			console.log("APNS TOKEN (getFCMToken)", token);
		  });
		}
	}
	
	componentWillUnmount() {
		 
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
 
	renderCategoriasFiltros(){
		return this.props.categorias.map((e, key)=>{
			return (
				<TouchableOpacity style={style.contenedorCategoriaFiltro} key={key} onPress={()=>this.props.navigation.navigate('eventos', {tipo:"buscador", id:e._id})}>
					<Text style={style.textoCategoriaFiltro}>{e.nombre}</Text>
				</TouchableOpacity>
			)
		})
	}
	renderEventosFiltros(){
		const {terminoBuscador, filteredData} = this.state
		let eventos = this.props.eventosProximos.filter(createFilter(terminoBuscador, KEYS_TO_FILTERS))
		return eventos.map((e, key)=>{
			return (
				<TouchableOpacity style={style.contenedorEventoFiltro} key={key} onPress={()=>this.props.navigation.navigate('eventoMapa', {tipo:"evento", id:e._id})}>
					<Icon name={'compass'} allowFontScaling style={style.iconEvento} />
					<Text style={style.textoEventoFiltro}>{e.nombre}</Text>
				</TouchableOpacity>
			)
		})
	}
	renderCercanos(){
		const {inicio, final, filteredData} = this.state
		let data =  filteredData
		return data.slice(inicio, final).map((e, key)=>{
			let imagen = e.imagen[0].split("-")
			imagen = `${imagen[0]}Miniatura${imagen[2]}`
			return (
				<TouchableOpacity key={key} style={style.contenedorEventos} onPress={()=>this.props.navigation.navigate('eventoMapa', {tipo:"evento", id:e._id})}>
					<Image source={{uri: imagen}} style={style.imagenEventos}  />
					<Text  style={style.textoEventos}>{e.nombre ?`${e.nombre.slice(0,24)}${e.nombre.length>25 ?"..." :""}` :""}</Text>
				</TouchableOpacity>
			)
		})
	}
	renderProximos(){
		const {inicioProximos, finalProximos} = this.state
		let data = this.props.eventosProximos
		return data.slice(inicioProximos, finalProximos).map((e, key)=>{
			let imagen = e.imagen[0].split("-")
			imagen = `${imagen[0]}Miniatura${imagen[2]}`
			return (
				<TouchableOpacity key={key} style={[style.contenedorEventos, {height:190}]} onPress={()=>this.props.navigation.navigate('eventoMapa', {tipo:"evento", id:e._id})}>
					<Image source={{uri: imagen}} style={style.imagenEventos}  />
					<Text style={style.textoEventos}>{e.nombre ?`${e.nombre.slice(0,24)}${e.nombre.length>25 ?"..." :""}` :""}</Text>
					<Text style={style.textoEventos}>{moment(e.fechaInicio).format("YYYY-MM-DD h:mm")}</Text>
				</TouchableOpacity>
			)
		})
	}
	async onScrollCercanos(e) {
		let {final, libros} =  this.state
		let paddingLeft = 10;
		paddingLeft += e.nativeEvent.layoutMeasurement.width;
		if(e.nativeEvent.contentOffset.x >= e.nativeEvent.contentSize.width - paddingLeft) {
			final<40 &&this.setState({final:final+5})
		}
	}
	async onScrollProximos(e) {
		let {finalProximos} =  this.state
		let paddingLeft = 10;
		paddingLeft += e.nativeEvent.layoutMeasurement.width;
		if(e.nativeEvent.contentOffset.x >= e.nativeEvent.contentSize.width - paddingLeft) {
			finalProximos<40 &&this.setState({finalProximos:finalProximos+5})
		}
	}
	render(){
		const {navigation} = this.props
		const {focus, terminoBuscador} = this.state
		return (
			<View style={style.container}>
				<Cabezera 
					navigation={navigation} 
					focus={(focus)=>{this.setState({focus}) }} 
					texto={(terminoBuscador)=>this.setState({terminoBuscador})}
				/>
				{
					focus
					?<View style={style.fondo}>
						<View style={style.contenedorFiltros}  >
							{this.renderCategoriasFiltros()}
						</View>
						<View style={style.separador}></View>
						{
							terminoBuscador.length>1
							&&<ScrollView style={style.contenedorFiltrosEventos}>
								{this.renderEventosFiltros()}
							</ScrollView>
						}
						
					</View>
					:null
				}
				<ScrollView style={style.subContainerMenu}>
					<Text style={style.titulo}>Explora ipuc</Text>
					<ScrollView horizontal={true}>
						{this.renderCategorias()}
					</ScrollView>
				 	<TouchableOpacity style={{flexDirection:"row"}} onPress={()=>navigation.navigate("eventos", {tipo:"cercanos"})}>
						<Text style={style.titulo2}>Cercanos a ti</Text>
						<Text style={style.titulo3}>Todos ></Text>
					 </TouchableOpacity>
					<ScrollView horizontal={true} onScroll={(e)=>this.onScrollCercanos(e)}>
						{this.renderCercanos()}
					</ScrollView>
				 
					<TouchableOpacity style={{flexDirection:"row",marginTop:30}} onPress={()=>navigation.navigate("eventos", {tipo:"proximos"})}>
						<Text style={style.titulo2}>Proximos</Text>
						<Text style={style.titulo3}>Todos ></Text>
					 </TouchableOpacity>

					<ScrollView horizontal={true} onScroll={(e)=>this.onScrollProximos(e)}>
						{this.renderProximos()}
					</ScrollView>
				</ScrollView>
				<Footer navigation={navigation} />
			</View>
		)
	}
}

const mapState = state => {
	console.log(state)
	return {
		categorias: state.categoria.categorias,
		eventosProximos: state.evento.eventosProximos
	};
};
  
const mapDispatch = dispatch => {
	return {
	  	getCategorias: () => {
			dispatch(getCategorias());
	  	},
	  	getEventosProximos: () => {
			dispatch(getEventosProximos());
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
  