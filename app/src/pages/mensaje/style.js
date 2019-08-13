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
        borderBottomLeftRadius:10,
        overflow: 'hidden',
        flexDirection:"row",
    },
    cajaTexto:{
        justifyContent:"center",
        width:size.width/1.6,
    },
    cajaTexto2:{
        justifyContent:"center",
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
        paddingVertical:5
    },
    preload:{
        position:"absolute",
        zIndex:100,
		bottom:-1,
		left:(size.width/2)-5
    },
    
    /////////////////////////////////////////////
    //////////////////     CABEZERA
    /////////////////////////////////////////////
    contenedorCabezera:{
        backgroundColor:"rgba(255,255,255,1)",
        borderBottomWidth:1,
        borderBottomColor:"rgba(90,90,90,.3)",
        paddingTop:Platform.OS=='android' ?5 :25,
        flexDirection:"row",
        paddingBottom:7,
        position:"relative",
        zIndex:100
    },
    contenedorAvatar:{
        marginHorizontal:20,
    },
    avatar:{
        width:50,
        height:50,
        borderRadius:25
    },
    titulo:{
        fontSize:22
    },
    iconCabezera:{
        color:"#0071bb",
        fontSize:21,
        left:5,
        top:15
    },
    nombre:{
        width:"55%",
        fontSize:22,
        top:10
    },
    iconUser:{
        color:"#0071bb",
        fontSize:24,
        left:5,
        top:12,
        paddingTop:0,
        paddingBottom:20,
        paddingHorizontal:0
    },
    btnCerrar:{
        flexDirection:"row",
        backgroundColor:"#0071bb",
        justifyContent:"center",
        paddingVertical:5,
        paddingHorizontal:8,
        height:30,
        top:12,
        borderRadius:5
    },
    textCerrar:{
        color:"#fff"
    },
    /////////////////////////////////////////////
    //////////////////     FOOTER
    /////////////////////////////////////////////
    contenedorFooter:{
        flexDirection:"row",
    },
    contenedorFooter2:{
        flexDirection:"row",
        position:"absolute",
        width:"100%",
        bottom:Platform.OS=='android' ?5 :-305
    },
    input:{
        width:"75%",
        backgroundColor:"#ffffff",
        borderColor:"rgba(90,90,90,.3)",
        borderWidth:1,
        height:40,
        borderRadius:10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        padding:0,
        bottom:5,
        left:5
    },
    btnEnviar:{
        left:2,
        top:-5,
        padding:10
    },
    icon:{
        color:"#0071bb",
        fontSize:20,
    },
    
})