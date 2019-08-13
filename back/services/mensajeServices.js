///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let Mensaje = require('./../models/mensajeModel.js');
let moment = require('moment-timezone');

//////////////////////////////////////////////////////////////////////////////
////////******     creo la clase que hace los servicios        ****//////////
/////////////////////////////////////////////////////////////////////////////

class mensajeServices{
	constructor(){

	}
	get(callback){
		Mensaje.find({}, callback)
	}
	getByEventoId(id, callback){
		Mensaje.find({eventoId:id}).populate('usuarioId').sort({_id: 'desc'}).exec(callback)
	}
	getByUser(usuarioId, callback){
		Mensaje.find({usuarioId}).populate('usuarioId').sort({_id: 'desc'}).exec(callback)
	}
	create(data, usuarioId, eventoId, callback){
		let creado = moment().tz("America/Bogota").format('YYYY-MM-DD h:mm:ss a')
		console.log(creado)
		let newMensaje = new Mensaje({
			mensaje  : data.mensaje,
			usuarioId,
			eventoId,
			creado
		})
		newMensaje.save(callback)	
	}
 
}

module.exports = new mensajeServices();