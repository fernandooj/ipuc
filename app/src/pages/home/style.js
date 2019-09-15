import {StyleSheet, Dimensions, Platform} from 'react-native';
import { MediaQueryStyleSheet } from "react-native-responsive";
let size = Dimensions.get('window');

export const style = MediaQueryStyleSheet.create({
	container:{
		flex:1,
		alignItems: 'center',
		backgroundColor:'#ffffff',
	},
	subContainerMenu:{
		marginBottom:45
	},
	titulo:{
		fontFamily: "Roboto-Bold",
		color:"#3e3e3e",
		fontSize:28,
		marginTop:0,
		margin:20,
		marginLeft:15,
	},
	titulo2:{
		fontFamily: "Roboto-Bold",
		color:"#3e3e3e",
		fontSize:25,
		marginVertical:10,
		margin:20,
		marginLeft:15,
		width:size.width-120
	},
	titulo3:{
		fontFamily: "Roboto-Light",
		color:"#3e3e3e",
		fontSize:20,
		marginVertical:14,
	},
	////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////	CATEGORIAS
	////////////////////////////////////////////////////////////////////////////////////////
	contenedorCategoria:{
		shadowColor: 'rgba(0,0,0, .4)', // IOS
		shadowOffset: { height: 2, width: 2 }, // IOS
		shadowOpacity: .5, // IOS
		shadowRadius: 5, //IOS
		backgroundColor: '#fff',
		elevation: 7, // Android
		borderColor:"rgba(0,0,0,0)",
		marginRight:0,
		marginLeft:15,
		height:170,
		borderRadius:80,
		marginBottom:25
	},
	subContenedorCategoria:{
		backgroundColor:"rgba(0,0,0,.2)",
		width:210,
		height:170,
		borderRadius:10,
	},
	textoCategoria:{
		position:"absolute",
		bottom:35,
		left:10,
		fontSize:28,
		fontWeight:"bold",
		color:"#ffffff",
		fontFamily: "Roboto-black",
	},
	explorarCategoria:{
		fontFamily: "Roboto-Regular",
		position:"absolute",
		bottom:5,
		right:5,
		padding:8,
		paddingHorizontal:15,
		borderRadius:20,
		backgroundColor:"rgba(0,0,0,.7)",
		borderWidth:1,
		borderColor:"#fff",
	},
	textExplorarCategoria:{
		color:"#fff",
		fontSize:10,
	},
	////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////	EVENTOS LOCALES
	////////////////////////////////////////////////////////////////////////////////////////
	contenedorEventos:{
		shadowColor: 'rgba(0,0,0, .4)', // IOS
		shadowOffset: { height: 2, width: 2 }, // IOS
		shadowOpacity: .5, // IOS
		shadowRadius: 5, //IOS
		backgroundColor: '#fff',
		elevation: 7, // Android
		borderColor:"rgba(0,0,0,0)",
		marginRight:0,
		marginLeft:15,
		height:170,
		borderRadius:7,
		marginBottom:10
	},
	imagenEventos:{
		width:180,
		height:140,
		borderRadius:5,
	},
	textoEventos:{
		fontFamily: "Roboto-Bold",
		paddingTop:5,
		paddingLeft:8,
		color:"#3e3e3e"
	},
	////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////	 FILTROS 
	////////////////////////////////////////////////////////////////////////////////////////
	contenedorFiltrosEventos:{
		flex:1
	},
	fondo:{
		flex:1,
		height:size.height,
		width:size.width,
		backgroundColor:"rgba(255,255,255,.95)",
		position:"absolute",
		top:0,
		left:0,
		// paddingTop:120,
		zIndex:500
	},
	contenedorFiltros:{
		marginTop:80,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems:"center"
	},	
	contenedorCategoriaFiltro:{
		borderWidth:1,
		borderColor:"rgba(0,0,0,.3)",
		alignItems:"center",
		margin:5,
		paddingHorizontal:5,
        height:28,
        fontSize:13
	},
	textoCategoriaFiltro:{
        color:"#000",
		top:3
	},
	iconEvento:{
        top:4,
        paddingHorizontal:5,
        color:"#000",
	},
	contenedorEventoFiltro:{
        flexDirection: 'row',
       
		marginVertical:5,
		padding:5
    },
    separador:{
        width:size.width,
        height:1,
        marginVertical:20,
        backgroundColor:"rgba(0,0,0,.1)"
    }
})