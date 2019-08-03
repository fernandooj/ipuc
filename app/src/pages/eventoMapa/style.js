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
        bottom:100
    },
    cajaCategoria:{
        flexDirection:"row",
        backgroundColor:"#fff",
        marginHorizontal:5,
        paddingVertical:15,
        paddingHorizontal:12,
        borderRadius:30
    },
    cajaCategoriaSeleccionada:{
        flexDirection:"row",
        backgroundColor:"#33A2FF",
        marginHorizontal:5,
        paddingVertical:15,
        paddingHorizontal:12,
        borderRadius:30
    },

    textCategoria:{
        fontFamily: "Roboto-Regular",
        marginHorizontal:8
    },

 

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////       EVENTOS
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    contenedorEventos:{
        position:"absolute",
        backgroundColor:"#fff",
        borderTopLeftRadius:55,
        borderTopRightRadius:55,
        top:size.height-85,
        left:0,
        padding:5,
        width:size.width,
        height:size.height-55
    },
    subContenedorEventos:{
        flexDirection:"row",
        marginVertical:10
    },
    contenedorIconEvento:{
        alignItems:"center",
        padding:10
    },
    iconContenedorEvento:{
        color:"#33A2FF",
        fontSize:25
    },
    contentIconEvento:{
        alignItems:"center",
        justifyContent:"center",
        width:size.width/8
    },
    contentTituloEvento:{
        width:size.width/1.7
    },
    contentDistanciaEvento:{
        width:size.width/4
    },
    text1Evento:{
        fontFamily: "Roboto-Bold",
        fontSize:16
    },
    text2Evento:{
        fontFamily: "Roboto-Regular",
        color:"rgba(0,0,0,.5)",
        fontSize:13,
    },
    text3Evento:{
        fontFamily: "Roboto-Regular",
        color:"rgba(0,0,0,.5)",
        fontSize:13
    },
    iconEvento:{
        fontSize:24
    },
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////       BUSCADOR
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    contenedorBuscador:{
        flexDirection:"row",
        width:size.width-150
    },
    iconSearch:{
        color:"#33A2FF",
        paddingVertical:10,
        marginRight:15,
        fontSize:20
    },
    inputBuscador:{
        padding:5,
        width:200,
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////       EVENTO
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    contenedorEvento:{
        position:"absolute",
        justifyContent:"center",  
        zIndex:100,
        top:-1000
    },
    subContenedorEvento:{
        backgroundColor:"#fff",
        shadowColor: 'rgba(0,0,0, .4)', // IOS
		borderColor:"rgba(0,0,0,0)",
		shadowOffset: { height: 2, width: 2 }, // IOS
		shadowOpacity: .5, // IOS
		shadowRadius: 5, //IOS
		elevation: 7, // Android
		paddingLeft:10,
		marginBottom:15,
		borderRadius:5,
		backgroundColor:'#ffffff',
        padding:10,
        paddingVertical:0,
        width:size.width-80,
        height:size.height-100,
        top:50,
        left:40,
        fontSize:20
    },
    btnRegresar:{
        padding:12
    },
    iconRegresar:{
        fontSize:22,
        color:"rgba(0,0,0,.5)",
    },
    conTextoEvento:{
        flexDirection:"row",
        marginVertical:4
    },
    iconCircle:{
        top:3,
        marginHorizontal:8
    },
    textoEvento1:{
        fontFamily: "Roboto-Bold",
        fontSize:20
    },
    // textoEvento1:{
    //     fontFamily: "Roboto-Bold",
    //     color:"rgba(0,0,0,.5)",
    //     fontSize:18
    // },
    textoEvento2:{
        fontFamily: "Roboto-Bold",
        color:"rgba(0,0,0,.3)",
        fontSize:15
    },
    textoEvento3:{
        fontFamily: "Roboto-regular",
        color:"rgba(0,0,0,.3)",
        fontSize:14,
        marginBottom:15
    },
    separador:{
        width:"82%",
        left:-10,
        height:2,
        marginVertical:10,
        backgroundColor:"#33A2FF",
    },
    btnEventoPreguntar:{
        backgroundColor:"#33A2FF",
        shadowColor: 'rgba(0,0,0, .4)', // IOS
		borderColor:"rgba(0,0,0,0)",
		shadowOffset: { height: 2, width: 2 }, // IOS
		shadowOpacity: .5, // IOS
		shadowRadius: 5, //IOS
		elevation: 7, // Android
        borderRadius:5,      
        paddingVertical:12,
        paddingHorizontal:15,
        marginRight:15,
        borderRadius:5,
        height:42
    },
    textPreguntar:{
        color:"white",
        fontFamily: "Roboto-regular",
    },
    btnEvento:{
        backgroundColor:"#fff",
        shadowColor: 'rgba(0,0,0, .4)', // IOS
		borderColor:"rgba(0,0,0,0)",
		shadowOffset: { height: 2, width: 2 }, // IOS
		shadowOpacity: .5, // IOS
		shadowRadius: 5, //IOS
		elevation: 7, // Android
		paddingLeft:10,
		marginBottom:15,
		borderRadius:5,
		backgroundColor:'#ffffff',
        padding:10,
        marginRight:10,
        alignItems: 'center',
    },
    iconEvento:{
        color:"rgba(0,0,0,.5)",
        fontSize:22
    }
})