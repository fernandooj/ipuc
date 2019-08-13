import React, {Component} from 'react'
import {View, Text, Animated, TouchableOpacity, Dimensions,  Image, ScrollView, ActivityIndicator, Platform} from 'react-native'
import {style}              from './style'
import Icon 				from 'react-native-fa-icons'
import moment 				from 'moment'
import { connect }          from "react-redux";
import { getEventosMensajes } from "../../redux/actions/eventoActions.js";
import { createFilter }     from 'react-native-search-filter';
 
import Lightbox 		    from 'react-native-lightbox';
import FastImage 		    from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';
import AutoHeightImage         from 'react-native-auto-height-image';
import AsyncStorage from '@react-native-community/async-storage';
import Cabezera from '../components/cabezera'
import Footer   from '../components/footer'
const ImageProgress = createImageProgress(FastImage);
const {width, height} = Dimensions.get('window')
const KEYS_TO_FILTERS = ["nombre", "lugar"]
moment.locale('es');

class eventosComponent extends Component{
	constructor(props){
		super(props);
		this.state={
            terminoBuscador:"",
            inicio:0,
			final:10,
            eventos:[]
		}
	}

	async componentWillMount(){
		this.props.getEventosMensajes();
		const idUsuario = await AsyncStorage.getItem('idUsuario')
		idUsuario ?this.setState({idUsuario})  :this.props.navigation.navigate("Perfil")
    }
	componentWillReceiveProps(props){
		this.setState({eventos:props.eventos})
	}
    onScroll(e) {
		const {final} =  this.state
		let paddingToBottom = 10;
        paddingToBottom += e.nativeEvent.layoutMeasurement.height;
        if(e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
        	console.log(final)
            this.setState({final:final+5, showSpin:true})
            this.myInterval = setInterval(()=>this.setState({showSpin:false}), 2000)
        }
	}
    capitalize=(s)=>{
        return s[0].toUpperCase() + s.slice(1);
    }
    renderEventos(){
        const {terminoBuscador, eventos, inicio, final, idUsuario} = this.state
        console.log(eventos)
        const filtros = eventos.filter(createFilter(terminoBuscador, KEYS_TO_FILTERS))
		let newFiltro = filtros.slice(inicio, final)
        return newFiltro.map((e, key)=>{
            const data = e.data[0]
            let imagen = data.imagen[0].split("-")
            imagen = `${imagen[0]}Miniatura${imagen[2]}`
            return(
                <TouchableOpacity style={style.contenedorEvento} key={key} onPress={()=>this.props.navigation.navigate('mensaje', {id:e._id})}>
                    <View style={style.subContenedorEvento}>
                        <Lightbox 
                            renderContent={() => (
                                <AutoHeightImage
                                    width={width}
                                    source={{uri: imagen}}
                                />
                            )}
                        >
                            <AutoHeightImage
                                width={80}
                                source={{uri: imagen}}
                                style={style.imagen}
                            /> 
                        </Lightbox>	
                        <View style={style.cajaTexto}>
                            <Text style={style.texto1}>{this.capitalize(data.nombre)}</Text>
                            <Text style={style.texto2}>{moment(data.fechaInicio).format("YYYY-MM-DD hh:mm a")}</Text>
                            <Text style={style.texto2}>{data.idUsuario2==idUsuario ?data.nombre1 :data.nombre2}</Text>
                        </View>
                        <View style={style.cajaTexto2}>
                            <Icon name={'angle-right'} allowFontScaling style={style.iconFooter} />
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })
    }
	render(){
        const {navigation} = this.props
        return(
            <View style={style.container}>
                <View style={{alignItems: 'center'}}>
                    <Cabezera navigation={navigation} />
                </View>
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
    return {
        eventos: state.evento.eventosMensajes
    };
};

const mapDispatch = dispatch => {
	return {
        getEventosMensajes: () => {
			dispatch(getEventosMensajes());
	  },
	};
};

 
 
export default connect(
	mapState,
	mapDispatch
  )(eventosComponent);