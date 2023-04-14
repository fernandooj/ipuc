import React, {
  Fragment,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Text, TextInput, View, ScrollView} from 'react-native';
import axios from 'axios';
import {EventStyled} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

// import {events} from "../../../__mocks__/events/event.json"

const {
  InputSearch,
  ListCategories,
  ListCategoriesText,
  Contain,
  Title,
  InputSearchBox,
  Gradient,
} = EventStyled;


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



const events = [
  {
    title: 'el mejor evento de todos',
    eventDate: '29-diciembre',
    namePlace: 'casa de la moneda',
    goin: true,
  },
  {
    title: 'el mejor evento de todos',
    eventDate: '29-diciembre',
    namePlace: 'casa de la moneda',
    going: false,
  },
  {
    title: 'el mejor evento de todos',
    eventDate: '29-diciembre',
    namePlace: 'casa de la moneda',
    goin: true,
  },
];

const SlideEvents = (): ReactElement => {
  const renderItem = ({ title }: { title: string }) => (
    <View style={ListCategories}>
      <Text style={ListCategoriesText}>{title}aaa</Text>
    </View>
  );

  const EventList = () => (
    <Contain horizontal>
      {events.map((e, index) => (
        <Fragment key={index}>{renderItem(e)}</Fragment>
      ))}
    </Contain>
  );

  return (
    <Contain>
      <LinearGradient colors={['#E5F6FE', '#E7F5FC']} style={Gradient}>
        <EventList />
      </LinearGradient>
    </Contain>
  );
};

export default SlideEvents;

