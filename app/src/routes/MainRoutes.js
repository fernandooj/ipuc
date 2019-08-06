import React, { Component } from 'react'
import { Dimensions} 	  from 'react-native'
import { createDrawerNavigator }		  from 'react-navigation'



//////////////////////////////////////////////////////////////////////////////////////////
//////  IMPORTO LOS COMPONENTES
//////////////////////////////////////////////////////////////////////////////////////////
import homeComponent   		 from '../pages/home/home';
import perfilComponent 		 from '../pages/perfil/perfil';
import editarPerfilComponent from '../pages/editarPerfil/editarPerfil';
import nuevoEventoComponent  from '../pages/nuevoEvento/nuevoEvento';
import eventoMapaComponent   from '../pages/eventoMapa/eventoMapa';
import eventosComponent   	 from '../pages/eventos/eventos';
 
const win = Dimensions.get('window');
 
class MainRoutes extends Component{
	constructor(props){
		super(props)
		this.state={
			user:{},

		}
 	}
  	componentWillMount(){
 		 
 
	}
	componentDidMount(){
	 
	}
	render(){
		const NavigationApp = createDrawerNavigator({
			Home:        {screen: homeComponent},
			Perfil:      {screen: perfilComponent},
			editarPerfil:{screen: editarPerfilComponent},
			nuevoEvento :{screen: nuevoEventoComponent},
			eventoMapa  :{screen: eventoMapaComponent},
			eventos 	:{screen: eventosComponent},
		},{ headerMode: 'none'})
	     
		return (
			<NavigationApp />
		)
	}
} 
export default MainRoutes

 