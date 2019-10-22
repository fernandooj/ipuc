'use strict'


let express = require('express')
let router = express.Router();
let fs 		   = require('fs');
let Jimp       = require("jimp");
let {promisify} = require('util');
let moment 		   = require('moment-timezone');
let fecha 	   	   = moment().format('YYYY_MM_DD_h_mm')

let sizeOf    	    = promisify(require('image-size'));
const eventoServices  = require('./../services/eventoServices.js') 
const mensajeServices = require('../services/mensajeServices.js') 
const tokenPhoneServices = require('../services/tokenPhoneServices.js')
const notificacionPush 	 = require('../notificaciones/notificacionPush')

router.get('/', (req, res)=>{
	eventoServices.get((err, evento)=>{
		if (err) {
			res.json({status:false, err, code:0})    
		}else{
			res.json({status:true, evento, code:1})    
		}
	})
})

router.get('/byId/:id', (req, res)=>{
	eventoServices.getById(req.params.id, (err, evento)=>{
		if (err) {
			res.json({status:false, err, code:0})    
		}else{
			res.json({status:true, evento, code:1})    
		}
	})
})


///////////////////////////////////////////////////////////////////////////
/*
Llamo a los eventos creados por el usuario logueado
*/
///////////////////////////////////////////////////////////////////////////
router.get('/byUser', (req, res)=>{
	if(req.session.usuario){
		eventoServices.getByUser(req.session.usuario._id, (err, eventos)=>{
			if (err) {
				res.json({status:false, err, code:0, eventos:[]})    
			}else{
				res.json({status:true, eventos, code:1})    
			}
		})
	}else{
		res.json({status:false, message:"SIN LOGIN", code:0, eventos:[]})    
	}
})

///////////////////////////////////////////////////////////////////////////
/*
Llamo a los eventos con chats de cada usuario
*/
///////////////////////////////////////////////////////////////////////////
router.get('/getEventosMensajes', (req, res)=>{
	if(req.session.usuario){
		eventoServices.getEventosMensajes(req.session.usuario._id, (err, evento)=>{
			if (err) {
				res.json({status:false, err, code:0})    
				
			}else{
				res.json({status:true, total: evento.length, id:req.session.usuario._id, evento, code:1})    
			}
		})
	}else{
		res.json({status:false, mensaje:"sin Login", evento:[], code:0})    
	}
})


///////////////////////////////////////////////////////////////////////////
/*
Llamo a los eventos mas cercanos
*/
///////////////////////////////////////////////////////////////////////////
router.get('/cercanos/:lat/:lng', (req, res)=>{
	eventoServices.getCercanos(req.params.lat, req.params.lng, (err, evento)=>{
		if (err) {
			res.json({status:false, err, code:0})    
			 
		}else{
			res.json({status:true, evento, code:1})    
		}
	})
})

///////////////////////////////////////////////////////////////////////////
/*
Llamo a los eventos por categoria, con orden de los mas cercanos
*/
///////////////////////////////////////////////////////////////////////////
router.get('/byCategoria/:idCategoria/:lat/:lng', (req, res)=>{
	let {idCategoria, lat, lng} = req.params
	
	idCategoria !="undefined"
	?eventoServices.getByCategoria(lat, lng, idCategoria, (err, evento)=>{
		if (err) {
			res.json({status:false, err, code:0})    
		}else{
			 
			res.json({status:true, evento, code:1})    
		}
	})
	:eventoServices.getCercanos(lat, lng, (err, evento)=>{
		if (err) {
			res.json({status:false, err, code:0})    
		}else{
			 
			res.json({status:true, evento, code:1})    
		}
	})
})


///////////////////////////////////////////////////////////////////////////
/*
Llamo a los cercanos por fecha
*/
///////////////////////////////////////////////////////////////////////////
router.get('/proximos', (req, res)=>{ 
	eventoServices.getProximos((err, eventos)=>{
		if (err) {
			res.json({status:false, err, code:0})    
		}else{
			res.json({status:true, eventos, code:1})    
		}
	})
})


///////////////////////////////////////////////////////////////////////////
/*
cuando un usuario le gustas un evento agrego su id
*/
///////////////////////////////////////////////////////////////////////////
router.post('/like', (req,res)=>{
	if(req.session.usuario){
		eventoServices.getById(req.body.id, (err, evento)=>{
			 console.log(req.session.usuario)
			if(evento){
				let esSeguidor = isInArray(req.session.usuario._id, evento.meGusta)
				if(!esSeguidor){
					eventoServices.like(req.body.id, req.session.usuario._id, (err, eventos)=>{
						if(!err){
							res.json({status:true, evento})
						}else{
							res.json({ status: false, err}) 
						}
					})
				}else{
					res.json({ status: false, err:"ya es seguidor"}) 
				}
			}
		})
	}else{
		res.json({ status: false, message:'usuario no logueado'})  
	}
})

///////////////////////////////////////////////////////////////////////////
/*
eliminar un usuario que le gusta un evento
*/
///////////////////////////////////////////////////////////////////////////
router.post('/unLike', (req,res)=>{
	if(req.session.usuario){
		eventoServices.unLike(req.body.id, req.session.usuario._id, (err, evento)=>{
			if(!err){
				res.json({status:true, evento})
			}else{
				res.json({ status: false, err}) 
			}
		})
	}else{
		res.json({ status: false, message:'usuario no logueado'})  
	}
})

///////////////////////////////////////////////////////////////////////////
/*
eliminar un evento
*/
///////////////////////////////////////////////////////////////////////////
router.delete('/eliminar/:id', (req,res)=>{
	if(req.session.usuario){
		eventoServices.eliminar(req.params.id, (err, evento)=>{
			if(!err){
				res.json({status:true, evento})
			}else{
				res.json({ status: false, err}) 
			}
		})
	}else{
		res.json({ status: false, message:'usuario no logueado'})  
	}
})


///////////////////////////////////////////////////////////////////////////
/*
eliminar un usuario que le gusta un evento
*/
///////////////////////////////////////////////////////////////////////////
router.post('/agregarComentario', (req,res)=>{
	if(req.session.usuario){
		eventoServices.getById(req.body.idEvento, (err, evento)=>{
			if(evento){
				
				let yaEnvioMensaje = isInArray(req.session.usuario._id, evento.mensajes) /// esto verifica si ya ha enviado un mensaje
				
				if(!yaEnvioMensaje){
					eventoServices.agregarUsuarioComentario(req.body.idEvento, req.session.usuario._id, (err2, evento)=>{
						if(!err2){
							mensajeServices.create(req.body, req.session.usuario._id, req.body.idEvento, (err3, titulo)=>{
								if(!err3){
									res.json({ status: true, err}) 
								}
							})
						}
					})
				}else{
					mensajeServices.create(req.body, req.session.usuario._id, req.body.idEvento, (err3, titulo)=>{
						if(!err3){
							res.json({ status: true, err}) 
						}
					})
				}
				
			}
		})
	}else{
		res.json({ status: false, message:'usuario no logueado'})  
	}
})


	
const ubicacionJimp =  '../front/docs/uploads/eventos/'
router.post('/', (req, res)=>{
	if (!req.session.usuario) {
		res.json({status:false, mensaje:'sin login', code:0}) 
	}else{
        let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
		
		////////////////////    ruta que se va a guardar en el folder
		let fullUrlimagenOriginal = '../front/docs/uploads/eventos/Original'+fecha+'_'+randonNumber+'.jpg'
	 
		////////////////////    ruta que se va a guardar en la base de datos
		let ruta  = req.protocol+'://'+req.get('Host') + '/uploads/eventos/--'+fecha+'_'+randonNumber+'.jpg'
		
		///////////////////     envio la imagen al nuevo path
		let rutaJim  = req.protocol+'://'+req.get('Host') + '/uploads/eventos/Original'+fecha+'_'+randonNumber+'.jpg'
		fs.rename(req.files.imagen.path, fullUrlimagenOriginal, (err)=>{console.log(err)})

        let lat = req.body.lat
        let lng = req.body.lng
		eventoServices.create(req.body, req.session.usuario._id, ruta, lat, lng, (err, evento)=>{
			if (err) {
				res.json({status:false, err, code:0})    
			}else{
				enviaNotificacion(req, res, rutaJim, randonNumber)
				
			}
		})
	}
})

///////////////////////////////////////////////////////////////////////////
/*
editar un plan
*/
///////////////////////////////////////////////////////////////////////////
router.put('/', (req, res)=>{
	if (!req.session.usuario) {
		res.json({status:false, mensaje:'sin login', code:0}) 
	}else{
		let ruta;
		let randonNumber;
		let rutaJim;
		if(req.files.imagen){
			randonNumber = Math.floor(90000000 + Math.random() * 1000000)
			
			////////////////////    ruta que se va a guardar en el folder
			let fullUrlimagenOriginal = '../front/docs/uploads/eventos/Original'+fecha+'_'+randonNumber+'.jpg'
		 
			////////////////////    ruta que se va a guardar en la base de datos
			ruta  = req.protocol+'://'+req.get('Host') + '/uploads/eventos/--'+fecha+'_'+randonNumber+'.jpg'
			
			///////////////////     envio la imagen al nuevo path
			rutaJim  = req.protocol+'://'+req.get('Host') + '/uploads/eventos/Original'+fecha+'_'+randonNumber+'.jpg'
			
			fs.rename(req.files.imagen.path, fullUrlimagenOriginal, (err)=>{console.log(err)})
		}else{
			ruta=req.body.imagenGuardado
		}
		console.log({ruta})
        
		eventoServices.editar(req.body, ruta, (err, evento)=>{
			if (err) {
				res.json({status:false, err, code:0})    
			}else{
				req.files.imagen ?resizeImagenes(rutaJim, randonNumber, "jpg", res) :res.json({status:true, err, code:0})    
			}
		})
	}
})


const enviaNotificacion=(req, res, rutaJim, randonNumber)=>{
	tokenPhoneServices.getNear(req.body.lat, req.body.lng, (err, tokens)=>{
		if(!err){
			tokens.map(e=>{
				notificacionPush(e.tokenPhone, "Nuevo evento cerca a ti", req.body.nombre)
			})
		}
		resizeImagenes(rutaJim, randonNumber, "jpg", res)    
	})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// CAMBIO LOS TAMAÑOS DE LAS IMAGENES
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const resizeImagenes = (ruta, randonNumber, extension, res) =>{
	Jimp.read(ruta, (err, imagen)=> {
		if(err){
			return err
		}else{
			imagen.resize(800, Jimp.AUTO)             
			.quality(90)                          
			.write(`${ubicacionJimp}Resize${fecha}_${randonNumber}.${extension}`);
			res.json({status:true,  code:1})    
		}
	});	

	setTimeout(function(){
		sizeOf(`${ubicacionJimp}Resize${fecha}_${randonNumber}.${extension}`)
	    .then(dimensions => { 
		  	let width  = dimensions.width
		  	let height = dimensions.height
		  	let x; 
		  	let y; 
		  	let w; 
		  	let h; 

		  	if (width>height) {
		  		console.log(1)
		  		x = (width*10)/100
			  	y = (width*10)/100
			  	w = (((height*100)/100)-y)
			  	h = (((height*100)/100)-y)
		  	}else{
				x = (height*10)/100
			  	y = (height*10)/100
			  	w = (width*90)/100
			  	h = (width*90)/100
		  	}
		  	
			Jimp.read(ruta, function (err, imagen) {
			    if (err) throw err;
			    imagen.resize(800, Jimp.AUTO)             
				.quality(90)                 
				.crop(x,y,w,h)                
				.write(`${ubicacionJimp}Miniatura${fecha}_${randonNumber}.${extension}`);
			});	
		})
	.catch(err => console.error(err));
	},2000)
}

const isInArray=(value, array)=> {
	return array.indexOf(value) > -1;
}

module.exports = router