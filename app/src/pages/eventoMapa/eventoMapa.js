import React, {Component} from 'react'
import {View, Text, Animated, TouchableOpacity, Dimensions,  Image, ScrollView, TextInput} from 'react-native'
import {style} from './style'
import Icon 					   from 'react-native-fa-icons'  
import moment 					   from 'moment'  
import { connect }                 from "react-redux";
import MapView, {  Marker, ProviderPropType } from 'react-native-maps';
import { getEventosCategoria } from "../../redux/actions/eventoActions.js";
import { getCategorias } from "../../redux/actions/categoriaActions.js";
import * as Animatable from 'react-native-animatable';

const {width, height} = Dimensions.get('window')
const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]
const ASPECT_RATIO = width / height
const LATITUD_DELTA = 0.092
 
class MapaPlanComponent extends Component{
	constructor(props){
		super(props);
		this.state={
			top:new Animated.Value(-100),
 			x: {
				latitude: 4.597825,
				longitude: -74.0755723,
				latitudeDelta: 0.046002887451081165,
				longitudeDelta: 0.05649235099555483,
		    },
		    
		    buscador:false,
		    marker: {
					latitude: 4.597825,
					longitude: -74.0755723,
		    },
	 
		    latitudeDelta: 0.015,
			longitudeDelta: 0.0121,
		    modalVisible:true,
		    mapaCargado:false,
		    showKeyboard:false,
		}
	}

	async componentWillMount(){	
        // console.log(this.props.navigation.state.params.id)
        // const id =this.props.navigation.state.params.id
        const id = "5d3cc53173fa792d281ec543"
        this.props.getEventosCategoria(id)
		this.props.getCategorias();
		navigator.geolocation.getCurrentPosition(e=>{
			// console.log(e)
			let lat = parseFloat(e.coords.latitude)
			let lng = parseFloat(e.coords.longitude)
			let latitude =  lat ?lat :4.597825;
			let longitude = lng ?lng :-74.0755723;
			let x = {
				latitude:latitude,
				longitude:longitude,
				latitudeDelta:0.013850498819819812,
				longitudeDelta:0.01412317156791687
			}
			this.setState({x, mapaCargado:true})
 
		}, (error)=>this.watchID = navigator.geolocation.watchPosition(e=>{
			let lat =parseFloat(e.coords.latitude)
			let lng = parseFloat(e.coords.longitude)
			let latitude =  lat ?lat :4.597825;
			let longitude =  lng ?lng :-74.0755723;
			let x = {
				latitude:latitude,
				longitude:longitude,
				latitudeDelta:0.013850498819819812,
				longitudeDelta:0.01412317156791687
			}
			this.setState({x, mapaCargado:true})
 
		},
		(error) => console.log('error'),
		{enableHighAccuracy: true, timeout:5000, maximumAge:0})
      )
	}
 
 
	currentUbication(){
		navigator.geolocation.getCurrentPosition(e=>{
			let lat = parseFloat(e.coords.latitude)
			let lng = parseFloat(e.coords.longitude)
			let x = {
				latitude:lat,
				longitude:lng,
				latitudeDelta:0.013850498819819812,
				longitudeDelta:0.01412317156791687
			}
			this.setState({x, mapaCargado:true, buscador:true})
 
		}, (error)=>this.watchID = navigator.geolocation.watchPosition(e=>{
			let lat =parseFloat(e.coords.latitude)
			let lng = parseFloat(e.coords.longitude)
			let x = {
				latitude:lat,
				longitude:lng,
				latitudeDelta:0.013850498819819812,
				longitudeDelta:0.01412317156791687
			}
			this.setState({x, mapaCargado:true,buscador:true})
		},
		(error) => console.log('error'),
		{enableHighAccuracy: true, timeout:5000, maximumAge:0})
      )
    }
    renderMarkers(){
        let fechaActual = moment().format('YYYY/MM/DD h:mm:ss a')
	    fechaActual = moment().format('YYYY/MM/DD h:mm')
        return this.props.eventos.map((e, key)=>{
            let fechaI = moment(e.fechaInicio).format("YYYY/MM/DD h:mm")
            var a = moment(fechaActual,'YYYY/MM/DD h:mm');
            var b = moment(fechaI,'YYYY/MM/DD h:mm');
            var diff = b.diff(a, 'days');
            return(
                <Marker 
                    key={key}
                    coordinate={{latitude:e.loc.coordinates[1], longitude:e.loc.coordinates[0]}}
                >
                    <TouchableOpacity onPress={()=>alert(e.nombre)}>
                        <Image source={diff<3 ?require("../../assets/img/pin_red.png") :diff<7 ?require("../../assets/img/pin_yellow.png") :require("../../assets/img/pin_blue.png") } style={style.iconoImagen} />
                        <Text>{diff}</Text>
                    </TouchableOpacity>
                </Marker>
            )
        })
    }
    renderCategorias(){
        return this.props.categorias.map(e=>{
            return(
                <TouchableOpacity onPress={()=>{this.animacion();this.props.getEventosCategoria(e._id)}} style={style.cajaCategoria} >
                    <Icon name={'map-marker'} style={style.icon} />
                    <Text style={style.textCategoria} >{e.nombre}</Text>
                </TouchableOpacity>
            )
        })
    }
    renderEventos(){
        return this.props.eventos.map(e=>{
            return(
                <View>
                    <Text>{e.nombre}</Text>       
                    <Text>{e.descripcion}</Text>       
                </View>
            )
        })
    }
    renderEvento(){

    }
    handleViewRef = ref => this.view = ref;
    animacion = () => this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
    renderMapa(){
        const {valorInicial, km, latitudeDelta, direccion, mapaCargado, showKeyboard, buscador,x,x2}=this.state
        return(
            <View style ={style.containerMap}>
            {
                buscador
                ?<MapView
                    provider={this.props.provider}
                    style={style.map}
                    region={{
                        latitude:  x.latitude,
                        longitude: x.longitude,
                        latitudeDelta: x.latitudeDelta,
                        longitudeDelta: x.longitudeDelta,
                    }}
                    minZoomLevel={20}
                    customMapStyle={mapStyle}
                    onRegionChange={(e)=>this.onRegionChange(e)}
                    onPress={()=>this.setState({buscador:true})}
                > 
                 {this.renderMarkers()}
                </MapView>
                :<MapView
                    provider={this.props.provider}
                    style={style.map}
                    initialRegion={{
                        latitude: x.latitude,
                        longitude: x.longitude,
                        latitudeDelta: .2,
                        longitudeDelta: .2,
                    }}
                     
                    onRegionChange={(e)=>this.onRegionChange(e)}
                > 
                {this.renderMarkers()}
                </MapView>
                }
                <ScrollView style={style.contenedorCategorias} horizontal>
                    {this.renderCategorias()}
                </ScrollView>
                <Animatable.View ref={this.handleViewRef} style={style.contenedorEventos}>
                    <ScrollView >
                        <Icon name={'minus'} style={style.iconContenedorEvento} />
                        {this.renderEventos()}
                    </ScrollView>   
                </Animatable.View>

                 
            </View> 
        )
    }
	render(){
		const {mapaCargado}=this.state
		if (mapaCargado) {
			return(
				 this.renderMapa()
			)
		}else{
			return(<Text></Text>)
		}	
	}
	onRegionChange(x) {
		this.setState({x});
	}
	showInput(){
		Animated.timing(this.state.top,{
			toValue:100,
			duration:400,
		}).start()
	}
 
	
}
const mapState = state => {
    console.log(state.evento.eventoCategoria)
	return {
        eventos: state.evento.eventoCategoria,
        categorias: state.categoria.categorias,
	};
};
  
const mapDispatch = dispatch => {
	return {
        getEventosCategoria: (idCategoria) => {
			dispatch(getEventosCategoria(idCategoria));
        },
        getCategorias: () => {
			dispatch(getCategorias());
	  },
	};
};

MapaPlanComponent.propTypes = {
	provider: ProviderPropType,
};
export default connect(
	mapState,
	mapDispatch
  )(MapaPlanComponent);