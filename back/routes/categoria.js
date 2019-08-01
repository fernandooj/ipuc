'use strict'


let express = require('express')
let router = express.Router();
let fs 		   = require('fs');
let Jimp       = require("jimp");
let {promisify} = require('util');
let moment     = require('moment');
let fecha 	   = moment().format('YYYY_MM_DD_h_mm')
let sizeOf    		   = promisify(require('image-size'));
let categoriaServices = require('./../services/categoriaServices.js') 
 

router.get('/', (req, res)=>{
	categoriaServices.get((err, categoria)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			res.json({status:'SUCCESS', categoria, code:1})    
		}
	})
})

 
const ubicacionJimp =  '../front/docs/uploads/categorias/'
router.post('/', (req, res)=>{
	if (!req.session.usuario) {
		res.json({status:'FAIL', mensaje:'sin login', code:0}) 
	}else{
		let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
		
		////////////////////    ruta que se va a guardar en el folder
		let fullUrlimagenOriginal = '../front/docs/uploads/categorias/Original'+fecha+'_'+randonNumber+'.jpg'
	 
		////////////////////    ruta que se va a guardar en la base de datos
		let ruta  = req.protocol+'://'+req.get('Host') + '/uploads/categorias/--'+fecha+'_'+randonNumber+'.jpg'
		
		///////////////////     envio la imagen al nuevo path
		let rutaJim  = req.protocol+'://'+req.get('Host') + '/uploads/categorias/Original'+fecha+'_'+randonNumber+'.jpg'
		fs.rename(req.files.imagen.path, fullUrlimagenOriginal, (err)=>{console.log(err)})


		categoriaServices.create(req.body.nombre, ruta, (err, categoria)=>{
			if (err) { 
				res.json({status:'FAIL', err, code:0})    
			}else{
				resizeImagenes(rutaJim, randonNumber, "jpg", res)
			}
		})
	}
})

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
			res.json({status:'SUCCESS',  code:1})    
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

module.exports = router