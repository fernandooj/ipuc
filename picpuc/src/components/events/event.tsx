import React, {Fragment, ReactElement} from 'react';
import {ScrollView, View} from 'react-native';
import {EventStyled} from './styles';
import Icon from 'react-native-vector-icons/Fontisto';
import moment from 'moment';
import 'moment/locale/es';
const {
  ContainList,
  TextAssistants,
  ListCategories,
  Title,
  SubTitle,
  BtnAsist,
  TextAsist,
  DateContent,
  TextDate,
  IconArrow,
} = EventStyled;

interface EventType {
  title: string;
  place_name: string;
  event_date: string;
  assistants: number;
  going: Boolean;
  distance_km: number;
}

const renderItem = (
  {title, assistants, place_name, event_date, distance_km}: EventType,
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
      <Icon name="map" size={14} color="#00338D" />
      <SubTitle>{place_name}</SubTitle>
    </DateContent>
    <DateContent>
      <Icon name="date" size={14} color="#00338D" />
      <TextDate>
        {moment(event_date).locale('es').format('DD MMMM, HH:mm')}
      </TextDate>
    </DateContent>
    <BtnAsist distance={distance_km <= 5}>
      <TextAsist>Estas a: {distance_km && distance_km.toFixed(2)} Km</TextAsist>
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

const EventList = ({events}: {events: EventType[]}) => (
  <ContainList>
    {events.map((e, index) => (
      <Fragment key={index}>
        <View style={{width: '50%'}}>{renderItem(e, index)}</View>
      </Fragment>
    ))}
  </ContainList>
);

const EventComponent = ({events}: {events: EventType[]}): ReactElement => {
  return (
    <ScrollView>
      <EventList events={events} />
    </ScrollView>
  );
};

export default EventComponent;
