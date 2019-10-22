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
        borderRadius:10,
        
    },
    subContenedorEvento:{
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        flexDirection:"row",
        alignItems: 'center'
    },
    imagen:{
        borderRadius:0,
        width:80,
        height:80
    },
    texto1:{
        fontFamily: "Roboto-Bold",
        paddingHorizontal:10,
        fontSize:15,
        paddingVertical:5
    },
    texto2:{
        fontFamily: "Roboto-Regular",
        color:"rgba(0,0,0,.5)",
        fontSize:13,
        paddingHorizontal:10,
        paddingVertical:1
    },
    preload:{
        position:"absolute",
        zIndex:100,
		bottom:-1,
		left:(size.width/2)-5
	}
})