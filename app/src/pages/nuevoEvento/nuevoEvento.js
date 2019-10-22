import React, {Component} from 'react'
import {View, Text, ScrollView, Alert, ActivityIndicator, TextInput, TouchableOpacity} from 'react-native'
import PropTypes 			from "prop-types";
import Footer   			from '../components/footer'
import axios    			from 'axios'	
import MapaPlanComponent 	from '../components/mapa.js'
import Icon 				from 'react-native-fa-icons' 
import TomarFoto 			from "../components/tomarFoto";
import { getCategorias } 	from "../../redux/actions/categoriaActions.js";
import { connect } 			from "react-redux";
import DatePicker 			from 'react-native-datepicker'
import moment 				from 'moment'
import Toast 				from 'react-native-simple-toast';
import {style} 				from './style'
 
 
class NuevoEvento extends Component{
	constructor(props) {
		super(props);
		this.state={
			fechaHoy:moment().format('DD-MMM-YYYY h:mm a'),
			imagenes:[]
		}
	}
	async componentWillMount(){
		this.props.getCategorias()
		console.log(this.props.navigation.state.params.id)
		if(this.props.navigation.state.params.id){
			axios.get(`eve/evento/byId/${this.props.navigation.state.params.id}`)
			.then(res=>{
				const {_id, categoria, descripcion, nombre, fechaInicio, fechaFinal, imagen, lugar} = res.data.evento
				console.log(res.data.evento.loc.coordinates[0])
				let imagenes =  imagen[0].split("-")
				imagenes 	 = `${imagenes[0]}Miniatura${imagenes[2]}`
				let imagenArray=[]
				imagenArray.push({uri:imagenes})
				console.log({imagenArray})

				this.setState({
					_id,
					categoria:categoria.nombre,
					idCategoria:categoria._id,
					nombre,
					descripcion,
					lat:res.data.evento.loc.coordinates[1],
					lng:res.data.evento.loc.coordinates[0],
					fechaInicio: moment(fechaInicio).format("DD-MMM-YYYY h:mm a"),
					fechaFinal:  moment(fechaFinal).format("DD-MMM-YYYY h:mm a"), 
					imagenes:imagenArray,
					imagen:imagen,
					direccion:lugar,
				})
			})
		}
	}
	renderCategorias(){
		const {categoria} = this.state
		return this.props.categorias.map((e, key)=>{
				return(
					<TouchableOpacity 
						key={key}
						onPress={()=> this.setState({categoria:e.nombre, idCategoria:e._id}) }
						style={[{backgroundColor:e.color}, categoria==e.nombre ?style.subContenedorCategoriaSelect :style.subContenedorCategoria ]}
					>
						<Icon name={e.icono} style={style.iconCategoria} />
						<Text style={style.textCategoria}>{e.nombre} </Text>
					</TouchableOpacity>
				)
			})
	}
	renderFormulario(){
		const {nombre, descripcion, fechaHoy, fechaInicio, fechaFinal, cargaPlan, lat, lng, direccion, mapa, imagenes, loading, loadingEliminar} = this.state
	
		return(
			<View>
				{/* 	CATEGORIAS	*/}
				<View style={style.contenedorCategoria}>
					{this.renderCategorias()}
				</View>
				{/* 	NOMBRE	*/}
				<View style={style.contenedorInput}>
					<Icon name="bandcamp" style={style.iconInput} />
					<TextInput
						style={style.input}
						onChangeText={(nombre) => this.setState({nombre}) }
						value={nombre}
						underlineColorAndroid='transparent'
						placeholder="Nombre"
						placeholderTextColor='#8F9093' 
						autoCapitalize = 'none'
						maxLength = {80}
					/>	
				</View>
				{/* 	DESCRIPCION	*/}
				<View style={style.contenedorInput}>
					<Icon name="crop" style={style.iconInput} />
					<TextInput
						style={style.input}
						onChangeText={(descripcion) => this.setState({descripcion}) }
						value={descripcion}
						multiline
						maxLength = {250}
						underlineColorAndroid='transparent'
						placeholder="Descripción"
						placeholderTextColor='#8F9093' 
						autoCapitalize = 'none'
					/>	
				</View>
			{/* 	FECHA INICIO	*/}
				<View style={style.contenedorInput}>
					<Icon name="calendar-o" style={style.iconInput} />
					<DatePicker
						minDate={fechaHoy}
						customStyles={{
							dateInput: {
								borderLeftWidth: 0,
								borderRightWidth: 0,
								borderTopWidth: 0,
								borderBottomWidth: 0,
								alignItems: 'flex-start',
							},
							placeholderText:{
								fontSize:14,
								color:'#8F9093',
							},
							dateText: { 
								fontSize:14,
								color: '#000000'
							},
							btnTextConfirm: {
								color: '#8F9093',
							},
							btnTextCancel: {
								color: '#8F9093',
							} 
						}}
					style={style.inputDate}
					date={fechaInicio}
					locale="es_co"
					mode="datetime"
					placeholder="Fecha Inicio"
					format="DD-MMM-YYYY h:mm a"
					showIcon={false}
					confirmBtnText="Confirmar"
					cancelBtnText="Cancelar"
					androidMode='spinner'
					onDateChange={(fechaInicio) => {this.setState({fechaInicio})}}
					/>
				</View>
			{/* 	FECHA FINAL	*/}
				<View style={style.contenedorInput}>
					<Icon name="clock-o" style={style.iconInput} />
					<DatePicker
						minDate={fechaHoy}
						customStyles={{
						dateInput: {
							borderLeftWidth: 0,
							borderRightWidth: 0,
							borderTopWidth: 0,
							borderBottomWidth: 0,
							alignItems: 'flex-start',
						},
						placeholderText:{
							fontSize:14,
							color:'#8F9093',
						},
						dateText: { 
							fontSize:14,
							color: '#000000'
						},
						btnTextConfirm: {
							color: '#8F9093',
						},
						btnTextCancel: {
							color: '#8F9093',
						} 
					}}
					style={style.inputDate}
					date={fechaFinal}
					locale="es_co"
					mode="datetime"
					placeholder="Fecha Final"
					format="DD-MMM-YYYY h:mm a"
					showIcon={false}
					confirmBtnText="Confirmar"
					cancelBtnText="Cancelar"
					androidMode='spinner'
					onDateChange={(fechaFinal) => {this.setState({fechaFinal})}}
				/>
				</View>
				<View style={style.contenedorInput}>
					<Icon name="map-o" style={style.iconInput} />
					<TouchableOpacity onPress={()=>this.setState({mapa:true})} style={style.input}>
						<Text>{direccion ?direccion :"Lugar Evento"}</Text>
					</TouchableOpacity>
				</View>
				{mapa
					&&<MapaPlanComponent 
						close={()=> this.setState({mapa:false})} 						   			/////////   cierro el modal
						updateStateX={(lat,lng, direccion)=>this.updateStateX(lat, lng, direccion)}  /////////	me devuelve la posicion del marcador 
						ubicacionDefecto={cargaPlan ?{infoplan:true, area, lat:parseFloat(cargaPlan.loc.coordinates[1]), lng:parseFloat(cargaPlan.loc.coordinates[0])} :{infoplan:false,  muestraBtnHecho:true}}
						guardaUbicacion={{lat, lng, direccion}}
					/> 
				}
				<View style={style.contenedorInput}>
					<TomarFoto 
						width={120}
						source={nombre}
						limiteImagenes={1}
						imagen={imagenes}
						imagenes={(imagenes) => {  this.setState({imagenes, showLoading:false}) }}
					/> 
				</View>
				{
					!this.props.navigation.state.params
					?<TouchableOpacity onPress={() => {loading ?null :this.handleSubmit()}} style={style.btnEnviar}>
						<Text style={style.textEnviar}>{loading ?"GUARDANDO"  :"GUARDAR"}</Text>
						{loading &&<ActivityIndicator size="small" color="#fff" />}
					</TouchableOpacity> 
					:<TouchableOpacity onPress={() => {loading ?null :this.editSubmit()}} style={style.btnEditar}>
						<Text style={style.textEnviar}>{loading ?"EDITANDO"  :"EDITAR"}</Text>
						{loading &&<ActivityIndicator size="small" color="#fff" />}
					</TouchableOpacity> 
				}
				{
					this.props.navigation.state.params
					&&<TouchableOpacity onPress={() => {loadingEliminar ?null :this.eliminarSubmit()}} style={style.btnEliminar}>
						<Text style={style.textEnviar}>{loadingEliminar ?"ElIMINANDO"  :"ELIMINAR"}</Text>
						{loadingEliminar &&<ActivityIndicator size="small" color="#fff" />}
					</TouchableOpacity> 
				}
				
				
			</View>
		)
	}
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////  ACTUALIZA LA UBICACION //////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	updateStateX(lat,lng, direccion){
			this.setState({lat,lng, direccion, mapa:false})
	}
	
	render(){
		const {navigation} = this.props
		const {categoria} = this.state
		return (
			<View style={style.container}>
				<Text style={style.titulo}>{this.props.navigation.state.params ?"Editar Evento:" :"Nuevo Evento:"} {categoria}</Text>
				<ScrollView style={{flex:1, marginBottom:45}}>
					{this.renderFormulario()}	
				</ScrollView>
				<Footer navigation={navigation} />
			</View>
		)
	}
	eliminarSubmit(){
		this.setState({loadingEliminar:true})
		const {nombre, _id}= this.state
		Alert.alert(
            `Seguro desea eliminar a `,
            nombre,
            [
              {text: 'Confirmar', onPress: () => confirmar()},
               
              {text: 'Cancelar', onPress: () => console.log("cancelado")},
            ],
            {cancelable: false},
        );
        const confirmar =()=>{
            axios.delete(`eve/evento/eliminar/${_id}`)
			.then(res=>{
				if(res.data.status){
					Toast.show("Evento Eliminado")
					this.props.navigation.navigate("Home")
				}else{
					this.setState({loadingEliminar:false})
					alert("error intentalo nuevamente")
				}
			})
			.catch(err=>{
				this.setState({loadingEliminar:true})
			})
		}
		
		
	}
	editSubmit(){
		this.setState({loading:true})
		let {imagenes, nombre, descripcion, fechaInicio, fechaFinal, direccion, lat, lng, idCategoria, _id, imagen} = this.state
		console.log({imagenes, nombre, descripcion, fechaInicio, fechaFinal, direccion, lat, lng, idCategoria, _id, imagen:imagen[0] })
		if(!nombre || !descripcion || !fechaInicio || !fechaFinal || !direccion || !lat || !lng){
			Toast.show("Todos los campos son obligatorios")
			this.setState({loading:false})
		}else if(!idCategoria){
			Toast.show("Selecciona una categoria")
			this.setState({loading:false})
		}else if(imagenes.length<1){
			Toast.show("Sube al menos una imagen")
			this.setState({loading:false})
		}else{
			let data = new FormData();
			imagenes.forEach(e=>{
				data.append('imagen', e);
			})
			data.append('_id', 	   	   _id);
			data.append('nombre', 	   nombre);
			data.append('descripcion', descripcion);
			data.append('fechaInicio', fechaInicio);
			data.append('fechaFinal',  fechaFinal);
			data.append('lugar', 	   direccion);
			data.append('lat', 		   lat);
			data.append('lng', 		   lng);
			data.append('categoria',   idCategoria);
			data.append('imagenGuardado',imagen[0]);
			axios({
				method: 'put',  
				url: 'eve/evento',
				data: data,
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data'
				}
			})
			.then(e => {
					console.log(e.data)
					if(e.data.status) {
						this.props.navigation.navigate("Home")
						Toast.show("Evento Editado")
						this.setState({loading:false})
					}else{
						Toast.show("Houston tenemos un problema, intentalo mas rato")
						this.setState({loading:false})
					}
			})
			.catch(err=>{
				this.setState({loading:false})
			})
		}
 	}
	handleSubmit(){
		this.setState({loading:true})
		let {imagenes, nombre, descripcion, fechaInicio, fechaFinal, direccion, lat, lng, idCategoria} = this.state
		console.log(imagenes, nombre, descripcion, fechaInicio, fechaFinal, direccion, lat, lng, idCategoria)
		if(!nombre || !descripcion || !fechaInicio || !fechaFinal || !direccion || !lat || !lng){
			Toast.show("Todos los campos son obligatorios")
			this.setState({loading:false})
		}else if(!idCategoria){
			Toast.show("Selecciona una categoria")
			this.setState({loading:false})
		}else if(imagenes.length<1){
			Toast.show("Sube al menos una imagen")
			this.setState({loading:false})
		}else{
			let data = new FormData();
			imagenes.forEach(e=>{
				data.append('imagen', e);
			})
			data.append('nombre', 	   nombre);
			data.append('descripcion', descripcion);
			data.append('fechaInicio', fechaInicio);
			data.append('fechaFinal',  fechaFinal);
			data.append('lugar', 	   direccion);
			data.append('lat', 		   lat);
			data.append('lng', 		   lng);
			data.append('categoria',   idCategoria);
			axios({
				method: 'post',  
				url: 'eve/evento',
				data: data,
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data'
				}
			})
			.then(e => {
					console.log(e.data)
					if(e.data.status) {
						this.props.navigation.navigate("Home")
						Toast.show("Evento Creado")
						this.setState({loading:false})
					}else{
						Toast.show("Houston tenemos un problema, intentalo mas rato")
						this.setState({loading:false})
					}
			})
			.catch(err=>{
				this.setState({loading:false})
			})
		}
 	}
}

const mapState = state => {
	return {
		categorias: state.categoria.categorias,
	};
};
  
const mapDispatch = dispatch => {
	return {
		getCategorias: () => {
			dispatch(getCategorias());
		},
	};
};
  
NuevoEvento.defaultProps = {
	categorias:[],
};
  
NuevoEvento.propTypes = {
	categorias: PropTypes.array.isRequired
};
  
export default connect(
	mapState,
	mapDispatch
)(NuevoEvento);
  