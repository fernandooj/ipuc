import React, {Component} from 'react'
import TomarFoto 			from "../components/tomarFoto";
import DatePicker 			from 'react-native-datepicker'

export class formulario extends Commponent{
    renderFormulario(){
		const {nombre, descripcion, fechaHoy, fechaInicio, fechaFinal, cargaPlan, lat, lng, direccion, mapa, imagenes, loading} = this.state
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
							color: '#8F9093'
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
							color: '#8F9093'
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
				<TouchableOpacity onPress={() => {loading ?null :this.handleSubmit()}} style={style.btnEnviar}>
					<Text style={style.textEnviar}>{loading ?"GUARDANDO"  :"GUARDAR"}</Text>
					{loading &&<ActivityIndicator size="small" color="#fff" />}
				</TouchableOpacity> 
			</View>
		)
	}
} 