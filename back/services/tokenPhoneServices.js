'use strict';

let TokenPhone = require('./../models/tokenPhoneModel.js');
let moment = require('moment-timezone');

class tokenPhoneServices {
  constructor(){

	}
  getAll(callback){
		TokenPhone.find({}).sort({_id: 'desc'}).exec(callback)
  }
  getByToken(tokenPhone, callback){
		TokenPhone.findOne({tokenPhone}).exec(callback)
	}
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////	OBTENGO LOS TOKEN MAS CERCANOS A LOS PLANES, ASI CUANDO SE CREA UN PLAN, LE ENVIO LA NOTIFICACION QUE YA ESTA 
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	getNear(lat, lng, callback){
		TokenPhone.aggregate([
			{
				$geoNear: {
					near: { type: "Point", coordinates: [  parseFloat(lng) ,  parseFloat(lat) ] },
					distanceField: "distancia",
					query: { showNotificacion:true },
					maxDistance: 50000,	
					spherical: true
				}
			},
			{
				$sort:{
					area:-1,
					createdAt:-1
				}
			},
		]	, callback)
	}
	
	create(data, callback){ 
		let loc = {'type':'Point', "coordinates": [parseFloat(data.lng), parseFloat(data.lat)] }
		let creado = moment().tz("America/Bogota").format('YYYY-MM-DD h:mm:ss')
		var newTokenPhone = new TokenPhone() 
		newTokenPhone.tokenPhone = data.tokenPhone,
		newTokenPhone.loc        = loc,
		newTokenPhone.creado     = creado
		newTokenPhone.save(callback);	 
	}
	editarLoc(_id, data, callback){
		let loc = {'type':'Point', "coordinates": [parseFloat(data.lng), parseFloat(data.lat)] }
		TokenPhone.findByIdAndUpdate(_id, {$set: {
			'loc':loc
		}}, callback) ;
	}
	updateEstado(_id, showNotificacion, callback){
		let update = moment().tz("America/Bogota").format('YYYY-MM-DD h:mm:ss')
		TokenPhone.findByIdAndUpdate(_id, {$set: {
			'showNotificacion':showNotificacion,
			'update':update
		}}, callback) ;
	}
}

module.exports = new tokenPhoneServices()