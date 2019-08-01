import {StyleSheet, Dimensions, Platform} from 'react-native';
import { MediaQueryStyleSheet } from "react-native-responsive";
let size = Dimensions.get('window');

export const style = MediaQueryStyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#ffffff',
	},
	titulo:{
		marginTop:28,
		marginBottom:15,
		fontSize:22
	},
	////////////////////////////////////////////////////////////////////////////////////
	////////////////////////		CATEGORIAS
	////////////////////////////////////////////////////////////////////////////////////
	contenedorCategoria:{
		backgroundColor:'#ffffff',
		flexDirection: 'row',
    	flexWrap: 'wrap'
	},
	subContenedorCategoria:{
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"center",
		width:size.width/3,
		paddingVertical:20,
	},
	subContenedorCategoriaSelect:{
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"center",
		width:size.width/3,
		paddingVertical:20,
		borderWidth:1,
		borderColor:"rgba(50,50,50,.5)"
	},
	textCategoria:{
		color:"#fff",
		marginHorizontal:5
	},
	iconCategoria:{
		color:"#fff",
	},

	////////////////////////////////////////////////////////////////////////////////////
	////////////////////////		FORMULARIO
	////////////////////////////////////////////////////////////////////////////////////
	contenedorInput:{
		flexDirection:"row",
		justifyContent:"center",
		alignItems:"center",
	},
	iconInput:{
		fontSize:18,
		marginRight:15
	},
	input:{
		width:"80%",
		backgroundColor:"rgba(200,200,200,.2)",
		paddingVertical:7,
		paddingHorizontal:12,
		marginVertical:8
	},
	inputDate:{
		width:"80%",
		backgroundColor:"rgba(200,200,200,.2)",
		paddingHorizontal:10,
		marginVertical:8
	},
	btnEnviar:{
		flexDirection:"row",
		backgroundColor:"#00338A",
		alignItems:"center",
		justifyContent:"center",
		textAlign:"center",
		width:size.width,
		padding:10,
		borderRadius:5,
		position:"absolute",
		bottom:50
	},
	textEnviar:{
		color:"#fff"
	},
})