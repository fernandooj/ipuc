import React from 'react';
import Image from 'react-native-scalable-image';
import {SCREEN_WIDTH} from '../../utils/constants';
import {EventStyled} from './styles';
import Icon from 'react-native-vector-icons/Fontisto';
import moment from 'moment';
import 'moment/locale/es';

const {Contain, ContentImage, Title, Description, Text, Row, ContentIcon} =
  EventStyled;

const SlideEvents = ({data}: any) => {
  const {title, description, image_url, event_date, place_name} = data;
  return (
    <Contain>
      <Title>{title}</Title>
      <ContentImage>
        <Image
          width={SCREEN_WIDTH - 40}
          source={{uri: image_url}}
          resizeMode="contain"
        />
      </ContentImage>
      <Row>
        <ContentIcon>
          <Icon name="shield" size={16} color="#00338D" />
        </ContentIcon>
        <Description>{description}</Description>
      </Row>

      <Row>
        <ContentIcon>
          <Icon name="navigate" size={16} color="#00338D" />
        </ContentIcon>
        <Text>{place_name}</Text>
      </Row>
      <Row>
        <ContentIcon>
          <Icon name="date" size={16} color="#00338D" />
        </ContentIcon>
        <Text>{moment(event_date).locale('es').format('DD MMMM, HH:mm')}</Text>
      </Row>
    </Contain>
  );
};

export default SlideEvents;
