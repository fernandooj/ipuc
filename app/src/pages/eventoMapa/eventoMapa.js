import React, {Component} from 'react'
import {View, Text, Animated, TouchableOpacity, Dimensions,  Image, ScrollView, TextInput} from 'react-native'
import {style} from './style'
import Icon 					   from 'react-native-fa-icons'
import moment 					   from 'moment'
import { connect }                 from "react-redux";
import MapView, {  Marker, Circle, ProviderPropType } from 'react-native-maps';
import { getEventosCategoria, getEvento } from "../../redux/actions/eventoActions.js";
import { getCategorias }       from "../../redux/actions/categoriaActions.js";
import { createFilter }        from 'react-native-search-filter';
import AutoHeightImage         from 'react-native-auto-height-image';
import Slideshow               from 'react-native-image-slider-show';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable         from 'react-native-animatable';
import axios from 'axios';
let fechaActual = moment().format('YYYY/MM/DD h:mm:ss a')
fechaActual = moment().format('YYYY/MM/DD h:mm')
const {width, height} = Dimensions.get('window')
const KEYS_TO_FILTERS = ["nombre", "lugar"]

moment.locale('es');

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
		    mapaCargado:false,
        terminoBuscador:"",
        eventoGuardado:[],
        evento:{imagen:[], nombre:"", lugar:"", descripcion:"", fechaInicio:"", fechaFinal:"", meGusta:[]}
		}
	}

	async componentWillMount(){
    console.log(this.props.navigation.state)
    const idCategoria =this.props.navigation.state.params ?this.props.navigation.state.params.id   :"undefined"
    const idEvento    =this.props.navigation.state.params ?this.props.navigation.state.params.id   :"undefined"
    const tipo        =this.props.navigation.state.params ?this.props.navigation.state.params.tipo :"undefined"
    const idUsuario = await AsyncStorage.getItem('idUsuario')
    if(idUsuario){
      axios.get("user/perfil")
      .then(e=>{
        console.log(e.data)
        this.setState({idUsuario, eventoGuardado:e.data.user.Eventos})  
      })
    }
     
		this.props.getCategorias();
		navigator.geolocation.getCurrentPosition(e=>{

			let lat = parseFloat(e.coords.latitude)
			let lng = parseFloat(e.coords.longitude)
			let latitude =  lat ?lat :4.597825;
			let longitude = lng ?lng :-74.0755723;
			let x = {
				latitude:latitude,
				longitude:longitude,
				latitudeDelta:0.15,
				longitudeDelta:0.15
      }

      this.setState({x, x2:x, mapaCargado:true, idCategoria})
      tipo=="categoria" ?this.props.getEventosCategoria(idCategoria, x) :this.props.getEvento(idEvento)
      
		}, (error)=>this.watchID = navigator.geolocation.watchPosition(e=>{
			let lat =parseFloat(e.coords.latitude)
			let lng = parseFloat(e.coords.longitude)
			let latitude =  lat ?lat :4.597825;
			let longitude =  lng ?lng :-74.0755723;
			let x = {
				latitude:latitude,
				longitude:longitude,
				latitudeDelta:0.15,
				longitudeDelta:0.15
			}
      this.setState({x, x2:x, mapaCargado:true, idCategoria})
      this.props.getEventosCategoria(idCategoria, x)
		},
		(error) => console.log('error'),
		{enableHighAccuracy: true, timeout:5000, maximumAge:0})
    )
	}


  renderMarkers(){
    return this.props.eventos.map((e, key)=>{
      let fechaI = moment(e.fechaInicio).format("YYYY/MM/DD h:mm")
      let a = moment(fechaActual,'YYYY/MM/DD h:mm');
      let b = moment(fechaI,'YYYY/MM/DD h:mm');
      let diff = b.diff(a, 'days');
        return(
          <Marker
            key={key}
            coordinate={{latitude:e.loc.coordinates[1], longitude:e.loc.coordinates[0]}}
          >
            <TouchableOpacity onPress={()=>this.props.getEvento( e._id)}>
                <Image source={diff<3 ?require("../../assets/img/pin_red.png") :diff<7 ?require("../../assets/img/pin_yellow.png") :require("../../assets/img/pin_blue.png") } style={style.iconoImagen} />
            </TouchableOpacity>
          </Marker>
        )
      })
    }
  renderCategorias(){
    const {x, idCategoria} = this.state
      return this.props.categorias.map((e, key)=>{
          return(
            <TouchableOpacity key={key} onPress={()=>{this.setState({idCategoria:e._id}); this.props.getEventosCategoria(e._id, x)}} style={idCategoria==e._id ?style.cajaCategoriaSeleccionada :style.cajaCategoria} >
                <Icon name={'map-marker'} style={idCategoria==e._id ?{color:"#FFFFFF"} :{color:"#33A2FF"}} />
                <Text style={[style.textCategoria, idCategoria==e._id &&{color:"#fff"}]} >{e.nombre}</Text>
            </TouchableOpacity>
        )
    })
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////   MUESTRA EL LISTADO DE EVENTOS,
  //----------------------   DIFF => devuelve la diferencia de dias desde hoy, hasta el dia del comienzo
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderEventos(){
    const { terminoBuscador} = this.state
    const {eventos} = this.props
    let nuevoEventos = eventos.filter(createFilter(terminoBuscador, KEYS_TO_FILTERS))
    return nuevoEventos.map((e, key)=>{
      let fechaI = moment(e.fechaInicio).format("YYYY/MM/DD h:mm")
      let a = moment(fechaActual,'YYYY/MM/DD h:mm');
      let b = moment(fechaI,'YYYY/MM/DD h:mm');
      let diff = b.diff(a, 'days');
      let data = parseInt(e.distancia/1000);
      data = data.toString()
      return(
        <TouchableOpacity style={style.subContenedorEventos} key={key} onPress={()=>this.props.getEvento(e._id)} >
            <View style={style.contentIconEvento}>
              <Icon name={'map-marker'} style={[style.iconEvento, {color:diff<3 ?"#bd0909" :diff<7 ?"#ecb338" :"#00338a" }]} />
            </View>
            <View style={style.contentTituloEvento}>
              <Text style={style.text1Evento}>{e.nombre.slice(0,60)}</Text>
              <Text style={style.text2Evento}>{e.lugar}</Text>
              <Text style={style.text3Evento}>Es {diff ==1 ?"hoy" :`en ${diff} dias`  }</Text>
            </View>
            <View style={style.contentDistanciaEvento}>
              <Text style={style.text3Evento}>{parseInt(e.distancia)<1000 ?`${parseInt(e.distancia)} Metros` :`${data} Kilometros`}</Text>
            </View>
        </TouchableOpacity>
      )
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////   MUESTRA SOLO UN EVENTO CON TODOS SUS DETALLES,
  //----------------------   DIFF => devuelve la diferencia de dias desde hoy, hasta el dia del comienzo
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderEvento(){
    let {imagen, nombre, fechaInicio, descripcion, lugar, fechaFinal, meGusta, _id} = this.state.evento
    const {idUsuario, eventoGuardado} = this.state
    let esSeguidor     =  meGusta.includes(idUsuario) 
    let existeEvento   =  eventoGuardado.includes(_id)
	  console.log({idUsuario, eventoGuardado, esSeguidor})
    let img = []
    imagen.map(e=>{
      let img2 = e.split("-")
      img2 = `${img2[0]}Resize${img2[2]}`
      img.push({url: img2})
    })
    return(
      <View style={style.subContenedorEvento}>
        <TouchableOpacity style={style.btnRegresar} onPress={()=>this.animacionHideEvento()} >
          <Icon name={"arrow-up"} style={style.iconRegresar} />
        </TouchableOpacity>
        <Slideshow  dataSource={img} height={180} />
        <View style={style.conTextoEvento}>
          <Icon name={"circle"} style={[style.iconCircle, {color:"#FFDD33"}]} />
          <Text style={style.textoEvento1}>{nombre}</Text>
        </View>
        <View style={style.conTextoEvento}>
          <Icon name={"circle"} style={[style.iconCircle, {color:"#33FF61"}]} />
          <Text style={style.textoEvento2}>{moment(fechaInicio).locale("es").format("YYYY-MMM-DD HH-MM a")}</Text>
        </View>
        <View style={style.conTextoEvento}>
          <Icon name={"circle"} style={[style.iconCircle, {color:"#FF33DA"}]} />
          <Text style={style.textoEvento2}>{moment(fechaFinal).format("YYYY-MMM-DD HH-MM a")}</Text>
        </View>
        <View style={style.conTextoEvento}>
          <Icon name={"circle"} style={[style.iconCircle, {color:"#3352FF"}]} />
          <Text style={style.textoEvento2}>{lugar}</Text>
        </View>
        <Text style={style.separador}></Text>
        <Text style={style.textoEvento3}>{descripcion}</Text>
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity style={style.btnEventoPreguntar} >
            <Text style={style.textPreguntar}>Enviar Mensaje</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.btnEvento} onPress={()=>!idUsuario ?this.props.navigation.navigate("Perfil") :existeEvento ?this.eliminarEvento(_id) :this.guardarEvento(_id)}>
            <Icon name={existeEvento ?"bookmark" :"bookmark-o"} style={existeEvento ?style.iconEventoActivo :style.iconEvento} />
          </TouchableOpacity>
         
          <TouchableOpacity style={style.btnEvento} onPress={()=>!idUsuario ?this.props.navigation.navigate("Perfil") :esSeguidor ?this.unLike() :this.like()}>
            <Icon name={esSeguidor ?"heart" :"heart-o"} style={esSeguidor ?style.iconMeGustaActivo :style.iconMeGusta} />
            <Text style={{fontSize:10}}>{meGusta.length}</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
  guardarEvento(idEvento){
    console.log({idEvento})
    const {eventoGuardado} = this.state
    axios.post("user/guardarEvento", {idEvento})
    .then(res=>{
      console.log(res.data)
      eventoGuardado.push(idEvento)
     
      res.data.status &&this.setState({eventoGuardado})
    })
  }
  eliminarEvento(idEvento){
    let {eventoGuardado, idUsuario} = this.state
    axios.post("user/eliminarEvento", {idEvento})
    .then(res=>{
      eventoGuardado = eventoGuardado.filter(e=>{return e!=idEvento})
      res.data.status &&this.setState({eventoGuardado})
    })
  }

  like(){
    const {_id} = this.state.evento
    console.log({_id})
    axios.post("eve/evento/like", {id:_id})
    .then(res=>{
      console.log(res.data)
      res.data.status &&this.props.getEvento(_id)
    })
  }
  unLike(){
    const {_id} = this.state.evento
    console.log({_id})
    axios.post("eve/evento/unLike", {id:_id})
    .then(res=>{
      res.data.status &&this.props.getEvento(_id)
    })
  }

  componentWillReceiveProps(props){
    if(props.evento){
      this.animacionShowEvento(props.evento)
    }
  }
 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////   ANIMACION PARA MOSTRAR UN SOLO EVENTO
  //----------------------   evento => trae la inforamcion del evento,  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
  animacionShowEvento(evento){
    let ubicacion ={
      latitude:evento.loc.coordinates[1]+0.025,
      longitude:evento.loc.coordinates[0],
      latitudeDelta:0.033850498819819812,
      longitudeDelta:0.03412317156791687
    }
    this.props.getEvento()
    this.props.getEventosCategoria("undefined", this.state.x) 
    this.setState({evento:evento,  x:ubicacion, buscador:true})
    this.evento.transitionTo({top:0}, 500,  "ease-in-out-back")
    this.view.transitionTo({top:height+85}, 500,  "ease-in-out-back")
    this.categoria.transitionTo({bottom:-100}, 500,  "ease-in-out-back")
  }

  animacionHideEvento(){
    this.setState({x:this.state.x2, buscador:false})
    this.evento.transitionTo({top:-1000}, 500,  "ease-in-out-back")
    this.view.transitionTo({top:height-85}, 500,  "ease-in-out-back")
    this.categoria.transitionTo({bottom:100}, 500,  "ease-in-out-back")
  }
  animacionCategoria = (top) => {
    this.view.transitionTo({top}, 500,  "ease-in-out-back")
    this.setState({modal:!this.state.modal})
  }
  renderMapa(){
    const {buscador, x, modal, terminoBuscador}=this.state
    const estiloMapa = [
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
    console.log({buscador})
    return(
      <View style ={style.containerMap}>
        
        {
          buscador
          ?<MapView
            showsMyLocationButton={false}
            provider={this.props.provider}
            style={style.map}
            region={{
                latitude:  x.latitude,
                longitude: x.longitude,
                latitudeDelta: x.latitudeDelta,
                longitudeDelta: x.longitudeDelta,
            }}
            minZoomLevel={20}
            customMapStyle={estiloMapa}
            onPress={()=>this.setState({buscador:true})}
          >
            {this.renderMarkers()}
          </MapView>
          :<MapView
            customMapStyle={estiloMapa}
            provider={this.props.provider}
            style={style.map}
            initialRegion={{
              latitude: x.latitude,
              longitude: x.longitude,
              latitudeDelta: x.latitudeDelta,
              longitudeDelta: x.longitudeDelta,
            }}
          >
          {this.renderMarkers()}
          <Circle center={x} radius={200} fillColor={"rgba(51,162,255,.3)"} strokeColor = { '#1a66ff' } />
          </MapView>
        }
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Home") } style={style.btnHome}>
          <Icon name='home' style={style.iconHome} />
        </TouchableOpacity>
        <Animatable.View ref={ref=>{this.categoria=ref}} style={style.contenedorCategorias} >
          <ScrollView horizontal>
              {this.renderCategorias()}
          </ScrollView>
        </Animatable.View>
        {/* CONTENIDO MODAL */}
        <Animatable.View ref={ref=>{this.view=ref}} style={style.contenedorEventos}>
          <ScrollView  keyboardDismissMode="on-drag">
            <TouchableOpacity onPress={()=>this.animacionCategoria(modal ?height-85: 75 )} style={style.contenedorIconEvento}>
              <Icon name={modal ?'minus' :"plus"} style={style.iconContenedorEvento} />
              <View style={style.contenedorBuscador}>
                <Icon name={"search"} style={style.iconSearch} />
                <TextInput
                  style={style.inputBuscador}
                  onChangeText={(terminoBuscador) => this.setState({terminoBuscador}) }
                  value={terminoBuscador}
                  underlineColorAndroid='transparent'
                  placeholder="Buscar Evento"
                  placeholderTextColor='#8F9093'
                  autoCapitalize = 'none'
                  onFocus={()=>this.animacionCategoria(75)}
                />
              </View>
            </TouchableOpacity>
              {this.renderEventos()}
          </ScrollView>
        </Animatable.View>
      </View>
    )
  }
	render(){
		const {mapaCargado, evento}=this.state
		if (mapaCargado) {
			return(
        <>
           <Animatable.View ref={ref=>{this.evento=ref}} style={style.contenedorEvento}>
              {this.renderEvento()}
              <View style={style.triangulo}></View>
            </Animatable.View>
          {this.renderMapa()}
        </>
			)
		}else{
			return(<Text></Text>)
		}
	}

	showInput(){
		Animated.timing(this.state.top,{
			toValue:100,
			duration:400,
		}).start()
	}


}
const mapState = state => {
  let categorias =  state.categoria.categorias
  categorias = categorias.concat([{nombre:"Todos", _id:"undefined"}])
   
	return {
        evento: state.evento.evento,
        eventos: state.evento.eventoCategoria,
        categorias
	};
};

const mapDispatch = dispatch => {
	return {
    getEventosCategoria: (idCategoria, x) => {
			dispatch(getEventosCategoria(idCategoria, x));
    },
    getEvento: (idEvento) => {
			dispatch(getEvento(idEvento));
    },
    getCategorias: () => {
			dispatch(getCategorias());
	  },
	};
};

MapaPlanComponent.defaultProps = {
  evento:null
}
MapaPlanComponent.propTypes = {
  provider: ProviderPropType,
};
export default connect(
	mapState,
	mapDispatch
  )(MapaPlanComponent);