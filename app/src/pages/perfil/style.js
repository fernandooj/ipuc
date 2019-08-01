import {StyleSheet, Dimensions, Platform} from 'react-native';
import { MediaQueryStyleSheet } from "react-native-responsive";
let size = Dimensions.get('window');

export const style = MediaQueryStyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#ffffff',
	},
	perfilContenedor:{
		flexDirection:"row",
		alignItems: 'center',
		padding:22,
		borderBottomWidth:1,
		borderBottomColor:"rgba(0,0,0,.15)"
	},
	avatar:{
		width:60,
		height:60,
		borderRadius:30,
		marginRight:20
	},	
	nombre:{
		fontSize:24
	},
	btnLista:{
		borderBottomColor:"rgba(0,0,0,.15)",
		padding:15,
		borderBottomWidth:1,
		flexDirection:"row"
	},
	txtLista:{
		width:"90%",
		fontSize:17
	},
	icon:{
		fontSize:22
	}
})