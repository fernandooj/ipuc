import {StyleSheet, Dimensions, Platform} from 'react-native';
import { MediaQueryStyleSheet } from "react-native-responsive";

const size = Dimensions.get('window');
export const style = MediaQueryStyleSheet.create({
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////			CABEZERA
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	cabezera:{
		width:"90%",
		height:55,
		// borderWidth:1,
		marginTop:40,
	},
	subCabezera:{
 		flexDirection: 'row',
		shadowColor: 'rgba(0,0,0, .4)', // IOS
		shadowOffset: { height: 2, width: 2 }, // IOS
		shadowOpacity: .5, // IOS
		shadowRadius: 5, //IOS
		backgroundColor: '#fff',
		elevation: 2, // Android
		borderRadius:10,
		borderWidth:1,
		borderColor:"rgba(0,0,0,.1)",
	},
	btnBuscarCabezera:{
		position: "absolute"
	},
	inputCabezera:{
		width:"100%",
		height:40,
		// margin: "auto",
		paddingLeft:52,
		borderRadius:5, 
	},
	iconCabezera:{
		position:"relative",
		left:10,
		top:4,
		width:30,
		height: 30,
	},
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////			FOOTER
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	contenedorFooter:{
		backgroundColor: "#ffffff",
		alignItems:"center",
		flexDirection:"row",
		position:"absolute",
		bottom:2,
		width:"100%",
		left:0,
		height:40
	},
	imagen:{
		width:20,
		height:20,
	},
	 
	subContenedorFooter:{
		width:size.width/5,
		alignItems:"center",
	},
	iconFooter:{
		fontSize:22,
		paddingTop:8,
		paddingBottom:5,
		color:"#4f7330",
	},
	textFooter:{
		fontSize:10,
		marginTop:2
	},
	iconFooter:{
		fontSize:19,
	},
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////			LOGIN
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	contenedorLogin:{
		flex:1,
		marginTop:0,
		justifyContent:"center",
	},
	contenedorForm:{
		justifyContent:"center",
		alignItems:"center",
		height:size.height,
		flex:1,
	},
	subContenedorLogin:{
		width:"85%",
	},
	contenedorRedes:{
		flexDirection:"row"
	},
	btnFacebook:{
		alignItems:"center",
		backgroundColor:"#3b5998",
		borderRadius:5,
		padding:15,
		marginTop:5,
		marginBottom:5,
		marginRight:15,
		width:"45%"
	},
	btnGoogle:{
		alignItems:"center",
		backgroundColor:"#dd4b39",
		borderRadius:5,
		padding:15,
		marginTop:5,
		marginBottom:5,
		width:"45%"
	},
	btnEmail:{
		alignItems:"center",
		backgroundColor:"#7B7979",
		borderRadius:5,
		padding:15,
		marginTop:5,
		marginBottom:5,
	},
	textBtn:{
		color:"#ffffff"
	},
	contenedorSeparador:{
		flexDirection:"row",
		alignItems:"center",
		marginVertical:20,
		width:200
	},	
	separador:{
		position:"relative",
		backgroundColor:"#000000",
		width:"34%",
		top:1,
		height:1,
	},
	textSeparador:{
		textAlign:"center",
		width:"20%",
		marginLeft:"3%",
		marginRight:"3%",
	},
	titulo:{
		fontWeight:"bold",	
		color:"#3e3e3e",
		fontSize:28,
		margin:5,
		marginLeft:15,
	},
	input:{
		// position:"relative",
		zIndex:5,
		borderWidth:1,
		borderRadius:5,
		marginTop:5,
		marginBottom:5,
		paddingLeft:20,
		height:50,
		width:size.width-25,
	},
	inputRequired:{
		borderColor:"rgba(255, 0, 0, 0.19)",
		borderWidth:1,
		borderRadius:5
	},
	contenedorPass:{
		flexDirection:"row",
		top:-60
	},
	btnIconPass:{
		zIndex:100,
		width:25,
		height:25,
		right:5,
		top:18,
		position:"absolute"
	},
	iconPass:{
		fontSize:25,
	},
	btnIngresar:{
		alignItems:"center",
		backgroundColor:"#0840ba",
		borderRadius:5,
		padding:10,
		marginTop:5,
		marginBottom:5,
		width:"90%"
	},
	contenedorEmailRegistro:{
		alignItems:"center",
		marginVertical:30
	},
	err:{
		color:"red",
		textAlign:"center",
		fontSize:12
	},
	btnEnviar:{
		flexDirection:"row",
		backgroundColor:"#00338A",
		alignItems:"center",
		justifyContent:"center",
		textAlign:"center",
		width:size.width/2,
		padding:10,
		borderRadius:5,
		marginTop:-50
	},
	textEnviar:{
		color:"#fff"
	},
	tituloRegresar:{
		textAlign:"center",
		fontSize:22,
	},
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////			TOMAR FOTO
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	contenedorPortada:{
		alignItems:"center",
		flexDirection:"row"
	},
	contenedorUploadPortada:{
		backgroundColor:"#0071bb",
		alignItems:"center",
		paddingVertical:17,
		borderRadius:10,
		 
	},
	iconPortada:{
		color:"#ffffff",
		fontSize:40,
	},
	textPortada:{
		color:"#ffffff",
		fontSize:15,
		marginVertical:5
	},
	textPortada2:{
		textAlign:"center",
		color:"#ffffff",
		fontSize:12,
		marginVertical:0
	},
	imagenesFotos:{
		width:100, 
		height:100,
		marginLeft:9,
		borderRadius:10
	},
	iconTrash:{
		backgroundColor:"rgba(255,255,255,.5)",
		width:27,
		borderRadius:15,
		fontSize:20,
		padding:5,
		left:46,
		top:-65
	},
	btnModal:{
		backgroundColor:"rgba(0,0,0,.1)",
		flex: 1,
	},
	contenedorModal:{
		position:"absolute",
		alignItems:"center",
		width:"100%",
		bottom:50,
	},
	btnOpcionModal:{
		borderRadius:10,
		marginBottom:10,
		backgroundColor:"#ffffff",
		width:"90%",
		alignItems:"center",
		padding:12
	},
	textModal:{
		fontSize:19
	},
	avatarPerfil:{
		width:100,
		height:100,
		borderRadius:50
	},
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////			MAPA
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	autoComplete:{
		marginTop:Platform.OS === 'android' ?0 : 25,
		flex:1,
		position:"absolute",
		zIndex:5,
		backgroundColor:"#fff"
	},
	containerMap:{
		justifyContent: 'flex-end',
		marginTop:70,
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		height:(size.height)-70,
	},
	map:{
		height:(size.height)-120,
		...StyleSheet.absoluteFillObject,
	},
	btnIconVolver:{
		position:"absolute",
		opacity:.5,
		zIndex:100,
		top:size.width/1.2
	},
	iconVolver:{
		fontSize:55,
		opacity:.6,
	},
	contenedorInputMapa:{
		position:"absolute",
		// top:size.width/2,
	},
	inputMapa:{
		backgroundColor:"#fff",
		fontSize:18,
		padding:15,
		zIndex:100,
		width:size.width,
	}
	
})
