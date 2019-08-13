'use strict';

let User   = require('./../models/userModel.js');
let moment = require('moment');
let fecha  =  moment().format('YYYY-MM-DD h:mm:ss')
class userServices {
	get(callback){
		User.find({}, callback)
	}
	getByUsername(username, callback){
		User.findOne({username}, callback)
	}
	getById(_id, callback){
		User.findOne({_id}, callback)
	}
	getEventos(_id, callback){
		User.findOne({_id}).populate("Eventos").exec(callback)
	}
	create(user, token, callback){ 
		var newUsuario = new User() 
		newUsuario.username  = user.username,
		newUsuario.pais  	 = user.pais,
		newUsuario.ciudad  	 = user.ciudad,
		newUsuario.tokenPhone= user.tokenPhone,
		newUsuario.token  	 = token,
		newUsuario.activo 	 = user.tipo ?true :false,  /// si el tipo es facebook/google se activa automaticamente
		newUsuario.acceso    = 'suscriptor';
		newUsuario.tipo      = user.tipo
		newUsuario.save(callback);	 
	}
	modificaToken(data, code, callback){
		User.findOne({'username':data.username}, function(err, user){
			User.findByIdAndUpdate(user._id, {$set:{
				'token':code
			}}, callback );	
		})
	}
	verificaToken(data, callback){
		User.findOne({'username':data.username, 'token': data.token}, callback)
	}
	cambioEstado(username, estado, callback){
		User.findOne({'username':username}, function(err, data){
			User.findByIdAndUpdate(data._id, {$set:{
				'activo':estado
			}}, callback );	
		})
	}
	editar(user, id, callback){
		User.findByIdAndUpdate(id, {$set: {
			'nombre':   	  user.nombre,
			'apellido':   	  user.apellido,
			'updatedAt':     moment(fecha).valueOf()
		}}, callback);
	}
	editPassword(id, password, callback){
		let newUsuario = new User();
		User.findByIdAndUpdate(id, {$set: {
			'password': 	 newUsuario.generateHash(password),
			'updatedAt':     moment(fecha).valueOf()
		}}, callback);
	}
	////// cada vez ue el usuario hace login edito la informacion que me devuelve facebook o google
	modificaUsuarioRedes(_id, data, callback){
		User.findByIdAndUpdate(_id, {$set:{
			'tokenPhone':data.tokenPhone,
			'nombre':data.nombre,
			'avatar':data.avatar,
			'token':data.token,
		}}, callback );	
	}
	modificaTokenPhone(id, tokenPhone, callback){
		User.findByIdAndUpdate(id, {$set:{
			'tokenPhone':tokenPhone
		}}, callback );	
	}

	// tipo(user,callback){
	// 	User.findByIdAndUpdate(user.id, {$set: {
	// 	    'tipo':       user.tipo,
	// 	    'estado': 	  user.estado,
	// 	    'updatedAt':  moment(fecha).valueOf()
	// 	}}, callback);
	// }


 
	 

	// estadoUsuario(user, activo, callback){
	// 	User.findOne({ 'username' :  user }, function(error, user) {
	// 		User.findByIdAndUpdate(user._id, {$set: {
    //             'activo':activo
    //         }}, callback);
	// 	})
	// }
	avatar(id, avatar, callback){
		User.findByIdAndUpdate(id, {$set: {
            avatar     : avatar,
            'updatedAt': moment(fecha)
        }}, callback)
	}
	guardarEvento(_id, idEvento, callback){
		console.log({_id, idEvento})
		User.update(
			{ _id: _id }, 
			{ $push: { Eventos: idEvento } },
			callback
		);
	}
	eliminarEvento(_id, idEvento, callback){
		console.log({_id, idEvento})
		User.update(
			{ _id: _id }, 
			{ $pull: { Eventos: idEvento } },
			callback
		);
	}


}

module.exports = new userServices()