'use strict';

let Evento   = require('./../models/eventoModel.js');
let moment = require('moment');
let mongoose   = require('mongoose')
class eventoServices {
	get(callback){
		Evento.find({}, callback)
	}
	getById(_id, callback){
		Evento.findOne({_id}).populate("categoria").exec(callback)
	}
	getByUser(usuario, callback){
		Evento.find({usuario, eliminado:false}).sort({_id: 'desc'}).populate("categoria").exec(callback)
	}
	getByIdWidthUsuarios(_id, callback){
		Evento.findOne({_id}).populate("mensajes").populate("usuario").exec(callback)
	}
	getProximos(callback){
		Evento.find({eliminado:false, activo:true}).sort({fechaInicio :1}).populate("categoria").exec(callback)
	}
	getByCategoria(lat, lng, categoria, callback){
		categoria = mongoose.Types.ObjectId(categoria);	
		Evento.aggregate([
			{
				$geoNear: {
						near: { type: "Point", coordinates: [parseFloat(lng),  parseFloat(lat) ] },
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
			{
				$match:{ 
					eliminado:false,
					activo:true
				},
			},
		], callback)
  }
  getCercanos(lat, lng, callback){
		Evento.aggregate([
		    {
		    	$geoNear: {
			        near: { type: "Point", coordinates: [  parseFloat(lng) ,  parseFloat(lat) ] },
							distanceField: "distancia",
			      	query: {  activo:true, eliminado:false },
			        maxDistance: 300000,
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
			{
				$match:{ 
					eliminado:false,
					activo:true
				},
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
		let creado = moment.tz(moment(), 'America/Bogota|COT|50|0|').format('YYYY/MM/DD h:mm:ss')
		creado =     moment(creado).subtract(5, 'hours').format('YYYY/MM/DD h:mm:ss a');
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
		newEvento.creado      =  creado;
		newEvento.save(callback);	
	}
	editar(data, imagen, callback){
		let newImagen = []
		newImagen.push(imagen)
		console.log({newImagen})
		let fechaEditado = moment.tz(moment(), 'America/Bogota|COT|50|0|').format('YYYY/MM/DD h:mm:ss')
		fechaEditado =     moment(fechaEditado).subtract(5, 'hours').format('YYYY/MM/DD h:mm:ss a');
		let loc = {'type':'Point', "coordinates": [parseFloat(data.lng), parseFloat(data.lat)] }
		Evento.findByIdAndUpdate(data._id, {$set: {
			'nombre'		  :data.nombre,
			'descripcion' :data.descripcion,
			'fechaInicio' :moment(data.fechaInicio).valueOf(),
			'fechaFinal'  :moment(data.fechaFinal).valueOf(),
			'lugar'			  :data.lugar,
			'categoria'	  :data.categoria,
			'imagen'		  :newImagen,
			'loc'				  :loc,
			'fechaEditado':fechaEditado
		}}, callback);
	}
	like(_id, idUsuario, callback){
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
		Evento.update(
			{ _id: _id }, 
			{ $push: { mensajes: idUsuario } },
			callback
		);
	}
	eliminar(_id, callback){
		Evento.findByIdAndUpdate(_id, {$set: {
			'eliminado':true
		}}, callback);
	}

}

module.exports = new eventoServices()