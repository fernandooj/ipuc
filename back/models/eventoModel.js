'use strict';

/////////////////////////////////////////////////////////////////////////
/***** importo mongoose para el modelado de la base de datos  **********/
/***** importo bcrypt  para la encriptacion de la contraseña  **********/
/////////////////////////////////////////////////////////////////////////
let mongoose = require('mongoose');
let moment   = require('moment');
let Schema = mongoose.Schema
//////////////////////////////////////////////////////////////////////////////
/********** genero la base la coleccion llamada categoria   ****************/
//////////////////////////////////////////////////////////////////////////////

const geoSchema = mongoose.Schema({
	type:{
		type:String,
		default:"Point"
	},
	coordinates:{
		type:[Number],
		index:'2dsphere'
	}
})


let eventoSchema = mongoose.Schema({
	creado	   	   : { type: String },
	updatedAt	   : { type: String },
	imagen         : [{ type : String }],
	nombre         : { type : String },
	descripcion    : { type : String },
	fechaInicio    : { type: Number}, 
	fechaFinal     : { type: Number}, 
	lugar          : { type: String},
	loc 		   : geoSchema,
	categoria      : { type: Schema.Types.ObjectId, ref:'Categoria'},
	usuario        : { type: Schema.Types.ObjectId, ref:'User'},
	mensajes       : [{ type: Schema.Types.ObjectId, ref:'User'}],
	meGusta		   : [{ type: Schema.Types.ObjectId, ref:'User'}],
	activo		   : { type : Boolean, default:true},
	eliminado	   : { type : Boolean, default:false},
	fechaEditado   : [{ type: String }],
});

module.exports =  mongoose.model('Evento', eventoSchema) 

// mensajes	son los id de los usuarios que han hecho preguntas