import React, {Component} from 'react'
import {View, Keyboard, TouchableOpacity, TextInput, Image} from 'react-native'
 
import Icon from 'react-native-fa-icons'; 
import {style} from './style'
import {connect}   from 'react-redux' 
 
class CabezeraComponent extends Component{
	constructor(props) {
	  super(props);
	  this.state={
			text:""
	  }
	}
	render(){
		const {text} = this.state
		return (
			<View style={style.cabezera}>
				<View style={style.subCabezera}>
					<TouchableOpacity style={style.btnBuscarCabezera} onPress={()=>navigation.navigate('Promociones')}>
						<Image source={require("../../assets/img/footer_buscar.jpg")} style={style.iconCabezera} />
					</TouchableOpacity>  
					<TextInput
						placeholder="Busca tu evento favorito"
						onChangeText={(text)=> {this.props.texto(text); this.setState({text})} }
						value={text}
						style={style.inputCabezera}
						onFocus={()=> { this.props.focus(true) }}
						// onBlur={()=> { this.props.focus(false) }}
					/>
					<TouchableOpacity style={style.btnClose} onPress={()=> { this.props.focus(false); this.setState({text:""}); Keyboard.dismiss() }}>
						<Icon name={'times-circle'} allowFontScaling style={style.iconClose} />
					</TouchableOpacity>  
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
