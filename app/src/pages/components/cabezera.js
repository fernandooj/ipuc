import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native'
import firebase    from 'react-native-firebase';
 
import {style} from './style'
import {connect}   from 'react-redux' 
 
class CabezeraComponent extends Component{
	constructor(props) {
	  super(props);
	  this.state={
	   
	  }
	}
	render(){
		return (
			<View style={style.cabezera}>
				<View style={style.subCabezera}>
					 <TouchableOpacity style={style.btnBuscarCabezera} onPress={()=>navigation.navigate('Promociones')}>
						<Image source={require("../../assets/img/footer_buscar.jpg")} style={style.iconCabezera} />
					</TouchableOpacity>  
					<TextInput
						placeholder="Busca tu evento favorito"
						onChange={()=>console.log("el mundo ")}
						style={style.inputCabezera}
					/>
				</View>
			</View>	 
	    )
	}	 
}

const mapStatetoPros =(state) =>{
	return{
		carrito:state.carrito
	}
}
	   
export default connect(mapStatetoPros)(CabezeraComponent) 
