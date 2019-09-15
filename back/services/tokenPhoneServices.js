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
}

module.exports = new tokenPhoneServices()