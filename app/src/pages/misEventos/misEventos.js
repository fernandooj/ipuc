import React, {Component} from 'react'
import {View, Text, Animated, TouchableOpacity, Dimensions,  Image, ScrollView, ActivityIndicator, Platform} from 'react-native'
import {style}              from './style'
import Icon 				from 'react-native-fa-icons'
import moment 				from 'moment'
import { connect }          from "react-redux";
import { getMisEventos } from "../../redux/actions/eventoActions.js";
import { createFilter }     from 'react-native-search-filter';
 
import Lightbox 		    from 'react-native-lightbox';
 
import AutoHeightImage         from 'react-native-auto-height-image';

import Cabezera from '../components/cabezera'
import Footer   from '../components/footer'
 
const {width, height} = Dimensions.get('window')
const KEYS_TO_FILTERS = ["nombre", "lugar"]
moment.locale('es');

class misEventosComponent extends Component{
	constructor(props){
		super(props);
		this.state={
            terminoBuscador:"",
            inicio:0,
			final:9,
            eventos:[]
		}
	}

	componentWillMount(){
      
		this.props.getMisEventos();
    }
	componentWillReceiveProps(props){
		this.setState({eventos:props.eventos})
	}
    onScroll(e) {
		const {final} =  this.state
		let paddingToBottom = 10;
        paddingToBottom += e.nativeEvent.layoutMeasurement.height;
        if(e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
            this.setState({final:final+5, showSpin:true})
            this.myInterval = setInterval(()=>this.setState({showSpin:false}), 2000)
        }
	}
    capitalize=(s)=>{
        return s[0].toUpperCase() + s.slice(1);
    }
    renderEventos(){
        const {terminoBuscador, eventos, inicio, final} = this.state
        const filtros = eventos.filter(createFilter(terminoBuscador, KEYS_TO_FILTERS))
		let newFiltro = filtros.slice(inicio, final)
        return newFiltro.map((e, key)=>{
            let imagen = e.imagen[0].split("-")
			imagen = `${imagen[0]}Miniatura${imagen[2]}`
            return(
                <TouchableOpacity style={style.contenedorEvento} key={key} onPress={()=>this.props.navigation.navigate('nuevoEvento', {id:e._id})}>
                    <View style={style.subContenedorEvento}>
                        <View>
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
                        </View>
                        <View style={{width:"70%"}}>
                            <Text style={style.texto1}>{this.capitalize(e.nombre)}</Text>
                            <Text style={style.texto2}>{this.capitalize(e.categoria.nombre)}</Text>
                            <Text style={style.texto2}>{moment(e.fechaInicio).format("YYYY/MM/DD hh:mm a")}</Text>
                            <Text style={style.texto2}>{e.creado}</Text>
                        </View>
                        <View>
                            <Icon name={'chevron-right'} style={style.iconAvatar} />
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
        eventos: state.evento.misEventos
    };
};

const mapDispatch = dispatch => {
	return {
        getMisEventos: () => {
			dispatch(getMisEventos());
	  },
	};
};

 
 
export default connect(
	mapState,
	mapDispatch
  )(misEventosComponent);