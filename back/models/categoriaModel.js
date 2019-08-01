'use strict';

/////////////////////////////////////////////////////////////////////////
/***** importo mongoose para el modelado de la base de datos  **********/
/***** importo bcrypt  para la encriptacion de la contraseña  **********/
/////////////////////////////////////////////////////////////////////////
let mongoose = require('mongoose');
let moment   = require('moment');
 
/////////////////////////////////////////////////////////////////////////
/********** genero la base la coleccion llamada categoria   ****************/
/////////////////////////////////////////////////////////////////////////
let CategoriaSchema = mongoose.Schema({
	created: { type: String, default: moment().format('YYYY-MM-DD h:mm:ss') },
	nombre:  String,
	imagen:  String,
	icono:  String,
	color:  String,
});

 
 

module.exports =  mongoose.model('Categoria', CategoriaSchema) 