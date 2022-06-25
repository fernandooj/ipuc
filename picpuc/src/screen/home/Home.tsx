import React, {ReactElement, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import axios from 'axios';
import {Content, title} from './styles'

const HomeScreen = (): ReactElement => {
  const [eventos, setEventos] = useState([])
  const apiEvents = async () => {
    try {
      const {data} = await axios.get("https://j6ptbe97xb.execute-api.us-east-1.amazonaws.com/dev/events/date?order=ASC");
      setEventos(data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    apiEvents()
  }, [])
 
  return (
    <View style={Content}>
      <Text style={title}>titulo</Text>
      <Text style={title}>descripcion</Text>
      <Text style={title}>fecha</Text>
      <Text style={title}>lugar</Text>
      {
        eventos.map(({title, description, nameplace}, key )=>{
          return (
            <View key={key}>
              <Text>{nameplace}</Text>
              <Text>{title}</Text>
            </View>
          )
        }) 
      }

    </View>
  )
  ;
};

export default HomeScreen;
