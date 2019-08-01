import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, Modal} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-fa-icons' 
 
import {style}   from './style'

export default class tomarPhoto extends Component{
    state={
        imagenes:[]
    }
    subirImagen(){
        let {imagenes} = this.state
        const options = {
            compressImageMaxWidth:800,
            compressImageMaxHeight:800,
            width: 800,
            height: 800,
            forgeJpg: true,
            cropping: true,
            compressImageQuality:0.5
        };
       
        ImagePicker.openPicker(options).then(response => {
		    if (response) {
				let source = { uri: response.path };
			    let imagen = {
				    uri:  response.path,
				    type: response.mime ?response.mime :'image/jpeg',
				    name: response.fileName ?response.fileName :`imagen.jpg`,
				    path: response.path
                };
                
                imagenes.push(imagen)
			    this.setState({ imagenes, showModal:false, isAndroidShareOpen:false });
                this.props.imagenes(imagenes)
			}
		});
    }
    tomarFoto(){
        let {imagenes} = this.state
        const options = {
            compressImageMaxWidth:800,
            compressImageMaxHeight:800,
            width: 800,
            height: 800,
            cropping: true,
            forgeJpg: true,
        };
        ImagePicker.openCamera(options).then(response => {
            
            if (response) {
				let source = { uri: response.path };
			    let imagen = {
				    uri:  response.path,
				    type: response.mime ?response.mime :'image/jpeg',
				    name: response.fileName ?response.fileName :`imagen.jpg`,
				    path: response.path
				};
                imagenes.push(imagen)
			    this.setState({ imagenes, showModal:false, isAndroidShareOpen:false });
                this.props.imagenes(imagenes)
			}
		 });
		
	}
	renderImagenes(){
        return  this.state.imagenes.map((e, key)=>{
            return(
                <View key={key}>
                    <Image source={{uri:e.uri}} style={style.imagenesFotos} />
                    <Icon name={'trash'} style={style.iconTrash} onPress={()=>this.eliminarImagen(key)}/>
                </View>
            )
        })
    }
    eliminarImagen(keyImagen){
        let imagenes = this.state.imagenes.filter((e, key)=>{return key!=keyImagen })    
        this.setState({imagenes})    
        this.props.imagenes(imagenes)
    }
    renderModal(){
        const {tipoMensaje, cerrar} = this.props
        return(
            <Modal
                transparent
                visible={this.state.isAndroidShareOpen}
                animationType="fade"
                onRequestClose={() => {}}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {  tipoMensaje ?cerrar() :this.setState({  isAndroidShareOpen: false });   }}
                    style={style.btnModal}
                >
                    <View style={style.contenedorModal}>
                        <TouchableOpacity style={style.btnOpcionModal} onPress={()=>{this.subirImagen()}}>
                            <Text style={style.textModal}>Subir Imagen</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.btnOpcionModal} onPress={()=>{this.tomarFoto()}}>
                            <Text style={style.textModal}>Tomar Foto</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    /*
        TIPOMENSAJE == cuando la foto es para el chat, no muestra, la opcion de tomar foto, si no que muestra directamente el modal
    */
    render(){
        const {imagenes, showModal} = this.state
        const {width, avatar, limiteImagenes} = this.props
 
        return(
            <View style={style.contenedorPortada}>
                {
                    showModal
                    &&this.renderModal()
                }
                {
                    imagenes.length<limiteImagenes
                    &&<TouchableOpacity style={[style.contenedorUploadPortada, {width}]} onPress={() => this.setState({showModal:true, isAndroidShareOpen:true}) }>
                        <Icon name={'camera'} style={style.iconPortada} />
                        <Text style={style.textPortada}> {!avatar ?"Imagen" :"Avatar"}</Text>
                        {!avatar &&<Text style={style.textPortada2}>Sube al menos 1 imagen</Text>}
                    </TouchableOpacity>
                }
                {
                    <View style={{flexDirection:"row", top:15}}>
                        {this.renderImagenes()}
                    </View>
                }
            </View>	
        )
    }
}