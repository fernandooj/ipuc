'use strict';
let nodemailer = require('nodemailer');
let userServices = require('./../services/userServices.js') 
 
let path = require('path');
let randonNumber=null;  /// numero randon que genera el codigo de verificacion, linea 35
let transporter=null;   /// variable que guarda la configuracion para el envio del email
let client = null; 

let fs 		   = require('fs');
let Jimp       = require("jimp");
let {promisify}    = require('util');
let moment         = require('moment');
let fecha 	       = moment().format('YYYY_MM_DD_h_mm')
let sizeOf    	   = promisify(require('image-size'));
const htmlTemplate = require('../notificaciones/template-email.js')
///////////////////////////////////////////////////////////////////////////
/*
    CONFIGURACION DATOS TWILIO
*/
///////////////////////////////////////////////////////////////////////////
// client = require('twilio')( 
//     'ACc03f66d892097da6c1f148866c57c8ef', //TWILIO_ACCOUNT_SID
//     '55f8fa1132e0671bcc3576ab3f3500b3'//TWILIO_AUTH_TOKEN
// ); 

///////////////////////////////////////////////////////////////////////////
/*
    CONFIGURACION DEL CORREO
*/
///////////////////////////////////////////////////////////////////////////
 
module.exports = function(app, passport){
    ///////////////////////////////////////////////////////////////////////////
    /*
    Guardar solo email
    */
    ///////////////////////////////////////////////////////////////////////////

    
    app.post('/x/v1/user/sign_up', (req, res)=>{
        let token = Math.floor(1000 + Math.random() * 9000);
        let tokens = token
        userServices.getByUsername(req.body.email, (err, users)=>{
            let titulo = `<font size="5">Verificación de Email</font>` 
            let text1  = `Hola Estimado/a: este es el codigo: ${token} para verificar su dirección de correo electrónico y completar el registro de su cuenta en Codegas`
            let text2  = `Este vínculo caducará en 24 horas. Si ha caducado, pruebe a solicitar un nuevo correo electrónico de verificación.` 
            let asunto =  "Cuenta creada en Ipuc"
            if (users) {
                if(users.activo){
                    res.json({ status:false, message: 'este email ya existe', code:0 });            
                }else{
                    userServices.modificaToken(users, token, (err2, user)=>{
                        if(!err2){
                            htmlTemplate(req, req.body, titulo, text1, text2,  asunto)
                            res.json({ status: true, message: 'nuevo codigo enviado', code:2, token });     
                        }
                    })       
                }
            }else{
                userServices.create(req.body, token, (err, user)=>{
                    if(err){
                        return res.json({ err })
                    }else{
                        htmlTemplate(req, req.body, titulo, text1, text2, asunto, (err3, email)=>{
                            if(!err3){
                                res.json({ status:true, message: 'usuario registrado', user, code:1, token });     
                            }
                        })
                        
                    }
                })  
            }  
        })
    })


    app.post('/x/v1/user/resend_token', function(req, res){
        if(req.body.tipo==1){
            let mailOptions = {
                from: '<weplanapp@weplanapp.com>',                               
                to: req.body.username,                                         
                subject: 'Registro',                                             
                html:  `Tu codigo de verificacion es:<b> ${randonNumber} </b>`   
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
            });
            res.json({ status: 'SUCCESS', message: 'Codigo enviado', code:1 });
        }else{
            client.api.messages
                .create({
                  body: `Tu codigo es: ${randonNumber}` ,
                  to:  req.body.username,
                  from: '+17328750948',
                }).then(function(data) {
                    res.json({ status: 'SUCCESS', message: 'Codigo enviado', code:1 });
                }).catch(function(err) {
                    res.json({ status: 'ERROR', message: 'no se pudo crear el usuario', code:0 });
            });      
        }
    })





    ///////////////////////////////////////////////////////////////////////////
    /*
    Verifica el token enviado
    */
    ///////////////////////////////////////////////////////////////////////////      
    app.post("/x/v1/user/verificaToken", (req, res)=>{
        userServices.verificaToken(req.body, (err, token)=>{
            if(err){
                res.json({status:false, mensaje:"TOKEN INVALIDO", code:0})
            } else{
                userServices.cambioEstado(req.body.username, true, (err2, user)=>{
                    if (!err2) {
                        req.session.usuario=user
                        res.json({status:true, user, code:1})             
                    }
                })           
            }
        }) 
    })



    ///////////////////////////////////////////////////////////////////////////
    /*
        login 
    */
    ///////////////////////////////////////////////////////////////////////////

    app.post('/x/v1/user/login', (req,res)=>{
        userServices.getByUsername(req.body.username, (err, user)=>{
            if (err) {
                res.json({status:false, err, code:0 })
            }else{
                if(user==null){
                    res.json({status:false, user: 'Usuario no existe', code:2 })
                }else{
                    console.log(req.body.password)
                    if(user.validPassword(req.body.password)){
                        req.session.usuario = user
                        //res.json({status:'SUCCESS', user: user, code:1 })
                        user.tokenPhone!==req.body.tokenPhone  ?modificaTokenPhone(req, res) :res.json({status: 'SUCCESS', user, code:1})
                    }else{
                        res.json({status:false, user: 'Datos incorrectos', code:0 })
                        
                    }     
                }
            }
        })
    });


   ///////////////////////////////////////////////////////////////////////////
    /*
    despues del login siempre modifico ==> tokenphone
    */
    ///////////////////////////////////////////////////////////////////////////
    const modificaTokenPhone = (req, res)=>{
        userServices.modificaTokenPhone(req.session.usuario._id, req.body.tokenPhone, (err, user)=>{
            if (err) {
                res.json({status:'FAIL', err, code:0})    
            }else{
                res.json({status: 'SUCCESS_MODIFICA', user, code:1})
            }
        })
    }

    ///////////////////////////////////////////////////////////////////////////
    /*
    si el login NO FUE exitoso
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/user/loginFail', function(req, res){
        res.json({ status: 'FAIL', message: 'datos incorrectos' });   
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    peticion que verifica si el usuario existe
    */
    ///////////////////////////////////////////////////////////////////////////
    app.post('/x/v1/user/redes', function(req, res){
        userServices.getByUsername(req.body.username, (err, user)=>{   
            if (!user) {
                noExiste(req, res)
            }else{
                req.session.usuario = user
                modificaUsuario(req, res)
            }
        })
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    si el usuario no existe lo creo en redes sociales
    */
    ///////////////////////////////////////////////////////////////////////////
    const noExiste = (req, res)=>{
        req.body["tipoUsername"]=1;
        userServices.create(req.body, req.body.token, (err, user)=>{
            if (err) {
                res.json({status:false, err, code:0})    
            }else{
                req.session.usuario = user
                res.json({status: true, user, code:1})
            }
        })
    }

   

    ///////////////////////////////////////////////////////////////////////////
    /*
    siempre modifico sus datos basicos ==>phone, nombre, tokenphone
    */
    ///////////////////////////////////////////////////////////////////////////
    const modificaUsuario = (req, res)=>{
        userServices.modificaUsuarioRedes(req.session.usuario._id, req.body, (err, user)=>{
            err ?res.json({status:false, err, code:0}) :res.json({status:true, user, code:1})
        })
    }



    ///////////////////////////////////////////////////////////////////////////
    /*
    Accedo al perfil
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/user/perfil', function(req, res){
        !req.session.usuario 
        ?res.json({status:false, user: 'SIN SESION', code:0 }) 
        :res.json({status:true,  user: req.session.usuario, code:1})  
    })

    

    ///////////////////////////////////////////////////////////////////////////
    /*
    lista usuarios
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/users/', (req,res)=>{
        if(req.session.usuario){
            if (req.session.usuario.user.acceso=='superAdmin') {
                userServices.get((err, usuarios)=>{
                    if(!err){
                        usuarios = usuarios.map(e=>{
                            let data = e.data[0].info[0]
                            return{
                                id:e._id,
                                saldo:e.saldo,
                                photo:data.photo,
                                ciudad:data.ciudad,
                                estado:data.estado,
                                nombre:data.nombre,
                                cedula:data.cedula,
                                telefono:data.telefono,
                                likes:e.likes,
                                username:data.username,
                            }
                        })
                        res.json({status:'SUCCESS', usuarios})
                    }else{
                        res.json({ status: 'FAIL', err}) 
                    }
                })
            }else{
                res.json({ status: 'FAIL', message:'No tienes acceso'})
            }
        }else{
            res.json({ status: 'FAIL', message:'usuario no logueado'})  
        }
    })


     

    ///////////////////////////////////////////////////////////////////////////
    /*
    lista usuarios solo activos y suscriptores
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/users/activos', function(req,res){
        if(req.session.usuario){
            userServices.getActivos(function(err, usuarios){
                if(!err){
                    res.json({status:'SUCCESS', usuarios})
                }else{
                    res.json({ status: 'FAIL', err}) 
                }
            })
        }else{
            res.json({ status: 'FAIL', message:'usuario no logueado'})  
        }
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    lista usuarios solo activos y suscriptores / menos mi perfil
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/users/activos/sinPerfil', function(req,res){
        if(req.session.usuario){
            userServices.getActivos(function(err, usuarios){
                if(!err){
                    usuarios = usuarios.filter(e=>{
                        return e._id != req.session.usuario.user._id
                    })
                    res.json({status:'SUCCESS', usuarios})
                }else{
                    res.json({ status: 'FAIL', err}) 
                }
            })
        }else{
           res.json({ status: 'FAIL', mensaje:'sin sesion', usuarios:[], code:2 }); 
        }
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    lista solo un usuario por id
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/users/getOneUser/:id', (req,res)=>{
        if(req.session.usuario){
            userServices.getOneUser(req.params.id, (err, user)=>{
                if(!err){
                    console.log(user)
                    res.json({status:'SUCCESS', user, code:1})
                }else{
                    res.json({ status: 'FAIL', err}) 
                }
            })
        }else{
            res.json({ status: 'FAIL', message:'usuario no logueado'})  
        }
    })


    ///////////////////////////////////////////////////////////////////////////
    /*
    lista solo un usuario por email
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/user/getOneUserEmail/:email', (req,res)=>{
        userServices.getByUsername(req.params.email, (err, user)=>{
            if(!err){
                user ?res.json({status:true, user, code:1}) :res.json({ status:false, mensaje:"no existe usuario",code:0})  
               
            }else{
                res.json({ status:false, err, code:2}) 
            }
        })
    })


    ///////////////////////////////////////////////////////////////////////////
    /*
    Activa / Desactiva
    */
    ///////////////////////////////////////////////////////////////////////////
    app.post('/x/v1/users/', (req,res)=>{
        if(req.session.usuario){
            if (req.session.usuario.user.acceso=='superAdmin') {
                userServices.enableDisable(req.body, (err, usuarios)=>{
                    if(!err){
                        res.json({status:'SUCCESS', usuarios})
                    }else{
                        res.json({ status: 'FAIL', err}) 
                    }
                })
            }else{
                res.json({ status: 'FAIL', message:'No tienes acceso'})
            }
        }else{
            res.json({ status: 'FAIL', message:'usuario no logueado'})  
        }
    })


    
    ///////////////////////////////////////////////////////////////////////////
    /*
    modificar usuarios
    */
    ///////////////////////////////////////////////////////////////////////////
    app.put('/x/v1/user/update/:_id', function(req, res, next){
        
        userServices.editar(req.body, req.params._id, function(err, user1){
            if(err){
                res.json({ status: 'FAIL', message: err}) 
            } else{
                userServices.getByUsername(user1.username, (err, user)=>{
                    if (!err) {
                        req.session.usuario = user
                        res.json({ status: 'SUCCESS', message: 'Usuario Activado', user });    
                    }
                })       
            }
        }) 
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    Avatar 
    */
    ///////////////////////////////////////////////////////////////////////////
    app.post('/x/v1/user/avatar/', function(req, res){
        let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
		
		////////////////////    ruta que se va a guardar en el folder
		let fullUrlimagenOriginal = '../front/docs/uploads/avatar/Original'+fecha+'_'+randonNumber+'.jpg'
	 
		////////////////////    ruta que se va a guardar en la base de datos
		let ruta  = req.protocol+'://'+req.get('Host') + '/uploads/avatar/--'+fecha+'_'+randonNumber+'.jpg'
		
		///////////////////     envio la imagen al nuevo path
		let rutaJim  = req.protocol+'://'+req.get('Host') + '/uploads/avatar/Original'+fecha+'_'+randonNumber+'.jpg'
        fs.rename(req.files.imagen.path, fullUrlimagenOriginal, (err)=>{console.log(err)})
        

        userServices.avatar(req.session.usuario._id, ruta, (err, categoria)=>{
            if (!err) {
                resizeImagenes(rutaJim, randonNumber, "jpg", res)
                
            }else{
                res.json({ status: 'FAIL', message: err }); 
            }
        })
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    ENVIA EL MENSAJE PARA RECUPERAR LA CONTRASEÑA
    */
    ///////////////////////////////////////////////////////////////////////////
    app.post('/x/v1/user/recupera_contrasena', function(req, res){
        userServices.getEmail(req.body, function(err, users){
            randonNumber = Math.floor(1000 + Math.random() * 9000);
            if (users) {
                if(users["estado"]=='activo'){
                    userServices.modificaCodigo(req.body, randonNumber, function(err, user){
                        if(req.body.tipo==1){
                            let mailOptions = {
                                from: '<weplanapp@weplanapp.com>',                              // email del que se envia
                                to:   req.body.username,                                        // al usuario que se la va enviar
                                subject: 'Registro',                                            // mensaje en el sujeto
                                html:  `Tu codigo de verificacion es:<b> ${randonNumber} </b>`  // texto
                            };
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                            });
                            res.json({ status: 'SUCCESS', message: 'Reenvieando mensaje', code:1 });
                        }else{
                            client.api.messages
                                .create({
                                  body: `Tu codigo es: ${randonNumber}` ,
                                  to:  `+57${req.body.username}`,
                                  from: '+17328750948',
                                }).then(function(data) { 
                                    res.json({ status: 'SUCCESS', message: 'Reenvieando el mensaje', code:1 });
                                }).catch(function(err) { 
                                    res.json({ status: 'SUCCESS', message: 'no se pudo enviar el msn', code:0 });
                            });      
                        } 
                    })     
                }else{
                    res.json({ status: 'FAIL', message: 'este usuario esta innactivo', code:3 });    
                }
            }else{
                  res.json({ status: 'FAIL', message: 'este usuario no existe', code:2 });    
            }             
        }) 
    })
 
 
    ///////////////////////////////////////////////////////////////////////////
    /*
    EDITA LA CONTRASEÑA
    */
    ///////////////////////////////////////////////////////////////////////////
    app.put('/x/v1/user/password', function(req, res){
        userServices.editPassword(req.session.usuario._id, req.body.password,  (err, user)=>{
            if (!err) {
                res.json({ status: 'SUCCESS', message: 'Password Actualizado', user, code:1 });
            }else{
                res.json({ status: 'FAIL', message: err, code:0 }); 
            }
        })
    })


      
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/x/v1/user/logout', (req, res)=>{
        req.session.usuario = null;
        // req.session = null;
        console.log(req.session)
        res.json({status: true, message:'sesion terminada', code:1})
    });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// CAMBIO LOS TAMAÑOS DE LAS IMAGENES
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const ubicacionJimp =  '../front/docs/uploads/avatar/'
const resizeImagenes = (ruta, randonNumber, extension, res) =>{
	Jimp.read(ruta, (err, imagen)=> {
		if(err){
			return err
		}else{
			imagen.resize(500, Jimp.AUTO)             
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



}