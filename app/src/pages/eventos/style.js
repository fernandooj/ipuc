import {StyleSheet, Dimensions, Platform} from 'react-native';
import { MediaQueryStyleSheet } from "react-native-responsive";
let size = Dimensions.get('window');

export const style = MediaQueryStyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#ffffff',
	},
	contenedorEvento:{
        shadowColor: 'rgba(0,0,0, .4)', // IOS
		shadowOffset: { height: 2, width: 2 }, // IOS
		shadowOpacity: .5, // IOS
		shadowRadius: 5, //IOS
		backgroundColor: '#fff',
		elevation: 7, // Android
		borderColor:"rgba(0,0,0,0)",
		marginRight:0,
		marginLeft:15,
		width:size.width-30,
        marginBottom:20,
        borderRadius:10
    },
    subContenedorEvento:{
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow: 'hidden',
    },
    imagen:{
        borderRadius:0,
        width:size.width,
        height:200
    },
    texto1:{
        fontFamily: "Roboto-Bold",
        paddingHorizontal:10,
        fontSize:15,
        paddingTop:3
    },
    texto2:{
        fontFamily: "Roboto-Regular",
        color:"rgba(0,0,0,.5)",
        fontSize:13,
        paddingHorizontal:10,
        paddingVertical:5
    },
    preload:{
        position:"absolute",
        zIndex:100,
		bottom:-1,
		left:(size.width/2)-5
    },
    
	////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////	 FILTROS 
	////////////////////////////////////////////////////////////////////////////////////////
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