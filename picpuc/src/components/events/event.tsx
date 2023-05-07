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
  image_url: string;
  assistants: number;
  going: boolean;
  distance_km: number;
}

interface Props {
  events: EventType[];
  navigation: any;
}

const randomAttendees: number = Math.floor(Math.random() * 100);

interface RenderItemType {
  (item: EventType, index: number, navigation: any): ReactElement;
}

const renderItem: RenderItemType = (
  {
    title,
    assistants,
    place_name,
    event_date,
    distance_km,
    image_url,
  }: EventType,
  index: number,
  navigation: any,
) => (
  <ListCategories
    style={
      index % 2 === 0
        ? {
            borderRightWidth: 1,
            borderRightColor: 'rgba(183, 183, 183, 0.272);',
          }
        : {}
    }>
    <TextAssistants>
      {assistants} {randomAttendees} Personas asistirán
    </TextAssistants>
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
    <BtnAsist
      distance={distance_km <= 5}
      onPress={() =>
        navigation('Map', {
          title,
          assistants: randomAttendees,
          place_name,
          event_date,
          distance_km,
          image_url,
        })
      }>
      <TextAsist>Estás a: {distance_km && distance_km.toFixed(2)} Km</TextAsist>
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

const EventList: React.FC<Props> = ({navigation, events}) => (
  <ContainList>
    {events.map((e: EventType, index: number) => (
      <Fragment key={index}>
        <View style={{width: '50%'}}>{renderItem(e, index, navigation)}</View>
      </Fragment>
    ))}
  </ContainList>
);

const EventComponent: React.FC<Props> = ({events, navigation}: Props) => {
  return (
    <ScrollView>
      <EventList events={events} navigation={navigation} />
    </ScrollView>
  );
};

export default EventComponent;
