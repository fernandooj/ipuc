import React, {useContext, useEffect, useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {EventStyled} from './styles';
import {UserContext} from '../../context/userContext';
import {useSelector} from 'react-redux';
import SlideEvents from '../../components/slide-events/slide-events';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../utils/constants';

const {Contain} = EventStyled;

const MapScreen = ({route}) => {
  const {region, setRegion} = useContext(UserContext);
  const [data, setData] = useState({});
  const eventos = useSelector(state => state.events);
  const {latitude, longitude} = region;
  const bottomSheet = useRef();
  useEffect(() => {
    if (route.params) {
      setData(route.params);
      bottomSheet.current.show()
    }
  }, [route.params]);
  return (
    <Contain>
      <MapView
        showsUserLocation
        showsMyLocationButton
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        }}
        onRegionChange={setRegion}
        style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT - 100}}>
        {eventos.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.location.x,
              longitude: marker.location.y,
            }}
            onPress={() => {
              setData(marker);
              bottomSheet.current.show();
            }}
          />
        ))}
      </MapView>
      <BottomSheet
        radius={20}
        hasDraggableIcon
        ref={bottomSheet}
        height={SCREEN_HEIGHT / 1.8}>
        <SlideEvents data={data} />
      </BottomSheet>
    </Contain>
  );
};

export default MapScreen;
