import React, {Component} from 'react'
import {View, Text, Animated, TouchableOpacity, Dimensions,  Image, ScrollView, ActivityIndicator, Platform, Keyboard} from 'react-native'
import {style}              from './style'
import Icon 				from 'react-native-fa-icons'
import moment 				from 'moment'
import { connect }          from "react-redux";
import { getCategorias }    from "../../redux/actions/categoriaActions.js";
import { createFilter }     from 'react-native-search-filter';
import axios                from 'axios';
import Lightbox 		    from 'react-native-lightbox';
import AutoHeightImage         from 'react-native-auto-height-image';
import Cabezera from '../components/cabezera'
import Footer   from '../components/footer'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { getEventosProximos } from "../../redux/actions/eventoActions.js";
import firebase from 'react-native-firebase';
const {width, height} = Dimensions.get('window')
 
moment.locale('es');
const Analytics = firebase.analytics();

const KEYS_TO_FILTERS = ['descripcion', 'nombre', 'categoria._id']
class eventosComponent extends Component{
	constructor(props){
		super(props);
		this.state={
            terminoBuscador:"",
            inicio:0,
			final:3,
			eventos:[],
			terminoBuscador:""
		}
	}

	async componentWillMount(){
		Analytics.setCurrentScreen("Eventos", "Eventos");
		this.props.getCategorias();
		console.log(this.props.navigation.state.params)
		const {tipo} = this.props.navigation.state.params
		if(tipo=="cercanos"){
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
					(error) => this.getPlans(undefined, undefined),
					{enableHighAccuracy: true, timeout:5000, maximumAge:0})
				)
			}
		}else if(tipo=="proximos"){
			this.props.getEventosProximos();
		}else{
			this.props.getEventosProximos();
			this.setState({terminoBuscador:this.props.navigation.state.params.id})
		}
		
	}
	getEventos(lat, lng){
		axios.get(`eve/evento/cercanos/${lat}/${lng}`)
		.then(res=>{
			res.data.status 
				?this.setState({filteredData: res.data.eventos, eventos:res.data.evento, cargado:true})  
				:Toast.show('Houston tenemos un problema, reinicia la app')
		})
		.catch(err=>{
			console.log(err)
		})
    }
  
    onScroll(e) {
		const {final} =  this.state
		let paddingToBottom = 10;
        paddingToBottom += e.nativeEvent.layoutMeasurement.height;
        if(e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
            this.setState({final:final+5, showSpin:true})
            this.myInterval = setInterval(()=>this.setState({showSpin:false}), 1000)
        }
	}
    capitalize=(s)=>{
        return s[0].toUpperCase() + s.slice(1);
	}
	renderCategoriasFiltros(){
		const {terminoBuscador} = this.state
		return this.props.categorias.map((e, key)=>{
			return (
				<TouchableOpacity style={[style.contenedorCategoriaFiltro, {backgroundColor: terminoBuscador==e._id &&"#00338A" }]} key={key} 
					// onPress={()=>{this.props.navigation.navigate('eventos', {tipo:"buscador", id:e._id}); this.setState({focus:false}); Keyboard.dismiss() }}>
					onPress={()=>{ this.setState({focus:false, terminoBuscador:e._id=="undefined" ?"" :e._id, actualiza:true}); Keyboard.dismiss() }}>
					<Text style={[style.textoCategoriaFiltro, {color: terminoBuscador==e._id &&"#fff" }]}>{e.nombre}</Text>
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
    renderEventos(){
		const {terminoBuscador, eventos, inicio, final, actualiza} = this.state
		const {tipo} = this.props.navigation.state.params
		let data =  tipo=="cercanos" ?eventos :tipo=="proximos" ?this.props.eventosProximos  :this.props.eventosProximos.filter(createFilter(terminoBuscador, KEYS_TO_FILTERS))
		data = actualiza ?this.props.eventosProximos.filter(createFilter(terminoBuscador, KEYS_TO_FILTERS)) :data
		console.log({data, terminoBuscador, tipo})
		let newFiltro = data.slice(inicio, final)
        return newFiltro.map((e, key)=>{
            let imagen = e.imagen[0].split("-")
			imagen = `${imagen[0]}Miniatura${imagen[2]}`
            return(
                <TouchableOpacity style={style.contenedorEvento} key={key} onPress={()=>this.props.navigation.navigate('eventoMapa', {tipo:"evento", id:e._id})}>
                    <View style={style.subContenedorEvento}>
                        <Lightbox 
                            renderContent={() => (
                                <AutoHeightImage
                                    width={width}
                                    source={{uri: imagen}}
                                    
                                />
                            )}
                        >
                            <Image
                                width={width-30}
                                source={{uri: imagen}}
                                style={style.imagen}
                            /> 
                        </Lightbox>	
                        <Text style={style.texto1}>{this.capitalize(e.nombre)}</Text>
                        <Text style={style.texto1}>{e.categoria.nombre}</Text>
                        <Text style={style.texto2}>{moment(e.fechaInicio).format("YYYY-MM-DD hh:mm a")}</Text>
                        
                    </View>
                </TouchableOpacity>
            )
        })
    }
	render(){
		const {navigation} = this.props
		const {focus, terminoBuscador} = this.state
        return(
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
                <ScrollView onScroll={(e)=>this.onScroll(e)} style={{marginBottom:60}} >
                    {this.renderEventos()}
                    {this.state.showSpin &&<ActivityIndicator color="#0071bb" style={style.preload}/> }
                </ScrollView>
                <Footer navigation={navigation} />
            </View>
        )
	}
}
const mapState = state => {
    let categorias =  state.categoria.categorias
    categorias = categorias.concat([{nombre:"Todos", _id:"undefined"}])

    return {
		eventos: state.evento.eventos,
		eventosProximos: state.evento.eventosProximos,
        categorias
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

 
 
export default connect(
	mapState,
	mapDispatch
  )(eventosComponent);