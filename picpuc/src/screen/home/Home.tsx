import React, {
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {TextInput, View} from 'react-native';

import {
  Content,
  InputSearch,
  Gradient,
  InputSearchBox,
  Title,
  Btn,
} from './styles';
import EventComponent from '../../components/events/event';
import {getEvents} from '../../services/event';
import {getEvent} from '../../reducers/eventReducer';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';

const HomeScreen = (): ReactElement => {
  const [btnActive, setBtnActive] = useState(true);
  const dispatch = useDispatch();
 
  const eventos = useSelector(state => state.events);

  const fetchEvent = useCallback(async () => {
    try {
      const events = await getEvents();

      dispatch(getEvent(events));
    } catch (error) {
      // Manejo del error
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const onChangeText = () => {};
  console.log('eventos', eventos);
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
