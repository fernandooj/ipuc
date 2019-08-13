let express = require('express')
let router = express.Router();
let redis        = require('redis')
let cliente      = redis.createClient()

let mensajeServices = require('../services/mensajeServices.js') 
let eventoServices = require('../services/eventoServices.js') 
let userServices = require('./../services/userServices.js') 
const htmlTemplate = require('../notificaciones/template-email.js')

 
router.get('/', (req,res)=>{
	mensajeServices.get((err, titulo)=>{
		if (!err) {
			res.json({ status: true, titulo }); 
		}else{
			res.json({ status:false, message: err }); 
		}
	})
})
router.get('/byUser/:idUser', (req,res)=>{
	let id = req.params.idUser!="null" ?req.params.idUser :req.session.usuario._id 
	mensajeServices.getByUser(id, (err, mensaje)=>{
		if (!err) {
			res.json({ status: true, mensaje }); 
		}else{
			res.json({ status:false, message: err }); 
		}
	})
})

router.get('/evento/:eventoId', function(req,res){
	mensajeServices.getByEventoId(req.params.eventoId, (err, mensaje)=>{
		if (err) {
			res.json({ status:false, message: err });
		}else{
			eventoServices.getByIdWidthUsuarios(req.params.eventoId, function(err, evento){
				if(err){
					res.json({ status:false, message: err }); 
				}else{
					// let usuario = req.session.usuario.email==venta[0].userData.email ?venta[0].userData2.email :venta[0].userData.email
					res.json({ status: true,   mensaje, evento });
				}
			})
		}
	})
})

router.post('/:eventoId', function(req,res){
	if (!req.session.usuario) {
		res.json({ status:false, message: 'No hay un usuario logueado' }); 
	}else{
		mensajeServices.create(req.body, req.session.usuario._id, req.params.eventoId, function(err, titulo){
			if (!err) {
				eventoServices.getById(req.params.eventoId, (err, evento)=>{
					if (err) {
						res.json({ status:false, message: err }); 
					}else{
						// let text1 = `<font size="5">tienes un nuevo mensaje de ${req.session.usuario.nombre}, contestale lo más pronto posible <br/>${req.body.mensaje}</font>`;
						// let boton = `ver_mensaje`;
						// let text2 = `Héchale una ojeada a los libros que <font size=6 color="#000000">${req.session.usuario.nombre}</font> ha publicado <a href="${req.protocol+'://'+req.get('Host')}/#/usuario/${req.session.usuario._id}">Aqui</a>`
						// let url1  = `#/conversacion/${req.params.conversacionId}`
						
						// htmlTemplate(req, req.body, text1, boton, text2, url1, "Tienes un nuevo mensaje")
						
						//////// envio el badge
						// let data={username:req.body.email}
						 
						// userServices.getEmail(data, (err3, users)=>{
						// 	if(!err3){
						// 		let mensajeJson={
						// 			userId:users._id, 
						// 			badge:1
						// 		}
						// 		cliente.publish('badgeMensaje', JSON.stringify(mensajeJson)) 
								
						// 	}
						// })
						res.json({ status: true, evento });	
					}
				})
				
				
				 
			}else{
				res.json({ status:false, message: err }); 
			}
		})
	}
})
 

module.exports = router;