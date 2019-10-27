'use strict';

/////////////////////////////////////////////////////////////////////////
/***** importo mongoose para el modelado de la base de datos  **********/
/***** importo bcrypt  para la encriptacion de la contraseña  **********/
/////////////////////////////////////////////////////////////////////////
let mongoose = require('mongoose');
let bcrypt   = require('bcrypt-nodejs');
let moment   = require('moment');
let Schema = mongoose.Schema
/////////////////////////////////////////////////////////////////////////
/********** genero la base la coleccion llamada users   ****************/
/////////////////////////////////////////////////////////////////////////
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


let UserSchema = mongoose.Schema({
	created: 	{ type: String },
	updatedAt:  { type: String},
	username:    String,
	nombre:      String,
	apellido:    String,
	pais:        String,
	ciudad:      String,
	tokenPhone:  String,
	avatar: 	 String,
	tipo:        String,
	activo:      Boolean,   //// cuando se crea el usuario es innactivo, se activa al darle clikc al email
	email:       String,
	password:    String,
	token:       String,
	acceso:      String,
	ip:      	 String,
	loc   : 	 [geoSchema],
	Eventos: 	[{ type: Schema.Types.ObjectId, ref:'Evento'}],	//// Ids de los eventos guardados
});

 
/////////////////////////////////////////////////////////////////////////
/********** genero el flash para encriptar la contraseña  **************/
/////////////////////////////////////////////////////////////////////////
UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
UserSchema.methods.validPassword = function(password) {
	if(this.password != null) {
		return bcrypt.compareSync(password, this.password);
	} else {
		return false; 
	}
};


module.exports =  mongoose.model('User', UserSchema) 