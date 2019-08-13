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
	getByIdWidthUsuarios(_id, callback){
		Evento.findOne({_id}).populate("mensajes").populate("usuario").exec(callback)
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
	getEventosMensajes(idUsuario, callback){
		idUsuario = mongoose.Types.ObjectId(idUsuario);	
		Evento.aggregate([
			{
				$match:{
					$or:[
							{usuario: idUsuario},
							{mensajes:idUsuario},
					]
				}
			},
			///////////////////////		USUARIO QUE CREO EL PLAN
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
				 preserveNullAndEmptyArrays: false
			 }
		 },
		 ///////////////////////		USUARIO QUE HACE LA PREGUNTA
		 {
			$lookup: {
				from: "users",
				localField: "mensajes",
				foreignField: "_id",
				as: "UserData1"
			}
		},
		{
			$unwind:{
				path:'$UserData1',
				preserveNullAndEmptyArrays: false
			}
		},
		///////////////////////		MENSAJES
		{
			$lookup: {
				from: "mensajes",
				localField: "_id",
				foreignField: "eventoId",
				as: "MensajeData"
			}
		},
		{
			$unwind:{
				path:'$MensajeData',
				preserveNullAndEmptyArrays: false
			}
		},
		///////////////////////		CATEGORIA
		{
			$lookup: {
				from: "categorias",
				localField: "categoria",
				foreignField: "_id",
				as: "CategoriaData"
			}
		},
		{
			$unwind:{
				path:'$CategoriaData',
				preserveNullAndEmptyArrays: true
			}
		},
		///////////////////////		CAMPOS A MOSTRAR
		{
			$project:{
				_id:1,
				lugar:1,
				fechaFinal:1,
				fechaInicio:1,
				nombre:1,
				imagen:1,
				idUsuario1:'$UserData._id',
				idUsuario2:'$UserData1._id',
				nombre1:'$UserData.nombre',
				nombre2:'$UserData1.nombre',
				categoria:'$CategoriaData.nombre',
			},
		},

	 
		// {
		// 	$sort:{
		// 		orden:-1
		// 	}
		// },
		{
				$group:{
					_id:'$idUsuario2',
					data: { $addToSet: {lugar:"$lugar", fechaFinal:"$fechaFinal", fechaInicio:'$fechaInicio', nombre:'$nombre', idUsuario1:'$idUsuario1', idUsuario2:'$idUsuario2', nombre1:'$nombre1',
					nombre2:'$nombre2', imagen:'$imagen', categoria:'$categoria'}
									},
				}
		},
			
	]	, callback)
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
	 
		Evento.update(
			{ _id: _id }, 
			{ $pull: { meGusta: idUsuario } },
			callback
		);
	}
	agregarUsuarioComentario(_id, idUsuario, callback){
		console.log({_id, idUsuario})
		Evento.update(
			{ _id: _id }, 
			{ $push: { mensajes: idUsuario } },
			callback
		);
	}

}

module.exports = new eventoServices()