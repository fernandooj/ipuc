import React, {
  Fragment,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {View} from 'react-native';

import {
  Content,
  InputSearch,
  Gradient,
  InputSearchBox,
  Title,
  Btn,
  BtnAnimate,
} from './styles';
import EventComponent from '../../components/events/event';
import CategorieComponent from '../../components/categories/categorie';
import {getEvents} from '../../services/event';
import {getEvent} from '../../reducers/eventReducer';
import {getCategories} from '../../services/categorie';
import {getCategorie} from '../../reducers/categorieReducer';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {UserContext} from '../../context/userContext';

const HomeScreen = (): ReactElement => {
  const [btnActive, setBtnActive] = useState(1);
  const dispatch = useDispatch();
  const {region} = useContext(UserContext);
  const eventos = useSelector(state => state.events);
  const categories = useSelector(state => state.categories);

  const fetchEvent = async (type: string, query: string | { latitude: any; longitude: any; } | undefined) => {
    try {
      const events = await getEvents(type, region, query);

      dispatch(getEvent(events));
    } catch (error) {
      // Manejo del error
      console.log(error);
    }
  };

  const fetchCategorie = useCallback(async () => {
    try {
      const categories = await getCategories();

      dispatch(getCategorie(categories));
    } catch (error) {
      // Manejo del error
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCategorie();
  }, [fetchCategorie]);

  const onChangeText = () => {};

  return (
    <Fragment>
      <View style={Content}>
        <View style={InputSearchBox}>
          <InputSearch
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
          <Animatable.View
            animation={btnActive === 1 ? 'pulse' : ''}
            duration={500}
            delay={100}
            style={BtnAnimate}>
            <Btn isSelected={btnActive === 1} onPress={() => setBtnActive(1)}>
              <Title isSelected={btnActive === 1}>Categorias</Title>
            </Btn>
          </Animatable.View>

          <Animatable.View
            animation={btnActive === 2 ? 'pulse' : ''}
            duration={500}
            delay={100}
            style={BtnAnimate}>
            <Btn
              isSelected={btnActive === 2}
              onPress={() => {
                setBtnActive(2), fetchEvent('near', 'asc');
              }}>
              <Title isSelected={btnActive === 2}>Cercanos</Title>
            </Btn>
          </Animatable.View>

          <Animatable.View
            animation={btnActive === 3 ? 'pulse' : ''}
            duration={500}
            delay={100}
            style={BtnAnimate}>
            <Btn
              isSelected={btnActive === 3}
              onPress={() => {
                setBtnActive(3), fetchEvent('date', 'asc');
              }}>
              <Title isSelected={btnActive === 3}>Proximos</Title>
            </Btn>
          </Animatable.View>
        </LinearGradient>
        {btnActive === 1 ? (
          <CategorieComponent data={categories} />
        ) : (
          <EventComponent events={eventos} />
        )}
      </View>
    </Fragment>
  );
};

export default HomeScreen;
