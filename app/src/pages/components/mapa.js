import React, {Component} from 'react'
import {View, Text, Animated, TouchableOpacity, Dimensions,  Modal, Keyboard, TextInput} from 'react-native'
import {style} from './style'
import Icon 					   from 'react-native-fa-icons'  
import MapView, {  Marker, ProviderPropType } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import KeyboardListener from 'react-native-keyboard-listener';

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
			top:new Animated.Value(-130),
 			x: {
				latitude: 4.597825,
				longitude: -74.0755723,
				latitudeDelta: 0.046002887451081165,
				longitudeDelta: 0.05649235099555483,
		    },
		    x2: {
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
		const {ubicacionDefecto,  guardaUbicacion} = this.props
		
		navigator.geolocation.getCurrentPosition(e=>{
			// console.log(e)
			let lat = parseFloat(e.coords.latitude)
			let lng = parseFloat(e.coords.longitude)
			let latitude = ubicacionDefecto.infoplan ?ubicacionDefecto.lat 
						   :guardaUbicacion.lat ?guardaUbicacion.lat 
						   :lat ?lat :4.597825;
			let longitude = ubicacionDefecto.infoplan ?ubicacionDefecto.lng 
						   :guardaUbicacion.lng ?guardaUbicacion.lng 
						   :lng ?lng :-74.0755723;
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
			let latitude = ubicacionDefecto.infoplan ?ubicacionDefecto.lat 
						   :guardaUbicacion.lat ?guardaUbicacion.lat 
						   :lat ?lat :4.597825;
			let longitude = ubicacionDefecto.infoplan ?ubicacionDefecto.lng 
						   :guardaUbicacion.lng ?guardaUbicacion.lng 
						   :lng ?lng :-74.0755723;
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
	componentWillUnmount() {
		Keyboard.dismiss()
		clearInterval(this.state.interval);
	}
	setUbicacion(data, details){
		console.log({data, details})
		let latitude = details.geometry.location.lat;
		let longitude = details.geometry.location.lng;
		let direccion = data.description;
 		this.setState({buscador:true})
		this.setState({direccion, x:{latitude, longitude, latitudeDelta: 0.015, longitudeDelta: 0.0121}})
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
	render(){
		const {ubicacionDefecto, inputValor, planPublico, guardaUbicacion} = this.props
		const {valorInicial, km, latitudeDelta, direccion, mapaCargado, showKeyboard, buscador,x,x2}=this.state
		// let direccion = guardaUbicacion.direccion ?guardaUbicacion.direccion :this.state.direccion
 	  
		if (mapaCargado) {
			return(
				<View>
				<KeyboardListener
					onWillShow={() => { this.setState({ showKeyboard: true }); }}
					onWillHide={() => { this.setState({ showKeyboard: false }); }}
				/>
					<Modal
						animationType="slide"
						transparent={false}
						visible={this.state.modalVisible}
						onRequestClose={() => {
			            console.log('Modal has been closed.');
			        }}>
						<View style={style.autoComplete}>
							<GooglePlacesAutocomplete
								placeholder='Buscar'
								minLength={2} // minimum length of text to search
								autoFocus={true}
								returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
								listViewDisplayed='auto'    // true/false/undefined
								fetchDetails={true}
								renderDescription={row => row.description} // custom description render
								onPress={(data, details = null) => {this.setUbicacion(data,details)}}// 'details' is provided when fetchDetails = true
								getDefaultValue={() => ''}
								query={{
									key: 'AIzaSyCn_XO2J1yIl7I3UMy7hL6-0QmFJAOwIz8',
									language: 'es', // language of the results
									location: '4.597825,-74.0755723',
									components: 'country:co'
								}}
								styles={{
										textInputContainer: {
										width: width,
									},
										description: {
										fontWeight: 'bold',
									},
										predefinedPlacesDescription: {
										color: '#1faadb'
									},
								}}
								queryTypes='establishment'
								currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
								currentLocationLabel="Current location"
								nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
								GoogleReverseGeocodingQuery={{
								// available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
								}}
								GooglePlacesSearchQuery={{
									// available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
									rankby: 'distance',
									types: 'cafe'
								}}
								filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3', 'sublocality']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
								debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
							/>
						</View>		
						<TouchableOpacity style={style.btnIconVolver} onPress={()=>this.props.close()} >
							<Icon name="chevron-left" style={style.iconVolver} />
						</TouchableOpacity>
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
									customMapStyle={mapStyle}
									onRegionChange={(e)=>this.onRegionChange(e)}
									onPress={()=>this.setState({buscador:true})}
								> 
								<Marker
									coordinate={x}
								/>
								
								</MapView>
								:<MapView
									provider={this.props.provider}
									style={style.map}
									initialRegion={{
										latitude:ubicacionDefecto.infoplan ?ubicacionDefecto.lat :guardaUbicacion.lat ?guardaUbicacion.lat :x.latitude,
										longitude:ubicacionDefecto.infoplan ?ubicacionDefecto.lng :guardaUbicacion.lng ?guardaUbicacion.lng :x.longitude,
										latitudeDelta: this.state.x.latitudeDelta,
										longitudeDelta: this.state.x.longitudeDelta,
									}}
									onRegionChange={(e)=>this.onRegionChange(e)}
								> 
								<Marker
								coordinate={x}
							/>
								
								</MapView>
								}
								
							{
								<Animated.View style={[style.contenedorInputMapa, {top:this.state.top}]}>
									<TextInput
										style={[style.inputMapa]}
										onChangeText={(direccion) => this.setState({direccion}) }
										value={direccion}
										underlineColorAndroid='transparent'
										placeholder="Inserta el nombre lugar"
										placeholderTextColor='#8F9093' 
										autoCapitalize = 'none'
									/>	
								</Animated.View>
							}

							<View style={style.contenedorRes}>
								<TouchableOpacity 
									onPress={() => { direccion ?this.props.updateStateX(this.state.x.latitude, this.state.x.longitude, direccion) :this.showInput() } } 
									style={style.btnEnviar}>
									<Text style={[style.textEnviar, style.familia]}>Guardar</Text>
								</TouchableOpacity> 
							</View>
						</View>
				  </Modal>    
				</View>
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
MapaPlanComponent.propTypes = {
	provider: ProviderPropType,
};
export default  MapaPlanComponent