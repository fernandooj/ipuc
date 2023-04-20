import React, {Fragment, ReactElement} from 'react';
import {Text, View} from 'react-native';
import {EventStyled} from './styles';
import Icon from 'react-native-vector-icons/Fontisto';

// import {events} from "../../../__mocks__/events/event.json"

const {
  ContainList,
  TextAssistants,
  ListCategories,
  Title,
  BtnAsist,
  TextAsist,
  DateContent,
  TextDate,
  IconArrow,
} = EventStyled;

// const Categories = [
//   {
//     id: '1',
//     title: 'Convenciones',
//   },
//   {
//     id: '2',
//     title: 'Campamentos',
//   },
//   {
//     id: '3',
//     title: 'Concierto',
//   },
//   {
//     id: '4',
//     title: 'Congreso',
//   },
//   {
//     id: '5',
//     title: 'Ayuno',
//   },
//   {
//     id: '6',
//     title: 'Vigilia',
//   },
// ];

const events = [
  {
    title: 'convencion cali',
    eventDate: '29-diciembre',
    namePlace: 'estadio',
    going: true,
    assistants: 35,
    categoria: 1,
    distance: 20,
  },
  {
    title: 'convencion medellin',
    eventDate: '15 enero',
    namePlace: 'iglesia central',
    going: false,
    assistants: 150,
    categoria: 2,
    distance: 20,
  },
  {
    title: 'el mejor evento de todos',
    eventDate: '18 agosto',
    namePlace: 'casa de la moneda',
    going: true,
    assistants: 350,
    distance: 20,
  },
  {
    title: 'el mejor evento de todos',
    eventDate: '30 mayo',
    namePlace: 'casa de la moneda',
    going: true,
    assistants: 1020,
    distance: 1,
  },
  {
    title: 'el mejor evento de todos',
    eventDate: '30 mayo',
    namePlace: 'casa de la moneda',
    going: true,
    assistants: 1020,
    distance: 1
  },
  {
    title: 'el mejor evento de todos en bogota',
    eventDate: '30 mayo',
    namePlace: 'casa de la moneda',
    going: true,
    assistants: 1020,
    distance: 38,
  },
];

interface EventType {
  title: string;
  eventDate: string;
  assistants: number;
  going: Boolean;
  distance: number;
}

const EventComponent = (): ReactElement => {
  const renderItem = (
    {title, assistants, going, eventDate, distance}: EventType,
    index: number,
  ) => (
    <ListCategories
      style={
        index % 2 == 0
          ? {
              borderRightWidth: 1,
              borderRightColor: 'rgba(183, 183, 183, 0.272);',
            }
          : {}
      }>
      <TextAssistants>{assistants} Personas asistiran</TextAssistants>
      <Title>{title}</Title>
      <DateContent>
        <Icon name="date" size={14} color="#00338D" />
        <TextDate>{eventDate}</TextDate>
      </DateContent>
      <BtnAsist distance={distance <= 1}>
        <TextAsist>Estas a: {distance} Km</TextAsist>
        <IconArrow>
          <Icon
            name="arrow-right-l"
            size={14}
            color="#00338D"
            style={{top: -1}}
          />
        </IconArrow>
      </BtnAsist>
    </ListCategories>
);

  const EventList = () => (
    <ContainList horizontal>
      {events.map((e, index) => (
        <Fragment key={index}>
          <View style={{width: '50%'}}>{renderItem(e, index)}</View>
        </Fragment>
      ))}
    </ContainList>
  );

  return (
    <View>
      <EventList />
    </View>
  );
};

export default EventComponent;

