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
    btnHome:{
        position:"absolute",
        // backgroundColor:"red",
        top:40,
        left:20
    },
    iconHome:{
        fontSize:30,
        color:"#33A2FF"
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////       CATEGORIAS
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    contenedorCategorias:{
        position:"absolute",
        flexDirection:"row",
        bottom:Platform.OS === 'android' ?130 :100
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
        top:Platform.OS === 'android' ?size.height-115 :size.height-85,
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
        alignItems:"center",
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
        height:size.height-150,
        top:50,
        left:40,
        fontSize:20
    },
    triangulo:{       
        width: 0,
        height: 0,
        top:32,
        left:40,
        borderTopWidth: 0,
        borderRightWidth: 30,
        borderTopWidth: 60,
        borderLeftWidth: 30,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'white',
        borderLeftColor: 'transparent',
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
        fontFamily: "Roboto-Regular",
    },
    btnEvento:{
        justifyContent:"center",
        backgroundColor:"#fff",
        shadowColor: 'rgba(0,0,0, .4)', // IOS
		borderColor:"rgba(0,0,0,0)",
		shadowOffset: { height: 2, width: 2 }, // IOS
		shadowOpacity: .5, // IOS
		shadowRadius: 5, //IOS
		elevation: 7, // Android
		paddingHorizontal:10,
		marginBottom:15,
		borderRadius:5,
		backgroundColor:'#ffffff',
        paddingVertical:5,
        marginRight:10,
        alignItems: 'center',
    },
     
    iconMeGusta:{
        fontSize:24
    },
    iconMeGustaActivo:{
        fontSize:24,
        color:"#ed4956",
    },
    iconEvento:{
        fontSize:24
    },
    iconEventoActivo:{
        fontSize:24
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////       MODAL ENVIAR EVENTO
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    modalEnviar:{
        position:"absolute",
        alignItems:"center",
       
        backgroundColor:"rgba(0,0,0,.2)",
        width:size.width-80,
        height:"100%",
       
        left:0
    },
    subModalEnviar:{
        backgroundColor:"white",
        alignItems:"center",
        width:300,
        paddingTop:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
    },
    inputMensaje:{
        marginTop:100,
        width:300,
        backgroundColor:"white",
        borderColor:"rgba(0,0,0,.2)",
        height:150,
        padding:10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderWidth:1,
    },
    btnClose:{
        position:"absolute",
        right:22,
        top:100,
        zIndex:100
    },
    iconClose:{
        fontSize:22
    },
    btnEnviar:{
		flexDirection:"row",
		backgroundColor:"#00338A",
		justifyContent:"center",
        textAlign:"center",
		width:100,
		padding:10,
		borderRadius:5,
	},
	textEnviar:{
        color:"#fff",
        fontFamily: "Roboto-Bold",
	},       
})