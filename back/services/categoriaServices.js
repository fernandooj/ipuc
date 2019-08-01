'use strict';

let Categoria   = require('./../models/categoriaModel.js');
let moment = require('moment');
let fecha  =  moment().format('YYYY-MM-DD h:mm:ss')
class categoriaServices {
	get(callback){
		Categoria.find({}, callback)
	}
	getById(_id, callback){
		Categoria.find({_id}, callback)
	}
	create(nombre, imagen, callback){ 
		var newCategoria = new Categoria() 
        newCategoria.nombre =  nombre;
        newCategoria.imagen 	= imagen;
        newCategoria.save(callback);	
	}
}

module.exports = new categoriaServices()