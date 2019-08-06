'use strict';

let Evento   = require('./../models/eventoModel.js');
let moment = require('moment');
let mongoose   = require('mongoose')
class eventoServices {
	get(callback){
		Evento.find({}, callback)
	}
	getById(_id, callback){
		Evento.findOne({_id}, callback)
	}
	getByCategoria(lat, lng, categoria, callback){
		categoria = mongoose.Types.ObjectId(categoria);	
		Evento.aggregate([
			{
				$geoNear: {
						near: { type: "Point", coordinates: [  parseFloat(lng) ,  parseFloat(lat) ] },
						distanceField: "distancia",
						query: {  activo:true, eliminado:false, categoria },
						maxDistance: 300000,
						num: 1000,
						spherical: true
				}
			},
			{
				$sort:{
					area:-1,
					createdAt:-1
				}
			},
			{
			 $lookup: {
				 from: "users",
				 localField: "usuario",
				 foreignField: "_id",
				 as: "UserData"
			 }
		 },
		 {
			 $unwind:{
				 path:'$UserData',
				 preserveNullAndEmptyArrays: true
			 }
		 },
			
	]	, callback)
  }
  getCercanos(lat, lng, callback){
		Evento.aggregate([
		    {
		    	$geoNear: {
			        near: { type: "Point", coordinates: [  parseFloat(lng) ,  parseFloat(lat) ] },
							distanceField: "distancia",
			      	query: {  activo:true, eliminado:false },
			        maxDistance: 300000,
			        num: 1000,
			        spherical: true
			    }
		    },
		    {
		    	$sort:{
		    		area:-1,
		    		createdAt:-1
		    	}
		    },
		    {
	 			$lookup: {
	 				from: "users",
	 				localField: "usuario",
	 				foreignField: "_id",
	 				as: "UserData"
	 			}
	 		},
	 		{
	 			$unwind:{
	 				path:'$UserData',
	 				preserveNullAndEmptyArrays: true
	 			}
	 		},
	 		 
		], callback)
	}
	create(data, usuario, imagen, lat, lng, callback){ 
  	let loc = {'type':'Point', "coordinates": [parseFloat(lng), parseFloat(lat)] }
		let newEvento         = new Evento() 
		newEvento.nombre      =  data.nombre;
		newEvento.descripcion =  data.descripcion;
		newEvento.fechaInicio =  moment(data.fechaInicio).valueOf();
		newEvento.fechaFinal  =  moment(data.fechaFinal).valueOf();
		newEvento.lugar       =  data.lugar;
		newEvento.categoria   =  data.categoria;
		newEvento.imagen      =  imagen;
		newEvento.loc         =  loc;
		newEvento.usuario     =  usuario;
		newEvento.save(callback);	
	}
	like(_id, idUsuario, callback){
		console.log({_id, idUsuario})
		Evento.update(
			{ _id: _id }, 
			{ $push: { meGusta: idUsuario } },
			callback
		);
	}
	unLike(_id, idUsuario, callback){
		console.log({_id, idUsuario})
		Evento.update(
			{ _id: _id }, 
			{ $pull: { meGusta: idUsuario } },
			callback
		);
	}

}

module.exports = new eventoServices()