import React, {Fragment, ReactElement, useEffect, useState} from 'react';
import {Text, TextInput, View, ScrollView} from 'react-native';
import axios from 'axios';
import {
  Content,
  InputSearch,
  Gradient,
  InputSearchBox,
  ListCategories,
  ListCategoriesBox,
  ListCategoriesText,
  ContentEvents,
  ContentEventsRow,
  TitleEvents
} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import {EventComponent} from '../../components/events/event';

const Categories = [
  {
    id: '1',
    title: 'Convenciones',
  },
  {
    id: '2',
    title: 'Campamentos',
  },
  {
    id: '3',
    title: 'Concierto',
  },
  {
    id: '4',
    title: 'Congreso',
  },
  {
    id: '5',
    title: 'Ayuno',
  },
  {
    id: '6',
    title: 'Vigilia',
  },
];


const events =  [
  {title:"que te pasa pibe", description: "sos un negrito hermos", eventDate: "12-12-2020", image: "https://elheraldo.ipuc.org.co/wp-content/uploads/2020/01/2-1280x640.png"},
  {title:"que te pasa pibe", description: "sos un negrito hermos", eventDate: "12-12-2020", image: "https://elheraldo.ipuc.org.co/wp-content/uploads/2020/01/7.png"},
  {title:"que te pasa pibe", description: "sos un negrito hermos", eventDate: "12-12-2020", image: "https://elheraldo.ipuc.org.co/wp-content/uploads/2020/01/7.png"},
]
const HomeScreen = (): ReactElement => {
  const [eventos, setEventos] = useState([]);
  const apiEvents = async () => {
    try {
      const {data} = await axios.get(
        'https://j6ptbe97xb.execute-api.us-east-1.amazonaws.com/dev/events/date?order=ASC',
      );
      setEventos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    apiEvents();
  }, []);

  const onChangeText = () => {};
  const renderItem = ({title}) => (
    <View style={ListCategories}>
      <Text style={ListCategoriesText}>{title}</Text>
    </View>
  );
  const RenderCategories = () => {
    return (
      <ScrollView horizontal={true} style={ListCategoriesBox}>
        {Categories.map(e => {
          return renderItem(e);
        })}
      </ScrollView>
    );
  };
  return (
    <Fragment>
    <View style={Content}>
      <LinearGradient colors={['#E5F6FE', '#E7F5FC']} style={Gradient}>
        <View style={InputSearchBox}>
          <TextInput
            style={InputSearch}
            onChangeText={onChangeText}
            // value="hola mundo"
            placeholderTextColor="grey"
            placeholder="Buscar Eventos"
          />
          <Icon name="aperture" size={30} color="#F7D78C" />
        </View>
        <RenderCategories />
        </LinearGradient>
        </View>
        <TitleEvents>Cercanos a ti</TitleEvents>
        <ContentEvents horizontal={true}>
          <ContentEventsRow>
            {
              events.map(e=>{
                return EventComponent(e);
              })
            }
          </ContentEventsRow>
        </ContentEvents>

        <TitleEvents>Proximos</TitleEvents>
        <ContentEvents horizontal={true}>
          <ContentEventsRow>
            {
              events.map(e=>{
                return EventComponent(e);
              })
            }
          </ContentEventsRow>
        </ContentEvents>
        </Fragment>  
      
    
  );
};

export default HomeScreen;
