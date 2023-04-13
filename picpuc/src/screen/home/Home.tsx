import React, {Fragment, ReactElement, useEffect, useState} from 'react';
import {TextInput, View} from 'react-native';
import axios from 'axios';
import {
  Content,
  InputSearch,
  Gradient,
  InputSearchBox,
  Title,
  Btn,
} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import EventComponent from '../../components/events/event';

const HomeScreen = (): ReactElement => {
  const [events, setEventos] = useState([]);
  const [btnActive, setBtnActive] = useState(true);
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

  return (
    <Fragment>
      <View style={Content}>
        <View style={InputSearchBox}>
          <TextInput
            style={InputSearch}
            onChangeText={onChangeText}
            placeholderTextColor="grey"
            placeholder="Buscar Eventos"
          />
          <Icon name="aperture" size={25} color="#F7D78C" />
        </View>

        <LinearGradient
          colors={['#e4e4e4d1', '#ebe9e9db']}
          style={Gradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Btn isSelected={btnActive}>
            <Title isSelected={btnActive}>Categorias</Title>
          </Btn>
          <Btn>
            <Title>Cercanos</Title>
          </Btn>
          <Btn>
            <Title>Proximos</Title>
          </Btn>
        </LinearGradient>
        <EventComponent />
      </View>
    </Fragment>
  );
};

export default HomeScreen;
