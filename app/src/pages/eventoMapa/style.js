import {StyleSheet, Dimensions, Platform} from 'react-native';
import { MediaQueryStyleSheet } from "react-native-responsive";
let size = Dimensions.get('window');

export const style = MediaQueryStyleSheet.create({
	container:{
		flex:1,
		alignItems: 'center',
		backgroundColor:'#ffffff',
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////       MAPA
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    containerMap:{
		justifyContent: 'flex-end',
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		height:(size.height),
	},
	map:{
		height:size.height,
		...StyleSheet.absoluteFillObject,
    },
    iconoImagen:{
        width:21,
        height:26
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////       CATEGORIAS
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    contenedorCategorias:{
        position:"absolute",
        flexDirection:"row",
        bottom:140
    },
    cajaCategoria:{
        flexDirection:"row",
        backgroundColor:"#fff",
        marginHorizontal:5,
        padding:10,
        borderRadius:30
    },
    textCategoria:{
        fontFamily: "Roboto-Regular",
        marginHorizontal:8
    },
    icon:{
        color:"blue"
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////       EVENTOS
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    contenedorEventos:{
        position:"absolute",
        backgroundColor:"#fff",
        borderRadius:35,
        bottom:-200,
        left:0,
        padding:15,
        width:size-width
    },
    iconContenedorEvento:{
        color:"blue",
        
    }


})